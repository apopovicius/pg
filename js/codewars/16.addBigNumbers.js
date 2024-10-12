/*
We need to sum big numbers and we require your help.

Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.

Example
add("123", "321"); -> "444"
add("11", "99");   -> "110"
Notes
The input numbers are big.
The input is a string of only digits
The numbers are positives
*/

function add(a, b) {
    if (a.length > b.length) {
        b = b.padStart(a.length, '0');
    } else {
        a = a.padStart(b.length, '0');
    }

    //after padding we sure that the arrays have same length
    let aArray = a.split('');
    let bArray = b.split('');
    let carry = 0;
    let finalNumber = '';
    for (let i = aArray.length - 1; i >= 0; i--) {
        let myNumber = Number(aArray[i]) + Number(bArray[i]) + carry;
        if (myNumber >= 10) {
            carry = 1;
            myNumber = myNumber % 10;
        } else {
            carry = 0;
        }
        finalNumber = '' + myNumber + finalNumber;
        if (i === 0 && carry === 1) {
            finalNumber = '1' + finalNumber;
        }
    }
    return finalNumber;
}

// !trick here is that when pop(remove item from array) finds no elements it returns undefined
// ~~ convert to number an undefined value will be 0
// ~4 = -3
// ~~4 = 4
// ~~'3' = 3
// ~~ = it is a shorthand version of the Math.floor()

function add2(a, b) {
    let res = '',
        c = 0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || c) {
        c += ~~a.pop() + ~~b.pop();
        res = (c % 10) + res;
        c = c > 9 ? 1 : 0;
    }
    return res;
}

console.log(`Expected 2 from add(1, 1) => ${add('1', '1')}`);
console.log(`Expected 579 from add(123, 456) => ${add('123', '456')}`);
console.log(`Expected 1110 from add(888, 222) => ${add('888', '222')}`);
console.log(`Expected 1441 from add(1372, 69) => ${add2('1372', '69')}`);
console.log(`Expected 468 from add(12, 456) => ${add2('12', '456')}`);
console.log(`Expected 201 from add(101, 100) => ${add2('101', '100')}`);
console.log(
    `Expected 91002328220491911630239667963 from add(63829983432984289347293874, 90938498237058927340892374089) => ${add(
        '63829983432984289347293874',
        '90938498237058927340892374089'
    )}`
);
