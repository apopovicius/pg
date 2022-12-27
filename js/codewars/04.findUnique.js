/*
There is an array with some numbers. All numbers are equal except for one. Try to find it!

findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
It’s guaranteed that array contains at least 3 numbers.

The tests contain some very huge arrays, so think about performance.
*/

function findUniq(arr) {
    // do magic
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[0])
            if (arr[i] !== arr[i + 1]) return arr[i];
            else return arr[0];
    }
}

// not so optimal
function findUniq2(arr) {
    arr = arr.sort();
    if (arr[0] === arr[1]) {
        return arr[arr.length - 1];
    } else {
        return arr[0];
    }
}

//or find
function findUniq3(arr) {
    return arr.find((e) => arr.lastIndexOf(e) === arr.indexOf(e));
}

console.log(findUniq([1, 1, 1, 2, 1, 1]));
console.log(findUniq([0, 0, 0.55, 0, 0]));
console.log(findUniq([1, 0, 0]));
console.log(findUniq([0, 1, 0]));
console.log(findUniq([1, 0, 0]));
console.log(findUniq([0, 0, 1]));
console.log(findUniq([1, 1, 1, 2, 1, 1]));
console.log(findUniq([1, 1, 2, 1, 1]));
console.log(findUniq([3, 10, 3, 3, 3]));
console.log(findUniq([2, 1, 1, 1]));
