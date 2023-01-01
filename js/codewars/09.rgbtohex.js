/*
The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.

Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.

The following are examples of expected output values:

rgb(255, 255, 255) // returns FFFFFF
rgb(255, 255, 300) // returns FFFFFF
rgb(0,0,0) // returns 000000
rgb(148, 0, 211) // returns 9400D3
*/

function validateInput(n) {
    if (n <= 0) return '00';
    if (n > 255) return 'FF';
    if (n <= 15) return '0' + n.toString(16).toUpperCase();
    return n.toString(16).toUpperCase();
}

function rgb(r, g, b) {
    return validateInput(r) + validateInput(g) + validateInput(b);
}

console.log(rgb(255, 255, 255));
console.log(rgb(255, 255, 300));
console.log(rgb(0, 0, 0));
console.log(rgb(148, 0, 211));
console.log(rgb(243, 7, -20));
console.log(rgb(272, 12, 299));
