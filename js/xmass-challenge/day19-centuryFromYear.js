function centuryFromYear(num) {
    return num % 100 > 1 ? Math.floor(num / 100) + 1 : Math.floor(num / 100);
}

/**
 * Test Suite
 */
console.log('centuryFromYear() => returns current century');
let year = 1905;
let result = centuryFromYear(year);
console.log('Expecting 20 century for 1905. The return result: ', result);
console.log('returns current century for edge case of start of century');
year = 1700;
result = centuryFromYear(year);
console.log('Expecting 17 for 1700. The return result: ', result);
