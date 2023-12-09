const fs = require('fs');
const digitsMap = {
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
};

const extractDigitNumbers = (line) => {
  const numbers = [];
  const positions = [];
  for(let i=0; i<line.length; i++)
    if(!isNaN(line[i])) {
      numbers.push(+line[i]);
      positions.push(i);
  }
  return [numbers, positions];
};

const extractDigitWords = (line) => {
  let digits = [];
  let positions = [];
  const digitsWord = Object.keys(digitsMap);
  digitsWord.forEach(element => {
    let copy = line;
    while(true) {
      let index = copy.search(element);
      if(index != -1) {
        digits.push(digitsMap[element]);
        positions.push(index);
        let rep = '#'.repeat(element.length);
        copy = copy.replace(element,rep);
      } else {
        break;
      }  
    }
  });
  
  if(digits.length) {
    const numbers = [];
    const positionsSorted = [...positions].sort((a,b) => a-b);
    positionsSorted.forEach( e => {
      numbers.push(digits[positions.indexOf(e)]);
    });
    positions = positionsSorted;
    digits = numbers;
  }
  return [digits, positions];
}

const scan = (line) => {
  for(let i=0; i<line.length; i++) {
    if(!isNaN(line[i])) return +line[i];
  }
  return 0;
}

const scanReverse = (line) => {
  for(let i=line.length-1; i>=0; i--) {
    if(!isNaN(line[i])) return +line[i];
  }
  return 0;
}

let sumP1 = 0;
let sum = 0;
let content = fs.readFileSync('01.in').toString('utf-8').split('\n');
content.forEach(e => {
  let number = scan(e)*10 + scanReverse(e);
  const [numbers, posNumbers] = extractDigitNumbers(e);
  const [digits, posDigits] = extractDigitWords(e);
  let minPosNum = posNumbers[0] ?? Number.MAX_VALUE;
  let minPosDig = posDigits[0] ?? Number.MAX_VALUE;
  let maxPosNum = posNumbers[posNumbers.length-1] ?? Number.MIN_VALUE;
  let maxPosDig = posDigits[posDigits.length-1] ?? Number.MIN_VALUE;
  const first = minPosNum < minPosDig ? numbers[0]: digits[0];
  const second = maxPosNum > maxPosDig ? numbers[numbers.length-1]: digits[digits.length-1];
  let computed = 0;
  if(first) {
    computed = first*10;
    if(second) {
      computed += second;
    }
    else {
      computed += first;
    }
  } else {
    if(second) {
      computed = second * 10;
      computed += second;
    }
  }
  sumP1+=number;
  sum+=computed;
});

console.log(`Part one: ${sumP1}`);
console.log(`Part two: ${sum}`);
fs.writeFileSync('01.out', sumP1.toString()+"\n", {encoding: 'utf-8'});
fs.writeFileSync('01.out', sum.toString(), {encoding: 'utf-8', flag: 'a+'});

