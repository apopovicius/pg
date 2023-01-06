/*
Fibonacci number
0, 1, 1, 2, 3, 5, 8, 13, ...

F(n) = f(n-1)+f(n-2),
n > 2;
F(0) = 0
F(1) = 1
F(2) = 1
*/

function fib(n) {
    if (n === 0) return 0;
    else if (n <= 2) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

// with memoization
// caching prev calculations
function fibM(n, prevValues = []) {
    if (prevValues[n] != null) return prevValues[n];
    let result = 0;
    if (n === 0) result = 0;
    else if (n <= 2) {
        result = 1;
    } else {
        result = fibM(n - 1, prevValues) + fibM(n - 2, prevValues);
    }
    prevValues[n] = result;
    return result;
}

// ! TEST AREA
let start = performance.now();
let number = fib(40);
let stop = performance.now();
console.log(`For number 45 fib returned ${number} in ${stop - start} ms`);

start = performance.now();
number = fibM(500);
stop = performance.now();
console.log(`For number 500 fibM returned ${number} in ${stop - start} ms`);
