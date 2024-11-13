# Node.js

## Event loop
In Node.js, operations can be categorized into several types based on how they interact with the system and resources.

1. *CPU-bound Operations*
These are tasks that require significant computational resources and mostly occupy the CPU for long durations.

Examples include:
- Complex mathematical calculations (e.g., calculating Fibonacci, prime numbers).
- Cryptographic operations (e.g., hashing, encryption).
- Image/video processing (e.g., applying filters to images).
- Sorting or searching large datasets.

**Impact**: These tasks block the main thread(are synchronous and will block the event loop until completion) and can lead to poor performance or unresponsiveness in your application if not offloaded to worker threads or processes.

2. *I/O-bound Operations*
These tasks are Input/Output operations, and their performance is primarily dependent on external resources such as disks, databases, or network 
connections.

Examples include:
- Reading and writing to files (fs.readFile, fs.writeFile).
- Making network requests (e.g., HTTP requests using fetch or http.request).
- Database queries (e.g., MongoDB, PostgreSQL).
- File uploads/downloads.

**Impact**: These operations don't block the main thread in Node.js because they are handled asynchronously using an event-driven model. They allow Node.js to handle many tasks concurrently, even though each task might involve waiting for external resources.


3. *Event-driven Operations*
Node.js is built on an event-driven architecture, meaning the core of its operation revolves around events, listeners, and callbacks.

Examples include:
- Listening for incoming HTTP requests (http.createServer).
- Listening to file system changes (fs.watch).
- Handling user input events in CLI applications (e.g., key presses, mouse events).
- WebSocket message handling.

**Impact**: These operations are designed to be lightweight and non-blocking. The Node.js event loop runs these operations and triggers event handlers when specific conditions are met.

4. *Asynchronous I/O Operations*
These are I/O-bound operations that are handled asynchronously. They are key to Node.js's non-blocking nature.

Examples include:
- Non-blocking file system operations (e.g., fs.readFile with a callback or fs.promises API for promises).
- Asynchronous network requests (e.g., using axios or node-fetch).
- Asynchronous database operations (e.g., querying MongoDB or PostgreSQL).

**Impact**: These operations don’t block the main thread. Node.js can continue executing other code while waiting for the I/O operation to complete, which allows for high concurrency.

5. *Timers and Delayed Operations*
These are operations that are scheduled to run after a specified delay or at a repeated interval.

Examples include:
- setTimeout(callback, delay) — Executes the callback after the specified delay.
- setInterval(callback, interval) — Repeatedly executes the callback at specified intervals.
- process.nextTick() — Schedules a callback to be executed after the current event loop iteration, before any I/O events.
- setImmediate() — Schedules a callback to be executed in the next event loop iteration (after I/O events).

**Impact**: These operations allow you to manage the execution timing of your code. They do not block the event loop and can be used to schedule tasks or manage delays in asynchronous workflows.

6. *Child Process Operations*
These involve running external programs or scripts and communicating with them from within your Node.js application.

Examples include:
- child_process.spawn — Launches a new process (e.g., running shell commands or external programs).
- child_process.exec — Executes a command in a shell and buffers the output.
- child_process.fork — Creates a new Node.js process that runs a separate script, which can communicate with the parent process.

**Impact**: These operations allow you to offload CPU-bound work to separate processes, thereby preventing blocking of the main thread in Node.js.

7. *Networking and HTTP Operations*
These are specialized I/O-bound operations focused on communication over the network.

Examples include:
- Handling HTTP requests and responses (http.createServer, http.request).
- WebSocket communication (ws module).
- DNS resolution (dns.lookup, dns.resolve).
- TCP/UDP socket communication (e.g., net.createServer for TCP server).

**Impact**: Networking operations are typically asynchronous and non-blocking, allowing for high concurrency when handling multiple clients or servers.

8. *File System Operations (Blocking and Non-blocking)*
These involve reading from and writing to the local file system.

Examples include:
- Blocking: fs.readFileSync, fs.writeFileSync — These block the event loop until the operation is complete.
- Non-blocking: fs.readFile, fs.writeFile (with callbacks) — These are asynchronous and non-blocking.
- Promises-based: fs.promises.readFile, fs.promises.writeFile — These are asynchronous but return promises instead of using callbacks.

**Impact**: While synchronous file system operations block the event loop, asynchronous file operations allow Node.js to continue processing other tasks.

9. *Memory Management Operations*
These operations involve allocating, managing, and freeing memory, often in the context of handling large amounts of data or optimizing resource usage.

Examples include:
- Garbage collection: Node.js uses the V8 engine’s garbage collector to automatically manage memory.
- Buffer management: Node.js uses Buffers for handling raw binary data (e.g., Buffer.alloc, Buffer.from).

**Impact**: These operations are generally managed by Node.js itself, but when working with large datasets or raw binary data, managing memory efficiently is critical to avoid performance issues.

**Summary of Operation Types in Node.js**
- **CPU-bound**: Mathematical calculations, sorting, etc. — Typically synchronous and blocking unless offloaded to worker threads or child processes.
- **I/O-bound**: File reads, network requests, database queries — Handled asynchronously in Node.js.
- **Event-driven**: Event listeners and handlers, such as HTTP requests, user inputs, etc.
- **Asynchronous I/O**: File, network, or database operations that are handled asynchronously (non-blocking).
- **Timers/Delayed Operations**: Operations like setTimeout, setInterval, setImmediate.
- **Child Process**: Running external processes or scripts with spawn, exec, or fork.
- **Networking/HTTP**: TCP/UDP communication, HTTP requests and responses, WebSockets.
- **File System**: Blocking and non-blocking file system operations.
- **Memory Management**: Garbage collection, buffer handling, and efficient memory usage.

Understanding these operation types is crucial for writing efficient, scalable applications in Node.js, as each type has different performance implications depending on how tasks are executed and managed.


**Summary Table**
|Operation Type|Blocking|Can Be Parallelized with Promises|
|---|---|---|
|CPU-bound operations|Yes|No (Requires Worker Threads/Child Processes)|
|I/O-bound operations|No|Yes|
|Event-driven operations|No|Yes|
|Asynchronous I/O operations|No|Yes|
|Timers and delayed operations|No|Yes|
|Child process operations|No|Yes|
|Networking and HTTP operations|No|Yes|
|File system operations|Some blocking (sync functions)|Yes (async functions)|
|Memory management operations|No|No (Managed internally by JavaScript engine)|

**Key Takeaways**
- **Blocking operations** are usually synchronous and will block the event loop, preventing other tasks from being processed. These need to be avoided on the main thread for performance reasons, especially for CPU-bound tasks.
- **Asynchronous operations**, like most I/O operations, timers, networking, and child processes, can be parallelized. These operations allow for high concurrency and are handled by the event loop without blocking the main thread.
- **Promises** are ideal for handling asynchronous operations in parallel, allowing multiple tasks to run concurrently without blocking the event loop.
- **CPU-bound tasks** require special handling (e.g., using Worker Threads or child processes) because simply wrapping them in a Promise won't prevent them from blocking the main thread.