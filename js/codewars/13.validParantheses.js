/*
Write a function that takes a string of parentheses, and determines if the order of the parentheses is valid. The function should return true if the string is valid, and false if it's invalid.

Examples
"()"              =>  true
")(()))"          =>  false
"("               =>  false
"(())((()())())"  =>  true
*/

function validParentheses(parens) {
    let open = 0;
    for (p of parens) {
        if (p === '(') open++;
        if (p === ')') open--;
        if (open < 0) return false; // includes check when string starts with `)`
    }
    return open === 0;
}

console.log(validParentheses('()'));
console.log(validParentheses(')(()))'));
console.log(validParentheses('('));
console.log(validParentheses('(())((()())())'));
