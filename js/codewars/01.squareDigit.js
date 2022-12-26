/*
Welcome. In this kata, you are asked to square every digit of a number and concatenate them.
For example, if we run 9119 through the function, 811181 will come out, because 9^2 is 81 and 1^2 is 1.
Note: The function accepts an integer and returns an integer
*/

//! take care when recompose number to take in consideration that the number you work with might contain 2 digits
//! eg. [81, 36, ...]
//! other thing to take in consideration is to take care of division by 10 as it will return floating number in js
//! so you need to floor the number. eg 1/10 => 0.1 > 0 TRUE

//! Math solution
function squareDigits2(num) {
    let digits_reversed = [];
    while (num / 10 > 0) {
        rest = num % 10;
        digits_reversed.push(rest * rest);
        num = Math.floor(num / 10);
    }
    digits_reversed.reverse();
    return digits_reversed.reduce((accumalator, current) => {
        if (Math.floor(current / 10) > 0) {
            return (
                (accumalator * 10 + Math.floor(current / 10)) * 10 +
                (current % 10)
            );
        } else return accumalator * 10 + current;
    }, 0);
}

//! Here is the short end solution
function squareDigits(num) {
    return Number(
        ('' + num)
            .split('')
            .map(function (val) {
                return val * val;
            })
            .join('')
    );
}

console.log(
    `squareDigits(9118) should equal 811164 => return: ${squareDigits(9118)}`
);
console.log(
    `squareDigits(9119) should equal 811181 => return: ${squareDigits(9119)}`
);
console.log(
    `squareDigits(3212) should equal 9414 => return: ${squareDigits(3212)}`
);
console.log(
    `squareDigits(2112) should equal 4114 => return: ${squareDigits(2112)}`
);
console.log(`squareDigits(0) should equal 0 => return: ${squareDigits(0)}`);

console.log(
    `squareDigits(8946959) should equal 648116368125 => return: ${squareDigits(
        8946959
    )}`
);
