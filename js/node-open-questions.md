**Node.js In-Depth**

1. **What is the event-driven architecture of Node.js?**

Node.js is built on an **event-driven architecture**, where the application flow is determined by emitted events and their corresponding listeners. Instead of waiting (blocking) for operations like file reads or database queries to complete, Node registers **event listeners** and continues executing other code. When the operation completes, the registered listener is triggered.

This architecture is highly effective for **non-blocking I/O** and enables building high-concurrency applications such as real-time chat servers, streaming services, or APIs.

2. **How does the Node.js event loop work, and how is it different from the browser's event loop?**

The **event loop** in Node.js is responsible for handling asynchronous operations. It allows Node to perform non-blocking I/O despite running on a single thread.

The loop consists of multiple **phases**:
- **Timers**: Executes callbacks from `setTimeout()` and `setInterval()`.
- **Pending callbacks**: Executes I/O callbacks deferred to the next loop.
- **Idle/prepare**: Internal use.
- **Poll**: Retrieves new I/O events.
- **Check**: Executes `setImmediate()` callbacks.
- **Close callbacks**: For closed sockets, etc.

Between phases, **microtasks** run:
- `process.nextTick()`: Executes after the current operation, **before** the event loop proceeds.
- `Promise.then()` / `queueMicrotask()`: Executed after the current task and before the next phase.

Node differs from browsers by exposing these phases more explicitly and using **libuv** to handle system-level tasks like file I/O.

3. **What are Node.js streams, and how do they manage data flow?**

**Streams** allow handling of data in **chunks**, rather than loading it all into memory. This is crucial for performance when dealing with large files, audio/video streams, or network data.

- **.pipe()** is a method to connect a readable stream to a writable one.

Example:
```js
const fs = require('fs');
fs.createReadStream('input.txt').pipe(fs.createWriteStream('output.txt'));
```

This creates a pipeline that reads from `input.txt` and writes to `output.txt`, efficiently managing memory and speed.

4. **What are buffers in Node.js, and why are they needed?**

Buffers are used to **store binary data** in Node.js. While streams allow data to flow, buffers are the low-level storage for that data.

They are critical when:
- Handling TCP streams
- Reading binary files (e.g., images, audio)

Streams use buffers internally to accumulate and forward data efficiently.

```js
const buf = Buffer.from('Node');
console.log(buf.toString()); // 'Node'
```

5. **What is the difference between asynchronous and synchronous programming in Node.js?**

- **Synchronous** operations block the main thread. If one task takes 10s, nothing else runs during that time.
- **Asynchronous** operations run in the background (via event loop), allowing the main thread to continue executing other code.

```js
// Synchronous
const data = fs.readFileSync('file.txt');

// Asynchronous
fs.readFile('file.txt', (err, data) => { console.log(data); });
```

6. **How do callbacks, Promises, and async/await handle asynchronous operations differently?**

- **Callbacks** are basic async patterns but can lead to deeply nested code.
- **Promises** offer chaining and cleaner syntax.
- **Async/Await** lets you write async code in a sequential style with `try/catch` for error handling.

```js
async function load() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

7. **What does `process.nextTick()` do in Node.js?**

It schedules a callback to run **after the current operation** but **before** the next event loop phase. Use it when you need to ensure a function runs immediately after the current function completes.

**Real-world use**: Logging an error and cleaning up state before exiting the process.

```js
process.nextTick(() => console.log('Microtask: nextTick'));
Promise.resolve().then(() => console.log('Microtask: Promise'));
```

Order: current task → `nextTick()` → Promise → next phase

8. **What are worker threads in Node.js and when should you use them?**

Worker threads run JS code in parallel threads. Node is single-threaded, so this is essential for **CPU-bound tasks**.

Use case: Password hashing with bcrypt, image resizing.

```js
const { Worker } = require('worker_threads');
new Worker('./hash.js');
```

Workers should be used when the CPU load would otherwise block the event loop.

9. **How does Node.js manage concurrency with a single thread?**

Node uses an event loop + **libuv’s thread pool** (4 threads by default) to handle I/O operations concurrently.

- JavaScript logic runs in a single thread
- File system, DNS, network operations run in background threads

This model allows high concurrency without blocking the main thread.

21. **What are common Node.js security risks?**

Common security vulnerabilities include:

- **SQL Injection**: Occurs when user input is embedded in a query string unsanitized.
- **Cross-site Scripting (XSS)**: Injected scripts in the client browser.
- **Cross-site Request Forgery (CSRF)**: Forcing users to perform unwanted actions on authenticated sites.
- **Insecure dependencies**: Outdated packages with known vulnerabilities.
- **Misconfigured HTTP headers**: Exposing implementation details or allowing framing.

Each must be addressed using proper validation, sanitization, middleware, and patching practices.

22. **How do you prevent SQL injection?**

- **Parameterized queries**: Safely pass input values.
- **ORM tools**: Like Sequelize or Prisma auto-handle escaping.
- **Input validation**: Sanitize all user inputs.

Example (PostgreSQL):
```js
const query = 'SELECT * FROM users WHERE id = $1';
client.query(query, [userId]);
```

23. **How is authentication and authorization managed in Node.js?**

- **Authentication** verifies identity.
- **Authorization** checks access rights.

Options:
- **Passport.js** for local or OAuth strategies
- **JWT** (JSON Web Token) for stateless auth
- **Role-based access control (RBAC)**
- **Session-based** (cookies + server sessions)

Example:
```js
const token = jwt.sign({ id: user._id }, 'secret');
```

24. **How can Node.js performance be improved?**

- **Async I/O**: Avoid blocking calls (e.g., `fs.readFileSync`). Use `fs.promises.readFile`.
- **Clustering**: Use `cluster` module to run on multiple CPU cores.
- **Caching**: Use Redis to store session or frequently requested data.
- **Load balancing**: Distribute requests using Nginx or HAProxy.

**Async I/O** means letting the event loop continue executing while I/O completes in the background. **Load balancing** is about distributing client traffic among multiple server instances for reliability and scalability.

25. **What is clustering in Node.js?**

Clustering allows scaling Node.js across multiple CPU cores by forking workers that share the same server port.

Example:
```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  http.createServer((req, res) => res.end('Handled by ' + process.pid)).listen(3000);
}
```

26. **How do you detect and fix memory leaks in Node.js?**

**Detection**:
- `process.memoryUsage()` for tracking heap
- Heap snapshots using Chrome DevTools (`--inspect`)
- Leak detection libraries: `memwatch-next`, `heapdump`

**Fixing**:
- Remove unused references
- Clean up event listeners (`emitter.removeListener`)
- Monitor for object growth in long-lived processes

27. **What tools help monitor Node.js performance?**

- **PM2**: Logs, CPU/memory monitoring, clustering
- **clinic.js**: Generates flamegraphs and memory usage profiles
- **Datadog / New Relic**: APM tools for production
- **Node.js inspector**: `node --inspect` with Chrome DevTools

28. **How do you debug Node.js applications?**

Options:
- `node --inspect` and attach Chrome DevTools
- VS Code with breakpoints
- Use `--watch` (e.g., via `nodemon`) for auto-restarts
- Add logging, breakpoints, `debugger` statements

```bash
node --inspect-brk app.js
```

29. **How are errors handled in asynchronous Node.js code?**

- Use `try/catch` in async functions
- Use `.catch()` on Promises
- Global handlers: `process.on('unhandledRejection')`

**In Express**: Async route handlers don’t catch exceptions automatically. Use a wrapper or `express-async-errors`:
```js
require('express-async-errors');
```

30. **How do you deploy a Node.js application?**

**Steps**:
1. **Prepare code**: Lint, test, and bundle (if needed)
2. **Set up environment**: Use `.env` files and secrets manager
3. **Install dependencies**: `npm ci`
4. **Start server**: Use PM2 or Docker
5. **Monitor**: Logs, restarts, memory

Common deployment targets:
- VPS
- AWS EC2 / Lambda
- Render / Heroku
- Docker containers + Kubernetes

31. **How do you manage environment variables in Node.js?**

- Use `.env` files with `dotenv`
- Access with `process.env`
- Never commit `.env` to source control

```js
require('dotenv').config();
console.log(process.env.PORT);
```

Use cloud secret managers in production (e.g., AWS Secrets Manager).

32. **What is process management and what tools help in Node.js?**

**Process managers** keep your app running, restart on crash, and handle logs:
- `PM2`: Popular, supports clustering, monitoring
- `forever`: Simple, but less active
- `systemd`: OS-level process manager

33. **What is CI/CD in the context of Node.js?**

**Continuous Integration (CI)**: Auto-run tests and lint on every commit.
**Continuous Deployment (CD)**: Automatically deploy tested code to production.

Tools:
- GitHub Actions
- GitLab CI
- Jenkins

Example GitHub Actions:
```yaml
steps:
  - uses: actions/checkout@v2
  - run: npm install
  - run: npm test
```

34. **What is the cluster module for?**

The `cluster` module enables spawning worker processes to share the same port.

Basic usage:
```js
const cluster = require('cluster');
const http = require('http');

if (cluster.isPrimary) {
  for (let i = 0; i < 4; i++) cluster.fork();
} else {
  http.createServer((req, res) => res.end('OK')).listen(3000);
}
```

Benefits:
- Use multi-core CPUs
- Increase throughput
- Worker crash isolation

35. **How do you use WebSockets in Node.js?**

Install `ws`:
```bash
npm install ws
```

Server:
```js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });
server.on('connection', socket => {
  socket.on('message', msg => console.log(msg));
  socket.send('Hello client');
});
```

Client:
```js
const socket = new WebSocket('ws://localhost:3000');
socket.onmessage = e => console.log(e.data);
socket.send('Hello server');
```

36. **What are microservices and how does Node.js support them?**

**Microservices** split an app into small, independent services. Each handles one business capability and communicates via HTTP, messaging queues, or gRPC.

Benefits:
- Decoupling
- Scalability
- Language independence

How Node.js helps:
- Fast startup time
- Lightweight
- Built-in HTTP server
- Ecosystem: Express, gRPC, RabbitMQ clients

You can expose REST APIs per service, use API gateways, and communicate via Redis pub/sub, Kafka, or HTTP.

37. **REST vs GraphQL in Node.js?**

- **REST**: Multiple endpoints, fixed schema, returns entire resource.
- **GraphQL**: Single endpoint, query shape defined by client, minimizes overfetch.

REST example:
```js
GET /user/123 => { id, name, posts }
```

GraphQL:
```graphql
query { user(id: 123) { name posts { title } } }
```

Use REST for simpler APIs, GraphQL for flexibility and frontend-driven needs.

38. **How to process real-time data in Node.js?**

Options:
- **WebSockets** (socket.io or ws)
- **Redis pub/sub**: Send messages between microservices
- **EventEmitters**: In-process messaging for streaming pipelines
- **Streams**: Process large data in real time

Use case: Chat server
```js
io.on('connection', socket => {
  socket.on('msg', msg => io.emit('msg', msg));
});
```

39. **If Node.js is single-threaded, how can it serve 1 million clients executing the same GET /user request?**

Node.js offloads I/O (like DB calls) to a background thread pool using **libuv**, while the main thread handles lightweight request logic and routing.

Key strategies:
- **Non-blocking I/O**
- **Event loop**
- **Connection pooling**
- **Load balancing via Nginx or HAProxy**
- **Clustering** to utilize multiple cores

Example:
```js
app.get('/user', async (req, res) => {
  const user = await db.getUser(req.query.id);
  res.json(user);
});
```

With async code and distributed design, Node.js can efficiently serve millions of lightweight I/O-bound requests.
