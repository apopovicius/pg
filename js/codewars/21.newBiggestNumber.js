/*
Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:

12 ==> 21
513 ==> 531
2017 ==> 2071
nextBigger(num: 12)   // returns 21
nextBigger(num: 513)  // returns 531
nextBigger(num: 2017) // returns 2071
If the digits can't be rearranged to form a bigger number, return -1 (or nil in Swift):

9 ==> -1
111 ==> -1
531 ==> -1
nextBigger(num: 9)   // returns nil
nextBigger(num: 111) // returns nil
nextBigger(num: 531) // returns nil
*/

function nextBigger(n) {
    //your code here
    let digits = n.toString().split('');
    if (digits.length < 2) return -1;

    let origin = [...digits];
    let isSorted = true;

    // 1. check if sorted asc
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] >= digits[i + 1]) {
            isSorted = false;
            break;
        }
    }

    // for sorted asc array just reverse the last 2 digits
    if (isSorted) {
        origin[digits.length - 2] = digits[digits.length - 1];
        origin[digits.length - 1] = digits[digits.length - 2];
        return origin.join('');
    }

    // 2. check if sorted desc
    isSorted = true;
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] <= digits[i + 1]) {
            isSorted = false;
            break;
        }
    }

    // for desc sort array we cant find a solution
    if (isSorted) {
        return -1;
    }

    // travers from right to left and find the first digit that is lower than previous value
    // e.g 534976, 4 < 9 => theD = 4
    // if there is no such value => not possible
    // right side of theD 4 976 search the smallest greater digit. 6
    // swap the values => 534976 become 536974
    // sort all digits after the position of theD: 974 becomes  479
    // final result 536479

    let theD = '';
    let dPos = -1;
    let result = [];

    for (let i = digits.length - 1; i >= 1; i--) {
        if (digits[i] > digits[i - 1]) {
            theD = digits[i - 1];
            dPos = i - 1;
            break;
        }
    }
    // if we dont find one digit lower than previous traversed digit
    if (theD === '') {
        return -1;
    }

    result = digits.slice(0, dPos);
    let remaining = digits.slice(dPos + 1).sort((a, b) => a - b);
    let smallestGreater = remaining.filter((el) => el > theD);
    result.push(smallestGreater[0]);
    // remove the smallestGreater value from remaining
    remaining.splice(remaining.indexOf(smallestGreater[0]), 1);
    remaining.push(theD);
    remaining.sort((a, b) => a - b);
    result = result.concat(remaining);
    return result.join('');
}

console.log(nextBigger(12), 21);
console.log(nextBigger(1234), 1234);
console.log(nextBigger(531), -1);
console.log(nextBigger(513), 531);
console.log(nextBigger(2017), 2071);
console.log(nextBigger(414), 441);
console.log(nextBigger(144), 414);
console.log(nextBigger(143), 314);
console.log(nextBigger(9));
console.log(nextBigger(72560), 72605);
console.log(nextBigger(534976));
console.log(nextBigger(941618482));
console.log(nextBigger(792));
