/*
Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.

For example (Input --> Output):

39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit)
999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2)
4 --> 0 (because 4 is already a one-digit number)
*/

//! getting digits from number
//let num = 12345;
//[...num+''] //["1", "2", "3", "4", "5"]
//[...num+''].map(n=>+n) //[1, 2, 3, 4, 5]

function productOfDigits(num) {
    let digits = [];
    while (num !== 0) {
        digits.push(num % 10);
        num = (num / 10) | 0;
    }
    return digits.reduce((acc, prev) => acc * prev);
}

// num | 0 = Math.floor(num)
function persistence(num) {
    let retValue = 0;

    while (true) {
        if (((num / 10) | 0) === 0) {
            return retValue;
        }
        num = productOfDigits(num);
        retValue++;
    }
}

// string version
function persistenceUsingToString(num) {
    var times = 0;

    num = num.toString();

    while (num.length > 1) {
        times++;
        num = num
            .split('')
            .map(Number)
            .reduce((a, b) => a * b)
            .toString();
    }

    return times;
}

console.log(`Expect 3 from calling with 39 => ${persistence(39)}`);
console.log(`Expect 4 from calling with 999 => ${persistence(999)}`);
console.log(`Expect 0 from calling with 4 => ${persistence(4)}`);
