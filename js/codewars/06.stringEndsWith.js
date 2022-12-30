/*
Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string).

Examples:

solution('abc', 'bc') // returns true
solution('abc', 'd') // returns false
*/

function solution(str, ending) {
    return str.endsWith(ending);
}

function solution2(str, ending) {
    return str.substring(str.length - ending.length) == ending;
}

console.log(solution2('abc', 'bc'));
console.log(solution2('abc', 'd'));
