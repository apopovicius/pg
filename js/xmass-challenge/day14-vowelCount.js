function isVowel(x) {
    return x === 'a' || x == 'e' || x == 'i' || x == 'o' || x == 'u';
}

function countVowelConsonant(str) {
    str = str.toLowerCase();
    const intialValue = 0;
    const total = str.split('').reduce((accumaltor, current) => {
        return isVowel(current) ? (accumaltor += 1) : (accumaltor += 2);
    }, intialValue);
    return total;
}

/**
 * Test Suite
 */
console.log('returns total of vowels(1) and consonants(2) to be added');
let value = 'abcde';
let result = countVowelConsonant(value);
console.log(`${value} expected be 8 => result is ${result}`);
value = 'aaa';
result = countVowelConsonant(value);
console.log(`${value} expected be 3 => result is ${result}`);
value = 'aBa';
result = countVowelConsonant(value);
console.log(`${value} expected be 4 => result is ${result}`);
value = 'bbv';
result = countVowelConsonant(value);
console.log(`${value} expected be 6 => result is ${result}`);
