/*
There is a secret string which is unknown to you.
Given a collection of random triplets from the string, recover the original string.

A triplet here is defined as a sequence of three letters such that each letter occurs
somewhere before the next in the given string. "whi" is a triplet for the string "whatisup".

As a simplification, you may assume that no letter occurs more than once in the secret string.

You can assume nothing about the triplets given to you other than that they are valid triplets
and that they contain sufficient information to deduce the original string.
In particular, this means that the secret string will never contain letters that do not occur
in one of the triplets given to you.
*/

// looking to the secret sample: `whatisup` it can be observed that each letter appair once
// 1. therefor take the array of tripplets and compose a set to obtain the letters of the secrets.
// this set will be our secret that will work and try to decode
// 2. for each triplet from the array we will get the order of each letter
// eg. 't', 's', 'u' -> this tells us that 't' is before 's' and 's' is before 'u'
// 3. for each tuplet we take the secret eg 'tupwhisa' and make sure the order of 't', 's', 'u' is respected
// e.g. in this same 'u' is outplace.
// do the following things:
// a. for each letter in triplet take the char location from the incoming secret
// b. if location for 't' < location of 's' and location of 's' < location of 'u'
// TRUE ? => this means there is a order and triplet is considered validated
// FALSE?  but in our example it's not =>
// take out from secret each leter from triplet and replace each letter but this time in the right order
// e.g. 'tupwhisa' & 't', 's', 'u'
// 'u' is out of order
// we have:
// t-position 0(starting from zero)
// s-position 6
// u-position 1
// after ordering the array of possition we will replace like this:
// position 0 where 't' replaced with 't'
// position 1 where 'u' replaced with 's'
// position 6 where 's' replaced with 'u'
// return the new computed secret 'tspwhiua'
// 4. for each triple that did not required reposition we encrease a counter
// 5. if triplet required reposition counter become zero and we reiterate the array of tuplets.
// 6. reiterate till the counter reach the number of triplets from array. this way we make sure all the triplets were validated
// 7. the last secret will be the secret we look for

function orderTriplet(c1, c2, c3, secret) {
    let cp1 = secret.indexOf(c1);
    let cp2 = secret.indexOf(c2);
    let cp3 = secret.indexOf(c3);
    if (cp1 < cp2 && cp2 < cp3) {
        return false;
    }

    // reposition on the same positions but in the right order
    let orderedPos = [cp1, cp2, cp3].sort((a, b) => a - b);
    secret.splice(orderedPos[0], 1, c1);
    secret.splice(orderedPos[1], 1, c2);
    secret.splice(orderedPos[2], 1, c3);
    return true;
}

var recoverSecret = function (triplets) {
    let secretMixed = Array.from(new Set(triplets.flat()));
    let count = 0;
    while (count !== triplets.length) {
        for (let triplet of triplets) {
            if (orderTriplet(triplet[0], triplet[1], triplet[2], secretMixed)) {
                count = 0;
            } else {
                count++;
            }
            //we do this because the triplet might not finish and count might reach legth of triplets
            //as soon as we have all triplet validated we have our secret
            if (count === triplets.length) {
                break;
            }
        }
    }
    return secretMixed.join('');
};

let secret1 = 'whatisup';
let triplets1 = [
    ['t', 'u', 'p'],
    ['w', 'h', 'i'],
    ['t', 's', 'u'],
    ['a', 't', 's'],
    ['h', 'a', 'p'],
    ['t', 'i', 's'],
    ['w', 'h', 's'],
];

let secret2 = 'mathisfun';
let triplets2 = [
    ['t', 's', 'f'],
    ['a', 's', 'u'],
    ['m', 'a', 'f'],
    ['a', 'i', 'n'],
    ['s', 'u', 'n'],
    ['m', 'f', 'u'],
    ['a', 't', 'h'],
    ['t', 'h', 'i'],
    ['h', 'i', 'f'],
    ['m', 'h', 'f'],
    ['a', 'u', 'n'],
    ['m', 'a', 't'],
    ['f', 'u', 'n'],
    ['h', 's', 'n'],
    ['a', 'i', 's'],
    ['m', 's', 'n'],
    ['m', 's', 'u'],
];

let secret3 = 'congrats';
let triplets3 = [
    ['g', 'a', 's'],
    ['o', 'g', 's'],
    ['c', 'n', 't'],
    ['c', 'o', 'n'],
    ['a', 't', 's'],
    ['g', 'r', 't'],
    ['r', 't', 's'],
    ['c', 'r', 'a'],
    ['g', 'a', 't'],
    ['n', 'g', 's'],
    ['o', 'a', 's'],
];

let secret4 = 'solved';
let triplets4 = [
    ['l', 'e', 'd'],
    ['o', 'e', 'd'],
    ['o', 'l', 'e'],
    ['o', 'v', 'e'],
    ['s', 'o', 'l'],
    ['s', 'e', 'd'],
    ['s', 'l', 'e'],
    ['v', 'e', 'd'],
    ['o', 'l', 'v'],
    ['l', 'v', 'd'],
];

let secret5 = 'abcdefghijklmnopqrstuvwxyz';
let triplets5 = [
    ['o', 'x', 'y'],
    ['h', 'r', 'u'],
    ['b', 'x', 'z'],
    ['r', 'y', 'z'],
    ['v', 'y', 'z'],
    ['v', 'w', 'y'],
    ['o', 's', 'y'],
    ['i', 'u', 'z'],
    ['q', 'y', 'z'],
    ['k', 'p', 'v'],
    ['w', 'x', 'z'],
    ['k', 'x', 'y'],
    ['r', 'w', 'x'],
    ['a', 'n', 'w'],
    ['b', 'd', 't'],
    ['p', 'u', 'y'],
    ['n', 'v', 'z'],
    ['f', 'k', 'q'],
    ['i', 'm', 'z'],
    ['a', 'w', 'y'],
    ['b', 'k', 'n'],
    ['t', 'u', 'w'],
    ['x', 'y', 'z'],
    ['f', 'g', 'j'],
    ['n', 'y', 'z'],
    ['s', 'y', 'z'],
    ['k', 'w', 'x'],
    ['m', 's', 'u'],
    ['h', 'i', 's'],
    ['q', 'w', 'z'],
    ['w', 'y', 'z'],
    ['j', 'o', 'p'],
    ['r', 'v', 'y'],
    ['h', 'p', 'w'],
    ['s', 't', 'z'],
    ['j', 'k', 'r'],
    ['n', 'u', 'w'],
    ['h', 'v', 'w'],
    ['t', 'u', 'y'],
    ['l', 'q', 'y'],
    ['v', 'w', 'x'],
    ['r', 'w', 'z'],
    ['m', 'o', 'w'],
    ['k', 'q', 'x'],
    ['e', 'h', 'r'],
    ['e', 'k', 'l'],
    ['d', 'h', 'p'],
    ['r', 'u', 'w'],
    ['e', 'g', 'n'],
    ['m', 'o', 'y'],
    ['q', 'r', 's'],
    ['d', 'i', 'q'],
    ['u', 'w', 'z'],
    ['u', 'w', 'x'],
    ['u', 'x', 'z'],
    ['e', 'l', 'x'],
    ['p', 't', 'v'],
    ['k', 't', 'w'],
    ['v', 'x', 'y'],
    ['f', 'y', 'z'],
    ['v', 'w', 'z'],
    ['d', 'f', 'h'],
    ['h', 't', 'x'],
    ['c', 'w', 'x'],
    ['v', 'x', 'z'],
    ['f', 'p', 'x'],
    ['g', 'x', 'y'],
    ['g', 'v', 'w'],
    ['f', 'l', 's'],
    ['c', 'f', 'v'],
    ['g', 'q', 's'],
    ['d', 't', 'y'],
    ['j', 'p', 't'],
    ['d', 'k', 's'],
    ['s', 'w', 'x'],
    ['d', 'q', 'x'],
    ['o', 'r', 's'],
    ['l', 'v', 'y'],
    ['r', 't', 'y'],
    ['i', 'y', 'z'],
    ['g', 'r', 'w'],
    ['g', 'h', 'l'],
    ['c', 'x', 'z'],
    ['g', 't', 'v'],
    ['f', 'g', 'n'],
    ['l', 'r', 't'],
    ['r', 'u', 'x'],
    ['u', 'x', 'y'],
    ['s', 'x', 'y'],
    ['b', 'u', 'z'],
    ['l', 'w', 'y'],
    ['a', 'n', 'v'],
    ['k', 'l', 'z'],
    ['n', 'q', 'w'],
    ['m', 'u', 'z'],
    ['k', 'u', 'y'],
    ['t', 'v', 'z'],
    ['o', 'w', 'z'],
    ['c', 'h', 'y'],
    ['h', 's', 'y'],
    ['l', 'r', 'z'],
    ['a', 's', 'z'],
    ['f', 'r', 'v'],
    ['d', 'q', 'v'],
    ['u', 'v', 'y'],
    ['t', 'x', 'y'],
    ['b', 'w', 'y'],
    ['j', 'q', 'u'],
    ['o', 't', 'y'],
    ['p', 'y', 'z'],
    ['l', 'y', 'z'],
    ['n', 's', 'u'],
    ['m', 's', 'x'],
    ['b', 's', 'y'],
    ['l', 's', 'z'],
    ['d', 'm', 'u'],
    ['i', 'o', 'w'],
    ['c', 'v', 'w'],
    ['t', 'y', 'z'],
    ['l', 'n', 'y'],
    ['m', 'x', 'y'],
    ['n', 'v', 'x'],
    ['n', 'u', 'z'],
    ['g', 'h', 's'],
    ['r', 'v', 'w'],
    ['j', 'u', 'x'],
    ['m', 'v', 'z'],
    ['d', 'r', 'z'],
    ['o', 'v', 'x'],
    ['f', 'n', 'q'],
    ['a', 'b', 't'],
    ['h', 'v', 'x'],
    ['e', 'u', 'x'],
    ['o', 'w', 'y'],
    ['d', 'i', 'm'],
    ['a', 'f', 'w'],
    ['f', 'n', 'r'],
    ['d', 'm', 'x'],
    ['p', 'r', 'z'],
    ['p', 'u', 'v'],
    ['e', 'y', 'z'],
    ['c', 'o', 'x'],
    ['c', 'x', 'y'],
    ['a', 'i', 'w'],
    ['q', 'x', 'y'],
    ['c', 'i', 'n'],
    ['u', 'v', 'z'],
    ['u', 'w', 'y'],
    ['f', 'r', 'x'],
    ['t', 'w', 'z'],
    ['e', 'r', 'v'],
    ['o', 'q', 't'],
    ['m', 'w', 'x'],
    ['g', 'v', 'x'],
    ['c', 'j', 'k'],
    ['i', 's', 'y'],
    ['g', 's', 'u'],
    ['i', 'j', 's'],
    ['d', 'm', 'n'],
    ['l', 'n', 'v'],
    ['e', 's', 'w'],
    ['o', 'u', 'w'],
    ['b', 's', 'z'],
    ['a', 'd', 'g'],
    ['l', 'w', 'x'],
    ['m', 'r', 'x'],
    ['j', 'k', 'l'],
    ['f', 'p', 's'],
    ['p', 'r', 'v'],
    ['g', 'x', 'z'],
    ['o', 'u', 'z'],
    ['h', 'k', 's'],
    ['i', 'r', 'w'],
    ['n', 'q', 'y'],
    ['o', 'q', 'r'],
    ['f', 'q', 'y'],
    ['e', 'j', 'z'],
    ['e', 'o', 'u'],
    ['j', 'k', 'z'],
    ['b', 'g', 't'],
    ['f', 'v', 'w'],
    ['w', 'x', 'y'],
    ['t', 'v', 'w'],
    ['a', 'p', 'w'],
    ['c', 'l', 'x'],
    ['q', 's', 'y'],
    ['k', 'n', 'q'],
    ['d', 'y', 'z'],
    ['i', 'p', 'v'],
    ['e', 'k', 'y'],
    ['e', 'w', 'z'],
    ['i', 'm', 'v'],
    ['j', 's', 'v'],
    ['l', 'o', 'u'],
    ['e', 'o', 'q'],
    ['a', 'i', 's'],
    ['e', 'm', 'y'],
    ['b', 'y', 'z'],
    ['c', 'k', 'u'],
    ['a', 'k', 'p'],
    ['p', 'x', 'y'],
    ['h', 'p', 'q'],
    ['p', 't', 'w'],
    ['e', 'x', 'z'],
    ['l', 'p', 'y'],
    ['m', 'y', 'z'],
    ['l', 't', 'v'],
    ['d', 'g', 'n'],
    ['h', 'o', 't'],
    ['c', 't', 'x'],
    ['a', 'o', 'v'],
    ['m', 'v', 'x'],
    ['k', 'o', 'q'],
    ['i', 'v', 'y'],
    ['b', 'm', 's'],
    ['h', 'q', 'w'],
    ['f', 'h', 'x'],
    ['i', 'v', 'z'],
    ['f', 't', 'w'],
    ['l', 'v', 'z'],
    ['f', 'g', 'w'],
    ['s', 'w', 'z'],
    ['j', 'k', 'o'],
    ['d', 'j', 'm'],
    ['r', 't', 'u'],
    ['k', 'm', 'z'],
    ['q', 'w', 'y'],
    ['q', 'u', 'v'],
    ['g', 's', 'x'],
    ['p', 's', 't'],
    ['i', 'm', 't'],
    ['c', 'g', 'y'],
    ['n', 'w', 'z'],
    ['o', 'r', 'z'],
    ['h', 'i', 'm'],
    ['n', 't', 'w'],
    ['s', 'u', 'y'],
    ['s', 'x', 'z'],
    ['h', 'x', 'z'],
    ['e', 'f', 'x'],
    ['a', 'k', 'n'],
    ['h', 's', 'z'],
    ['j', 'o', 'w'],
    ['o', 't', 'x'],
    ['l', 'n', 'r'],
    ['m', 'x', 'z'],
    ['r', 'x', 'y'],
    ['b', 'w', 'z'],
    ['c', 'j', 'q'],
    ['b', 'f', 'o'],
    ['o', 'x', 'z'],
    ['i', 'j', 'r'],
    ['p', 'q', 'y'],
    ['j', 'p', 's'],
    ['m', 'r', 'w'],
    ['a', 'e', 'y'],
    ['u', 'y', 'z'],
    ['j', 'l', 'u'],
    ['j', 's', 'y'],
    ['k', 'x', 'z'],
    ['p', 'v', 'y'],
    ['j', 'l', 'p'],
    ['p', 'v', 'z'],
    ['f', 'h', 't'],
    ['k', 'n', 'x'],
    ['f', 'n', 'o'],
    ['p', 'v', 'w'],
    ['k', 'v', 'y'],
    ['j', 'w', 'y'],
    ['e', 'n', 's'],
    ['f', 'j', 'p'],
    ['f', 'u', 'w'],
    ['g', 'm', 'z'],
    ['n', 's', 'y'],
    ['m', 's', 'z'],
    ['c', 'd', 'x'],
    ['l', 'x', 'y'],
    ['g', 'y', 'z'],
    ['b', 't', 'w'],
    ['n', 'q', 'z'],
    ['r', 'w', 'y'],
    ['r', 't', 'w'],
    ['l', 't', 'x'],
    ['m', 'w', 'y'],
    ['h', 'm', 't'],
    ['k', 'n', 'v'],
    ['a', 'j', 'y'],
    ['f', 'q', 'w'],
    ['s', 'u', 'w'],
    ['p', 't', 'z'],
    ['j', 'l', 'r'],
    ['m', 'n', 'w'],
    ['n', 't', 'v'],
    ['n', 'p', 'r'],
    ['l', 'u', 'w'],
    ['g', 'j', 'o'],
    ['b', 'j', 'v'],
    ['m', 'o', 't'],
    ['k', 'w', 'z'],
    ['f', 'i', 'n'],
    ['i', 'u', 'y'],
    ['p', 'v', 'x'],
    ['k', 'l', 'u'],
    ['b', 'c', 'f'],
    ['f', 'q', 'v'],
    ['c', 'h', 'u'],
    ['i', 'n', 'w'],
    ['q', 's', 't'],
    ['k', 'q', 'w'],
    ['o', 'q', 's'],
    ['o', 'r', 'v'],
    ['m', 't', 'u'],
    ['n', 'u', 'y'],
    ['c', 's', 'z'],
    ['o', 'q', 'x'],
    ['r', 't', 'z'],
    ['a', 'g', 'q'],
    ['g', 's', 'z'],
    ['i', 'w', 'y'],
    ['j', 'l', 'y'],
    ['e', 'v', 'x'],
    ['e', 'n', 't'],
    ['f', 'g', 'v'],
    ['a', 'j', 'n'],
    ['d', 'h', 'r'],
    ['a', 'p', 'u'],
    ['l', 's', 'v'],
    ['l', 'q', 'z'],
    ['k', 'y', 'z'],
    ['r', 's', 'y'],
    ['n', 'x', 'y'],
    ['o', 'u', 'x'],
    ['n', 'q', 't'],
    ['c', 'f', 'h'],
    ['q', 's', 'x'],
    ['a', 'l', 'p'],
    ['l', 's', 'u'],
    ['e', 'r', 'y'],
    ['k', 'v', 'x'],
    ['j', 'o', 's'],
    ['o', 'p', 'q'],
    ['m', 'v', 'w'],
    ['o', 'q', 'v'],
    ['a', 'w', 'z'],
    ['l', 'u', 'x'],
    ['g', 's', 'v'],
    ['p', 'q', 'v'],
    ['b', 'o', 's'],
    ['o', 's', 'v'],
    ['f', 'h', 'y'],
    ['k', 's', 'w'],
    ['h', 't', 'u'],
    ['t', 'v', 'x'],
    ['q', 'v', 'w'],
    ['j', 'p', 'v'],
    ['c', 'l', 'u'],
    ['m', 's', 'w'],
    ['e', 'j', 'p'],
    ['e', 'f', 'h'],
    ['a', 's', 't'],
    ['i', 'k', 't'],
    ['j', 'l', 'm'],
    ['d', 'e', 'x'],
    ['j', 'x', 'y'],
    ['a', 'k', 'v'],
    ['j', 'q', 'v'],
    ['s', 'v', 'y'],
    ['d', 'k', 'q'],
    ['g', 'o', 's'],
    ['a', 'u', 'y'],
    ['h', 'u', 'x'],
    ['e', 'q', 's'],
    ['a', 'f', 'v'],
    ['i', 'r', 'x'],
    ['o', 'y', 'z'],
    ['h', 'v', 'z'],
    ['i', 'u', 'v'],
    ['h', 'p', 'x'],
    ['i', 't', 'z'],
    ['f', 'o', 'q'],
    ['a', 'x', 'y'],
    ['t', 'w', 'x'],
    ['c', 'u', 'w'],
    ['b', 'g', 'u'],
    ['q', 'v', 'y'],
    ['r', 'x', 'z'],
    ['s', 'u', 'x'],
    ['s', 'v', 'z'],
    ['e', 'h', 'l'],
    ['e', 'w', 'y'],
    ['j', 's', 'x'],
    ['q', 'w', 'x'],
    ['q', 'x', 'z'],
    ['f', 'l', 'n'],
    ['d', 'n', 'y'],
    ['j', 'r', 'u'],
    ['u', 'v', 'w'],
    ['t', 'x', 'z'],
    ['m', 'o', 'z'],
    ['f', 'm', 'q'],
    ['k', 'l', 'y'],
    ['f', 's', 'x'],
    ['m', 'w', 'z'],
    ['g', 'w', 'x'],
    ['m', 'u', 'y'],
    ['n', 'q', 'u'],
    ['l', 't', 'w'],
    ['r', 'u', 'z'],
    ['o', 's', 'w'],
    ['d', 's', 'y'],
    ['u', 'v', 'x'],
    ['h', 'y', 'z'],
    ['g', 'm', 'u'],
    ['a', 'c', 'l'],
    ['d', 'e', 'k'],
    ['p', 'q', 's'],
    ['g', 'j', 'l'],
    ['c', 'e', 'g'],
    ['b', 'l', 'v'],
    ['o', 'q', 'z'],
    ['p', 'q', 'u'],
    ['m', 'u', 'w'],
    ['j', 'n', 'y'],
    ['c', 'q', 'v'],
    ['p', 'u', 'w'],
    ['i', 'o', 'y'],
    ['f', 'm', 'x'],
    ['j', 't', 'x'],
    ['h', 'm', 'x'],
    ['c', 's', 'x'],
    ['i', 'q', 'v'],
    ['s', 'v', 'w'],
    ['i', 'w', 'x'],
    ['m', 'p', 't'],
    ['o', 'v', 'y'],
    ['p', 't', 'u'],
    ['e', 'w', 'x'],
    ['n', 'r', 's'],
    ['e', 'l', 'z'],
    ['s', 'u', 'z'],
    ['g', 'm', 't'],
    ['h', 'u', 'v'],
    ['r', 't', 'x'],
    ['l', 's', 'x'],
    ['o', 'p', 'v'],
    ['n', 'v', 'w'],
    ['p', 's', 'u'],
    ['e', 's', 'u'],
    ['j', 'y', 'z'],
    ['f', 'n', 'u'],
    ['h', 's', 'v'],
    ['f', 'm', 'n'],
    ['i', 'q', 'x'],
    ['d', 'j', 'l'],
    ['k', 't', 'v'],
    ['o', 'p', 'w'],
    ['e', 'k', 'm'],
    ['j', 'n', 'v'],
    ['h', 'j', 'p'],
    ['p', 'x', 'z'],
    ['c', 'g', 't'],
    ['i', 'n', 'r'],
    ['h', 'o', 'p'],
    ['c', 'h', 'v'],
    ['l', 'p', 'z'],
    ['q', 'v', 'z'],
    ['e', 't', 'w'],
    ['b', 't', 'x'],
    ['d', 'v', 'x'],
    ['l', 'r', 'u'],
    ['f', 'k', 'y'],
    ['f', 'x', 'y'],
    ['h', 'm', 'n'],
    ['s', 'v', 'x'],
];

let startTime = performance.now();
let result = recoverSecret(triplets1);
let endTime = performance.now();
console.log(
    `Expected secret: ${secret1} obtained: ${result} -> ${
        recoverSecret(triplets1) === secret1
    } executed in  ${endTime - startTime} milliseconds`
);

startTime = performance.now();
result = recoverSecret(triplets2);
endTime = performance.now();
console.log(
    `Expected secret: ${secret2} obtained: ${result} -> ${
        recoverSecret(triplets2) === secret2
    } executed in  ${endTime - startTime} milliseconds`
);

startTime = performance.now();
result = recoverSecret(triplets3);
endTime = performance.now();
console.log(
    `Expected secret: ${secret3} obtained: ${result} -> ${
        recoverSecret(triplets3) === secret3
    } executed in  ${endTime - startTime} milliseconds`
);

startTime = performance.now();
result = recoverSecret(triplets4);
endTime = performance.now();
console.log(
    `Expected secret: ${secret4} obtained: ${result} -> ${
        recoverSecret(triplets4) === secret4
    } executed in  ${endTime - startTime} milliseconds`
);

startTime = performance.now();
result = recoverSecret(triplets5);
endTime = performance.now();
console.log(
    `Expected secret: ${secret5} obtained: ${result} -> ${
        recoverSecret(triplets5) === secret5
    } executed in  ${endTime - startTime} milliseconds`
);
