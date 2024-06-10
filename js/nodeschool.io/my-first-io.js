const { isUtf8 } = require('buffer');

const fs = require('fs');
const content = fs.readFileSync(process.argv[2], {encoding:'utf8'});
const newLinesCount = content.split('\n').length;
console.log(newLinesCount-1);
