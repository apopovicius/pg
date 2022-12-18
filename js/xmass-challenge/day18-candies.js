function candies(children, candy) {
    //  write code here.
    return Math.floor(candy / children) * children;
}

/**
 * Test Suite
 */

console.log('returns ammount of total equal candy to be eaten');
const children = 3;
const candy = 10;
const result = candies(children, candy);
console.log('result: ', result);
console.log('expected result: 9');
