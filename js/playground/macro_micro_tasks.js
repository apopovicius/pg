console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
Promise.resolve().then(() => setTimeout(() => console.log(4)));
Promise.resolve().then(() => console.log(5));
setTimeout(() => console.log(6));
console.log(7);

/*
 * Event loop: 
 * 1. log(1)
 * 2. push in macrotask queue: log(2)
 * 3. push in microstask queue: log(3)
 * 4. push in microstask queue: log(3).setTimeOut(log(4))
 * 5. push in microtask queue:  log(3).setTimeOut(log(4)).log(5)
 * 6. push in macrotask queue: log(2).log(6)
 * 7. log(7) DONE
 * 8. pop microtask queue: log(3) => microtask: setTimeOut(4).log(5)
 * 9. pop microtask queu: setTimeout(log(4)) => push macrotask queue: log(2).log(6).log(4) => microtask: log(5)
 * 10. pop microstask queue: log(5) => DONE
 * 11. pop macrotask queue: log(2) => macrotask queue: log(6).log(4) 
 * 12. pop macrotask queue: log(6) => macrotask queue: log(4)
 * 13. pop macrotask queue: log(4) => DONE
 
 OUTPUT: 1, 7, 3, 5, 2, 6, 4


 */
