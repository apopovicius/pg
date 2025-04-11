**Core JavaScript Concepts (with Detailed Explanations)**

1. **What is the difference between var, let, and const?**

In JavaScript, variables can be declared using `var`, `let`, or `const`. Each has different scoping rules:

- **`var`** is **function-scoped**, meaning it is accessible within the function in which it is declared. If declared outside any function, it becomes a global variable. Variables declared with `var` can be re-declared and updated.
- **`let`** is **block-scoped**, meaning it is only accessible within the block (`{}`) it is defined in. It can be updated but not re-declared within the same scope.
- **`const`** is also **block-scoped**, but cannot be updated or re-declared. It is used to declare constants, though if it holds an object or array, the contents can still be mutated.

Example:
```js
function example() {
  var a = 1;
  let b = 2;
  const c = 3;
}
```

2. **Explain hoisting in JavaScript with examples.**

**Hoisting** is JavaScript's default behavior of moving **declarations** to the top of the current scope before code execution.

- **Fully hoisted** means both the declaration and definition (for functions) are moved to the top.
- Variables declared with `var` are hoisted **without** their assignment.
- `let` and `const` are also hoisted but exist in a **temporal dead zone (TDZ)** from the start of the block until the declaration is encountered, meaning they cannot be accessed before initialization.

Example:
```js
console.log(x); // undefined
var x = 5;

foo(); // works because foo is hoisted
function foo() {
  console.log("Hello");
}
```

3. **What are closures in JavaScript?**

A **closure** is a function that retains access to its **lexical scope**, even when the function is executed outside that scope.

- **Lexical scope** means the function scope is determined by its position in the source code.

Example:
```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  }
}

const counter = outer();
counter(); // 1
counter(); // 2
```

Here, `inner()` forms a closure over the variable `count` even though `outer()` has finished executing.

4. **Explain the difference between shallow copy and deep copy.**

- A **shallow copy** copies the top-level properties of an object, but nested objects are **referenced**, not copied.
- A **deep copy** creates a new object with all nested objects and arrays also copied recursively.

Why can’t nested objects be copied with `=`?
Because `=` assigns a reference to the original object, not a new object.

Example:
```js
const original = { a: 1, b: { c: 2 } };
const shallow = { ...original };
shallow.b.c = 99;
console.log(original.b.c); // 99

const deep = JSON.parse(JSON.stringify(original));
```

5. **What is the difference between == and === in JavaScript?**

- `==` is the **loose equality** operator. It performs type **coercion**, meaning it converts values to the same type before comparison.
- `===` is the **strict equality** operator. It compares both **type** and **value**.

Example:
```js
2 == '2';   // true (string '2' is converted to number)
2 === '2';  // false (different types)
```

6. **How does the event loop work in JavaScript?**

JavaScript is **single-threaded**, meaning it can execute one operation at a time. The **event loop** allows asynchronous code to run without blocking the main thread.

- The **Call Stack** executes synchronous code.
- The **Web APIs** handle asynchronous tasks like `setTimeout`, AJAX.
- The **Task Queue (Macrotask queue)** stores tasks like `setTimeout`, `setInterval`, and DOM events.
- The **Microtask Queue** stores tasks like `Promise.then`, `queueMicrotask`.

**Order of execution:**
1. Call Stack
2. All Microtasks
3. One Macrotask

Example:
```js
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Microtask'));
console.log('End');
// Output: Start > End > Microtask > Timeout
```

7. **What are promises and how do they work?**

A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.

States:
- `pending`: initial state
- `fulfilled`: operation completed
- `rejected`: operation failed

A promise provides `.then()` for handling success and `.catch()` for handling failure.

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success"), 1000);
});

promise.then(data => console.log(data));
```

8. **What is async/await, and how is it different from promises?**

`async/await` is **syntactic sugar** over promises, allowing asynchronous code to be written in a synchronous style.

- An `async` function always returns a Promise.
- The `await` keyword pauses execution until the Promise resolves or rejects.

```js
async function fetchData() {
  try {
    const response = await fetch("/api");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

9. **What is memoization, and how can it be implemented in JavaScript?**

**Memoization** is an optimization technique to **cache** the results of expensive function calls so they can be returned quickly when called with the same inputs.

Example:
```js
function memoize(fn) {
  const cache = {};
  return function(x) {
    if (cache[x]) return cache[x];
    return (cache[x] = fn(x));
  };
}

const square = memoize(x => x * x);
square(4); // calculates and caches
square(4); // returns from cache
```

10. **What are higher-order functions, and can you give an example?**

A **higher-order function** is a function that either:
- Takes another function as an argument
- Returns a function as its result

They enable **functional programming patterns** like composition and abstraction.

Example:
```js
function greet(name) {
  return () => `Hello, ${name}`;
}
const greeter = greet("Alice");
console.log(greeter()); // Hello, Alice
```

---

**Object-Oriented JavaScript (OOP)**

11. **What is prototypal inheritance, and how does it work?**

**Prototypal inheritance** is a feature in JavaScript where objects can inherit properties and methods from other objects using a prototype chain.

- Every JavaScript object has an internal link to another object called its **prototype**.
- When a property or method is accessed on an object, JavaScript looks for it on the object itself. If not found, it searches the object's prototype, and so on, until it reaches `null`.

Example:
```js
const parent = {
  greet() {
    return "Hello from parent";
  }
};

const child = Object.create(parent);
child.greet(); // "Hello from parent"
```

Here, `child` inherits from `parent` using the prototype chain.

12. **What is the difference between Object.create() and class-based inheritance?**

JavaScript supports inheritance through both `Object.create()` and the ES6 `class` syntax, but they work differently:

- **`Object.create(proto)`** creates a new object and sets its prototype to `proto`. It’s a direct way to establish prototype inheritance and is more flexible for composing objects.
- **Class-based inheritance** uses the `class` keyword and `extends` to create a class hierarchy. It's more structured and familiar for developers coming from class-based languages like Java or C++.

Example using `Object.create()`:
```js
const animal = {
  speak() {
    return "Roar";
  }
};
const lion = Object.create(animal);
console.log(lion.speak()); // "Roar"
```

Example using class:
```js
class Animal {
  speak() {
    return "Roar";
  }
}
class Lion extends Animal {}
const simba = new Lion();
console.log(simba.speak()); // "Roar"
```

The class syntax is mostly syntactic sugar over prototypal inheritance.

**Core JavaScript Concepts (with Detailed Explanations)**

13. **How does the `this` keyword work in JavaScript?**

The `this` keyword refers to the **execution context** of a function—essentially, the object that is currently calling the function.

- In global scope, `this` refers to the global object (`window` in browsers, `global` in Node.js).
- In an object method, `this` refers to the object itself.
- In an arrow function, `this` retains the value from the enclosing lexical scope.
- In event handlers and DOM, `this` often refers to the element that fired the event.

Example:
```js
const obj = {
  name: "JavaScript",
  getName() {
    return this.name;
  }
};
obj.getName(); // "JavaScript"

const arrow = () => this;
```

14. **What are getter and setter functions in JavaScript?**

**Getters** and **setters** are special methods for reading and setting the value of an object property.

- `get`: binds an object property to a function that will be called when the property is accessed.
- `set`: binds an object property to a function to be called when that property is assigned a value.

Example:
```js
const person = {
  firstName: "John",
  lastName: "Doe",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
};
```

15. **What is the difference between call(), apply(), and bind()?**

These are methods used to explicitly set the value of `this` in a function:

- `call(thisArg, arg1, arg2, ...)` — invokes the function immediately with given `this` and arguments.
- `apply(thisArg, [args])` — same as `call`, but accepts arguments as an array.
- `bind(thisArg)` — returns a new function with bound `this`, without invoking it.

Example:
```js
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}
const person = { name: "Alice" };

console.log(greet.call(person, "Hi")); // "Hi, Alice"
console.log(greet.apply(person, ["Hello"])); // "Hello, Alice"
const boundGreet = greet.bind(person);
console.log(boundGreet("Hey")); // "Hey, Alice"
```

---

**Functional Programming in JavaScript**

16. **What is currying, and how do you implement it?**

**Currying** is the process of transforming a function with multiple arguments into a sequence of functions each taking a single argument.

Example:
```js
function curry(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curry(1)(2)(3); // 6
```

17. **Explain functional programming concepts in JavaScript.**

Functional programming is a paradigm that emphasizes:
- **Immutability** (no side effects)
- **First-class functions** (functions can be assigned to variables, passed as arguments)
- **Pure functions** (same input always returns same output)
- **Higher-order functions** (functions that operate on other functions)
- **Function composition**

Example:
```js
const add = x => x + 1;
const double = x => x * 2;
const result = double(add(3)); // 8
```

18. **What are pure functions, and why are they useful?**

A **pure function**:
- Always returns the same result for the same inputs
- Has no side effects (does not modify outside state)

Pure functions are easier to test and reason about.

Example:
```js
function pureAdd(x, y) {
  return x + y;
}
```

19. **What is debouncing and throttling? How are they implemented?**

- **Debouncing** delays execution until after a specified delay since the last time it was invoked. Useful for search bars.
- **Throttling** ensures a function is only called once in a specific time interval. Useful for scroll or resize events.

Debounce Example:
```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

Throttle Example:
```js
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

20. **How do you optimize performance using lazy loading?**

**Lazy loading** means loading resources (scripts, images, data) only when they are needed, not on initial load.

Example for module lazy loading:
```js
button.addEventListener('click', async () => {
  const module = await import('./heavyModule.js');
  module.run();
});
```

---

**Asynchronous JavaScript**

21. **What are Web Workers, and when should you use them?**

**Web Workers** run scripts in the background on a separate thread, allowing long-running tasks to be processed without freezing the UI.

Example:
```js
const worker = new Worker('worker.js');
worker.postMessage('start');
worker.onmessage = (e) => console.log(e.data);
```

Use them for: image processing, parsing large data, etc.

22. **How do setTimeout and setInterval work under the hood?**

Both functions use the browser’s **Web API** and the **event loop**:
- `setTimeout` runs a function once after a delay.
- `setInterval` runs a function repeatedly at intervals.

They are placed in the **Macrotask queue**, and executed when the call stack is empty.

23. **Explain Microtasks and Macrotasks in JavaScript.**

- **Microtasks**: Promises, `queueMicrotask`
- **Macrotasks**: `setTimeout`, `setInterval`, I/O

Execution order:
1. Complete current task
2. Run all microtasks
3. Run one macrotask

24. **What is Promise.all(), and how does it differ from Promise.race()?**

- `Promise.all([a, b])` resolves when **all** promises resolve. If one fails, it rejects.
- `Promise.race([a, b])` resolves/rejects when the **first** promise resolves or rejects.

Example:
```js
Promise.all([p1, p2]).then(([res1, res2]) => {...});
Promise.race([p1, p2]).then(res => {...});
```

25. **How do you handle errors in async/await?**

Use `try/catch` to handle exceptions from awaited promises.

```js
async function loadData() {
  try {
    const res = await fetch('/api');
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('Failed:', e);
  }
}
```

---

**Advanced JavaScript Topics**

26. **How does JavaScript garbage collection work?**

JavaScript uses **automatic garbage collection**, removing objects that are no longer **reachable**.

- The **mark-and-sweep algorithm** finds and removes unreferenced memory.

Example:
```js
let a = { name: "obj" };
a = null; // eligible for garbage collection
```

27. **What are weak references (WeakMap, WeakSet)?**

- **WeakMap** and **WeakSet** hold references to objects that do **not** prevent them from being garbage-collected.
- Keys must be objects.
- They are **not iterable**.

Example:
```js
const wm = new WeakMap();
let obj = {};
wm.set(obj, "data");
obj = null; // reference removed, eligible for GC
```

28. **Explain Generators and Iterators in JavaScript.**

- A **Generator** is a function that can be paused and resumed using `yield`.
- An **Iterator** is an object that implements a `next()` method.

Generator Example:
```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = generator();
gen.next(); // { value: 1, done: false }
```

29. **What are ES6 Modules, and how are they different from CommonJS?**

- **ES6 Modules** use `import/export` syntax and are statically analyzed at compile time. This allows for features like tree-shaking (removing unused code during bundling).
- **CommonJS** is the module system used in Node.js and uses `require/module.exports`. It is loaded at runtime, meaning dependencies can be dynamic.

Key differences:
- **ES6 Modules** are asynchronous and must be served with a MIME type of `application/javascript` in browsers.
- **CommonJS** modules are synchronous and mainly used in server-side (Node.js) environments.

Example:
```js
// ES6 Module
export const x = 5;
import { x } from './module.js';

// CommonJS
module.exports = x;
const x = require('./module');
```

Additionally, this is a good place to mention **IIFE (Immediately Invoked Function Expression)**:

An **IIFE** is a function that is defined and executed immediately. It is used to create a new scope and avoid polluting the global namespace.

Syntax:
```js
(function() {
  console.log("IIFE executed!");
})();
```

Explanation:
- The outer parentheses `()` wrap the function declaration.
- The second set of parentheses `()` immediately invokes it.

Use cases:
- Encapsulating variables
- Creating private scope before ES6 modules existedjs
// ES6
export const x = 5;
import { x } from './module.js';

// CommonJS
module.exports = x;
const x = require('./module');
```

30. **How do you prevent memory leaks in JavaScript?**

- Remove event listeners when not needed.
- Avoid global variables.
- Nullify references to large unused objects.
- Use `WeakMap` or `WeakSet` for cache or DOM references.

Example:
```js
const el = document.getElementById('btn');
const handler = () => console.log('clicked');
el.addEventListener('click', handler);
// Later
el.removeEventListener('click', handler);
```

---

All 30 questions answered with definitions, examples, and terminology explained!



