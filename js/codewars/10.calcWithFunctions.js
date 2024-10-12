/*
This time we want to write calculations using functions and get the results. Let's have a look at some examples:

seven(times(five())); // must return 35
four(plus(nine())); // must return 13
eight(minus(three())); // must return 5
six(dividedBy(two())); // must return 3
Requirements:

- There must be a function for each number from 0 ("zero") to 9 ("nine")
- There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy
- Each calculation consist of exactly one equation and two numbers
- The most outer function represents the left operand, the most inner function represents the right operand
- Division should be integer division. For example, this should return 2, not 2.666666...:
eight(dividedBy(three()));
*/
// let equation = '';

// function zero() {
//     if (equation === '') {
//         equation += '0';
//         return;
//     }
//     return calculate(0);
// }

// function one() {
//     if (equation === '') {
//         equation += '1';
//         return;
//     }
//     return calculate(1);
// }

// function two() {
//     if (equation === '') {
//         equation += '2';
//         return;
//     }
//     return calculate(2);
// }

// function three() {
//     if (equation === '') {
//         equation += '3';
//         return;
//     }
//     return calculate(3);
// }

// function four() {
//     if (equation === '') {
//         equation += '4';
//         return;
//     }
//     return calculate(4);
// }

// function five() {
//     if (equation === '') {
//         equation += '5';
//         return;
//     }
//     return calculate(5);
// }

// function six() {
//     if (equation === '') {
//         equation += '6';
//         return;
//     }
//     return calculate(6);
// }

// function seven() {
//     if (equation === '') {
//         equation += '7';
//         return;
//     }
//     return calculate(7);
// }

// function eight() {
//     if (equation === '') {
//         equation += '8';
//         return;
//     }
//     return calculate(8);
// }

// function nine() {
//     if (equation === '') {
//         equation += '9';
//         return;
//     }
//     return calculate(9);
// }

// function plus() {
//     equation += '+';
// }

// function minus() {
//     equation += '-';
// }

// function times() {
//     equation += '*';
// }

// // integer division
// function dividedBy() {
//     equation += '/';
// }

// function calculate(operand1) {
//     let [op2, operation] = equation.split('');
//     let operand2 = +op2;
//     equation = '';
//     switch (operation) {
//         case '+':
//             return operand1 + operand2;
//         case '-':
//             return operand1 - operand2;
//         case '*':
//             return operand1 * operand2;
//         case '/':
//             return (operand1 / operand2) | 0;
//     }
// }

// !shorthand
function zero(fn) {
    return fn ? fn(0) : 0;
}
function one(fn) {
    return fn ? fn(1) : 1;
}
function two(fn) {
    return fn ? fn(2) : 2;
}
function three(fn) {
    return fn ? fn(3) : 3;
}
function four(fn) {
    return fn ? fn(4) : 4;
}
function five(fn) {
    return fn ? fn(5) : 5;
}
function six(fn) {
    return fn ? fn(6) : 6;
}
function seven(fn) {
    return fn ? fn(7) : 7;
}
function eight(fn) {
    return fn ? fn(8) : 8;
}
function nine(fn) {
    return fn ? fn(9) : 9;
}

function plus(n) {
    return function (v) {
        return v + n;
    };
}
function minus(n) {
    return function (v) {
        return v - n;
    };
}
function times(n) {
    return function (v) {
        return v * n;
    };
}
function dividedBy(n) {
    return function (v) {
        return (v / n) | 0;
    };
}

//! TEST CASES
let result = 0;
result = seven(times(five()));
console.log(`Expected 35 => got ${result}`);
result = four(plus(nine()));
console.log(`Expected 13 => got ${result}`);
result = eight(minus(three()));
console.log(`Expected 5 => got ${result}`);
result = six(dividedBy(two()));
console.log(`Expected 3 => got ${result}`);

// ORDER
//seven(times(five()))
//1. five() with no parameters
//2. return fn ? fn(5) : 5; => return 5;
//3. times(5)
//4. return function (v) {
//    return v * n;
//} => return function(5) = return v * 5
//5. seven(fn(5))
//6. return fn ? fn(7) : 7; => fn(7) => return 7 * 5
//7. 35
