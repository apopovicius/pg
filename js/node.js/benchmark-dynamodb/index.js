import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { performance } from "perf_hooks";
import { request as httpsRequest } from "https";
import * as https from "https";

const execStart = performance.now();
const region = "eu-west-1";
const tableName = "DO_NOT_DELETE_JS_LARGE_GET_ITEMS";
const itemId = "1";
const PRECISION = 2;
const iterations = process.env.ITERATIONS ?? 5;

// Store the original log before muting
const originalConsoleLog = console.log;

if (process.env.LOG === "false") {
  console.log = () => {}; // disable logging
}

const formatMs = (ms) => {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toFixed(PRECISION);

  if (minutes > 0) {
    return `${minutes} min ${seconds} sec`;
  } else {
    return `${seconds} sec`;
  }
};

// should be enabled by default, but will keep it here to make sure
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: Infinity,
});

// Track HTTP timing globally
let lastHttpTimings = null;
const timings = [];
const d = (a, b) => (a && b ? (b - a).toFixed(PRECISION) + " ms" : "N/A");

// Custom request handler to collect HTTP metrics
const loggingHandler = new NodeHttpHandler({
  httpsAgent: agent,
});

// activate or not the http handler
const useRequestHandler = process.env.REQUEST_HANDLER === "true";
const clientOptions = {
  region,
  ...(useRequestHandler && { requestHandler: loggingHandler }),
};

loggingHandler.handle = async (request, _) => {
  const t = {
    start: performance.now(),
    dns: null,
    tcp: null,
    tls: null,
    headersSent: null,
    firstByte: null,
    end: null,
  };

  return new Promise((resolve, reject) => {
    const req = httpsRequest(request, (res) => {
      t.firstByte = performance.now();
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        t.end = performance.now();
        lastHttpTimings = t;
        resolve({
          response: res,
          body: Buffer.concat(chunks),
        });
      });
    });

    req.on("socket", (socket) => {
      if (socket.listenerCount("lookup") === 0) {
        socket.once("lookup", () => (t.dns = performance.now()));
      }
      if (socket.listenerCount("connect") === 0) {
        socket.once("connect", () => (t.tcp = performance.now()));
      }
      if (socket.listenerCount("secureConnect") === 0) {
        socket.once("secureConnect", () => (t.tls = performance.now()));
      }
    });

    req.on("finish", () => (t.headersSent = performance.now()));
    req.on("error", reject);

    if (request.body) req.write(request.body);
    req.end();
  });
};

// One shared client
const client = new DynamoDBClient(clientOptions);

// Run benchmark loop
for (let i = 0; i < iterations; i++) {
  console.log(`\n=== Iteration ${i + 1} ===`);
  lastHttpTimings = null;

  const totalStart = performance.now();

  const result = await client.send(
    new GetItemCommand({
      TableName: tableName,
      Key: { id: { S: itemId } },
      ConsistentRead: false,
    })
  );

  const totalEnd = performance.now();
  const measured = (totalEnd - totalStart).toFixed(PRECISION);
  console.log("Total client.send() time:", measured, "ms");

  const t = lastHttpTimings;

  if (t) {
    console.log("HTTP Breakdown:");
    console.log("  DNS lookup          :", d(t.start, t.dns));
    console.log("  TCP connect         :", d(t.dns, t.tcp));
    console.log("  TLS handshake       :", d(t.tcp, t.tls));
    console.log("  Headers sent        :", d(t.tls, t.headersSent));
    console.log("  First byte received :", d(t.headersSent, t.firstByte));
    console.log("  Response complete   :", d(t.firstByte, t.end));
    console.log("  Total HTTP time     :", d(t.start, t.end));
  }
  console.log("Item found            :", !!result.Item);

  if (i === 0) continue;
  timings.push(measured);
}

const average =
  timings.map((e) => +e).reduce((prev, curr) => curr + prev, 0) /
  timings.length;

console.log = originalConsoleLog;
console.log(
  `> Average time for ${iterations} iterations was ${average.toFixed(
    PRECISION
  )} ms`
);

console.log(
  "Benchmark execution time",
  formatMs((performance.now() - execStart).toFixed(PRECISION))
);
