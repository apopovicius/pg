/*
You are given an array of strings words and a string chars.

A string is good if it can be formed by characters from chars (each character can only be used once).

Return the sum of lengths of all good strings in words.



Example 1:

Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
Explanation: The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
Example 2:

Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
Output: 10
Explanation: The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.


Constraints:

1 <= words.length <= 1000
1 <= words[i].length, chars.length <= 100
words[i] and chars consist of lowercase English letters.
*/

/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
const countCharacters = function (words, chars) {
    let counter = 0;

    let charsFreq = {};
    for (let char of chars) {
        charsFreq[char] = (charsFreq[char] || 0) + 1;
    }

    for (let word of words) {
        let validWord = true;
        let wordFreq = {};

        for (let char of word) {
            if (!chars.includes(char)) {
                validWord = false;
                break;
            }
            wordFreq[char] = (wordFreq[char] || 0) + 1;
        }

        if (validWord) {
            let isFreqOk = true;
            for (wordLetter in wordFreq) {
                if (wordFreq[wordLetter] > charsFreq[wordLetter]) {
                    isFreqOk = false;
                    break;
                }
            }
            isFreqOk ? (counter += word.length) : counter;
        }
    }
    return counter;
};

let words = ['cat', 'bt', 'hat', 'tree'],
    chars = 'attach';

console.log(countCharacters(words, chars));

words = ['hello', 'world', 'leetcode'];
chars = 'welldonehoneyr';
console.log(countCharacters(words, chars));

words = [
    'dyiclysmffuhibgfvapygkorkqllqlvokosagyelotobicwcmebnpznjbirzrzsrtzjxhsfpiwyfhzyonmuabtlwin',
    'ndqeyhhcquplmznwslewjzuyfgklssvkqxmqjpwhrshycmvrb',
    'ulrrbpspyudncdlbkxkrqpivfftrggemkpyjl',
    'boygirdlggnh',
    'xmqohbyqwagkjzpyawsydmdaattthmuvjbzwpyopyafphx',
    'nulvimegcsiwvhwuiyednoxpugfeimnnyeoczuzxgxbqjvegcxeqnjbwnbvowastqhojepisusvsidhqmszbrnynkyop',
    'hiefuovybkpgzygprmndrkyspoiyapdwkxebgsmodhzpx',
    'juldqdzeskpffaoqcyyxiqqowsalqumddcufhouhrskozhlmobiwzxnhdkidr',
    'lnnvsdcrvzfmrvurucrzlfyigcycffpiuoo',
    'oxgaskztzroxuntiwlfyufddl',
    'tfspedteabxatkaypitjfkhkkigdwdkctqbczcugripkgcyfezpuklfqfcsccboarbfbjfrkxp',
    'qnagrpfzlyrouolqquytwnwnsqnmuzphne',
    'eeilfdaookieawrrbvtnqfzcricvhpiv',
    'sisvsjzyrbdsjcwwygdnxcjhzhsxhpceqz',
    'yhouqhjevqxtecomahbwoptzlkyvjexhzcbccusbjjdgcfzlkoqwiwue',
    'hwxxighzvceaplsycajkhynkhzkwkouszwaiuzqcleyflqrxgjsvlegvupzqijbornbfwpefhxekgpuvgiyeudhncv',
    'cpwcjwgbcquirnsazumgjjcltitmeyfaudbnbqhflvecjsupjmgwfbjo',
    'teyygdmmyadppuopvqdodaczob',
    'qaeowuwqsqffvibrtxnjnzvzuuonrkwpysyxvkijemmpdmtnqxwekbpfzs',
    'qqxpxpmemkldghbmbyxpkwgkaykaerhmwwjonrhcsubchs',
];

chars = 'usdruypficfbpfbivlrhutcgvyjenlxzeovdyjtgvvfdjzcmikjraspdfp';
console.log(countCharacters(words, chars));
