/*
Your task is to return an output string that translates an input string s by replacing each character in s with a number representing the number of times that character occurs in s and separating each number with the sep character(s).

Example (s, sep --> Output)

"hello world", "-" --> "1-1-3-3-2-1-1-2-1-3-1"
"19999999"   , ":" --> "1:7:7:7:7:7:7:7"
"^^^**$"     , "x" --> "3x3x3x2x2x1"
*/

/*
n = +'4096'    // n === 4096
s = '' + 200   // s === '200'
*/

function freqSeq(str, sep) {
    const stringMap = new Map();
    for (const ch of str) {
        stringMap.set(ch, (stringMap.get(ch) | 0) + 1);
    }
    let translatedString = '';
    for (const ch of str) {
        translatedString += '' + stringMap.get(ch) + sep;
    }
    return translatedString.slice(0, -1);
}

// !shorthand
// arr.map(function(element, index, array){  }, this);
// The callback function() is called on each array element,
// and the map() method always passes the current element,
//  the index of the current element,
// and the whole array object to it.
function freqSeq2(str, sep) {
    return str
        .split('')
        .map((v, i, arr) => arr.filter((vi) => vi === v).length)
        .join(sep);
}

console.log(
    `Expecting 1-1-3-3-2-1-1-2-1-3-1 for ${freqSeq('hello world', '-')}`
);
console.log(`Expecting 1:7:7:7:7:7:7:7 for ${freqSeq('19999999', ':')}`);
console.log(`Expecting 3x3x3x2x2x1 for ${freqSeq('^^^**$', 'x')}`);
