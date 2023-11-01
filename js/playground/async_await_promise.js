const f_async = async (n) => {
  return n;
}

const f_async_promise = async (ms) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);      
    }, ms);
  });
  
  let result = await promise;
  return result;
}

console.log("p1-start");
console.log(f_async(100));
console.log(/*await*/f_async_promise(500)); // syntax error: await is available ONLY in async functions or top-level modules
console.log("p1-stop");

// await can be used on its own with JS modules
(async () => {
  console.log("p2-start");
  console.log(await f_async_promise(500));
  console.log("p2-stop");
}) ();


async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
  wait().then(result => console.log(result));
}; 

f();

/*
 * async functions always return a Promise
 * await only works inside async functions (syntax error)
 * await on top level works fine inside a module. 
 * if using old browser and not using modules use wrapping into an annonymus functions(line 22)
 * await accept "thenables" 
 * 
 * class Thenable {
 * constructor(num) {
 *   this.num = num;
 * }
 * then(resolve, reject) {
 *   alert(resolve);
 *   // resolve with this.num*2 after 1000ms
 *   setTimeout(() => resolve(this.num * 2), 1000); // (*)
 * }
 *}
 *async function f() {
 * // waits for 1 second, then result becomes 2
 * let result = await new Thenable(1);
 * alert(result);
 *}
 *f();
 *
 * If await gets a non-promise object with .then,
 * it calls that method providing the built-in functions resolve and reject as arguments
 * (just as it does for a regular Promise executor). 
 * Then await waits until one of them is called 
 * (in the example above it happens in the line (*)) and then proceeds with the result.
 *
 * The await keyword before a promise makes JavaScript wait until that promise settles, and then: * 1. If it’s an error, an exception is generated — same as if throw error were called at that very place.
 * 2. Otherwise, it returns the result.
 */
