# DynamoDB Benchmark Tool

This script benchmarks `GetItem` performance from a DynamoDB table using the AWS SDK for JavaScript (v3). It provides detailed timing analysis for each request and calculates an average execution time over multiple iterations.

---

## 📦 Requirements

- Node.js (v18+ recommended)
- AWS credentials (via `AWS_PROFILE`, `AWS_ACCESS_KEY_ID`, etc.)
- Access to the DynamoDB table: `DO_NOT_DELETE_JS_LARGE_GET_ITEMS`

---

## 🚀 How to Run

Use the following environment variables to control the behavior of the benchmark:

```bash
AWS_PROFILE=AWSPROFILE-123456 \
LOG=false \
ITERATIONS=500 \
REQUEST_HANDLER=true \
node index.js
```

### 🔧 Environment Variables

| Variable          | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `AWS_PROFILE`     | AWS credentials profile to use (required if not using default credentials)  |
| `LOG`             | Set to `false` to disable per-iteration logging (default: enabled)          |
| `ITERATIONS`      | Number of `GetItem` calls to benchmark (default: 5)                         |
| `REQUEST_HANDLER` | Set to `true` to use a custom logging request handler with timing breakdown |

---

## 📈 What the Benchmark Measures

For each `GetItem` request, the script measures and optionally logs:

- Total `client.send()` time
- (If enabled) HTTP breakdown:
  - DNS Lookup
  - TCP Connect
  - TLS Handshake
  - Headers Sent
  - First Byte Received
  - Response Complete

At the end of the run, it outputs:

- Average latency for all iterations **except the first** (to avoid cold start skew)
- Total benchmark runtime (e.g., `1 min 13.507 sec`)

---

## 🧪 Example Output

```
> Average time for 500 iterations was 172.26 ms
Benchmark execution time: 1 min 13.507 sec
```

---

## 🛠 Modifying the Table or Key

You can edit the following variables in `index.js` to target a different table or key:

```js
const tableName = "DO_NOT_DELETE_JS_LARGE_GET_ITEMS";
const itemId = "1";
```

Make sure the specified item exists in the table.

---

## 📜 License

MIT – feel free to reuse and modify this benchmark script.
