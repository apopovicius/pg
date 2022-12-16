function insertDashes(arr) {
    const words = arr.split(' ');
    let dashed = [];
    for (let word of words) {
        const dashedWord = word.split('').join('-');
        dashed.push(dashedWord);
    }
    return dashed.join(' ');
}

function insertDashesOneLine(arr) {
    return arr
        .split(' ')
        .map((word) => word.split('').join('-'))
        .join(' ');
}

/**
 * !Test Suite
 */

console.log('insert dashes in between chars');
const value = 'aba caba';
const result = insertDashes(value);
const resultOneLine = insertDashesOneLine(value);
console.log('result:', result);
console.log('result one line:', resultOneLine);
console.log('Expected to be: a-b-a c-a-b-a');
