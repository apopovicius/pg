/*
Given the string representations of two integers,
return the string representation of the sum of those integers.

For example:

sumStrings('1','2') // => '3'
A string representation of an integer will contain no characters besides the ten numerals "0" to "9".
*/

function sumStrings(a, b) {
    let res = '',
        c = 0;
    let x = a.split('');
    let y = b.split('');
    while (x.length || y.length || c) {
        c += ~~x.pop() + ~~y.pop();
        res = (c % 10) + res;
        c = c > 9 ? 1 : 0;
    }

    // filter the numbers started with 000
    // eg: 00103
    let i = 0;
    do {
        if (res[i] === '0') {
            res = res.slice(i + 1);
        } else {
            break;
        }
    } while (res[i] === '0');
    return res;
}

console.log(sumStrings('123', '456'), '579');
console.log(sumStrings('0000103', '0008567'), '8670');
