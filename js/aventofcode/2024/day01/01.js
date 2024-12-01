const fs = require('fs');

const content = fs.readFileSync('./01.in').toString('utf-8').split('\r\n');
const left = [];
const right = [];
content.forEach(e => {
    const [l, r] = e.split('   ');
    left.push(+l);
    right.push(+r);
});

left.sort();
right.sort();

let sumP1 = 0;
let sumP2 = 0;
for(let i=0; i<left.length; i++) {
    sumP1 = sumP1 + Math.abs(right[i]-left[i]);
    let howMany = 0;
    for(let j=0;j<right.length;j++) {
        if(left[i] === right[j]) 
            howMany++;
        if(right[j] > left[i]) {
            sumP2 = sumP2 + (howMany * left[i]);
            break;
        }       
    }

}

console.log(sumP1);
console.log(sumP2);