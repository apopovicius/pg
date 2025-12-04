const fs = require('fs');

const content = fs.readFileSync('data.in').toString('utf-8').split('\r\n');
const resP1 = 0;
const resP2 = 0;

fs.writeFileSync('data.out', resP1.toString()+"\n", {encoding: 'utf-8'});
fs.writeFileSync('data.out', resP2.toString(), {encoding: 'utf-8', flag: 'a+'});