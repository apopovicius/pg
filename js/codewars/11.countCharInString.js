/*
The main idea is to count all the occurring characters in a string. If you have a string like 'aba', then the result should be {'a': 2, 'b': 1}.
What if the string is empty? Then the result should be empty object literal, {}.
*/

function count(string) {
    // The function code should be here
    let counter = {};
    for (let char of string) {
        // counter[char] = !counter.hasOwnProperty(char)
        //     ? 1
        //     : counter[char] + 1;
        counter[char] = (counter[char] || 0) + 1;
    }
    return counter;
}

//working with properties
function count2(string) {
    return string.split('').reduce(function (obj, elem) {
        if (elem in obj) obj[elem]++;
        else obj[elem] = 1;
        return obj;
    }, {});
}

console.log(count2('abaac'));
