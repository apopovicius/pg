const fs = require('fs');

const engine = fs.readFileSync('03.in').toString('utf-8').split('\n');
const lineLen = engine[0].length;

let top = Array(lineLen);
let bot = Array(lineLen);
let sum = 0;
let sumOfAllParts = 0;
let sumOfNumbers = 0;
let totalSum = 0;
let allNumbers = [];

const getLineNumbers = (line) => {
    if (line.length != lineLen) throw new Error('Invalid line');
    let numbers = [];
    let number = 0;
    for (let i in line) {
        if (!isNaN(line[i])) {
            number = +line[i] + number * 10;
        } else {
            if (number != 0) numbers.push(number);
            number = 0;
        }
    }
    // cover the numbers that ends the line like: ..641
    if (number != 0) numbers.push(number);
    return numbers;
};

const midCheck = (line, index, numberLen, from) => {
    if (line.length != lineLen) throw new Error('Invalid line');
    //check left margin, right margin
    if (index === 0) {
        if (line[index + numberLen] === '.') return false;
        else return true;
    }

    if (index + numberLen === lineLen) {
        if (line[index - 1] === '.') return false;
        else return true;
    }

    // check index-1 and len+1
    if (line[index - 1] !== '.' || line[index + numberLen] !== '.') return true;
    return false;
};

const topBotCheck = (line, index, numberLen, from) => {
    if (line.length != lineLen) throw new Error('Invalid line');
    // check for rows with no symbols
    if (line.split('').filter((e) => e != '.').length === 0) return false;
    // boundary check
    let start = 0;
    let stop = lineLen;
    if (index === 0) {
        start = 0;
        stop = index + numberLen;
    } else if (index === lineLen - numberLen) {
        stop = lineLen - 1;
        start = index - 1;
    } else {
        start = index - 1;
        stop = index + numberLen;
    }

    const window = line.substring(start, stop + 1).split(''); // we need to add 1 to how many 'stop'
    const found = window.filter((e) => e !== '.');
    if (found.length) return true;
    return false;
};

// this should return sum and gear ration
const processLine = (top, bot, line, numbers) => {
    if (line.length != lineLen) throw new Error('Invalid line');
    let sum = 0;
    let workingLine = line;
    for (let number of numbers) {
        const stringNumber = number.toString();
        const mask = '!'.repeat(stringNumber.length);
        const index = workingLine.search(stringNumber);
        workingLine = workingLine.replace(stringNumber, mask);
        let lineCheck = midCheck(line, index, stringNumber.length, line);
        if (lineCheck) {
            sum += number;
            continue;
        }
        let topCheck = topBotCheck(top, index, stringNumber.length, line);
        if (topCheck) {
            sum += number;
            continue;
        }
        let botCheck = topBotCheck(bot, index, stringNumber.length, line);
        if (botCheck) {
            sum += number;
            continue;
        }
    }
    return sum;
};

const findNumberLeftToAsterisk = (line, position) => {
    let number = 0;
    let digits = [];
    for (let i = position - 1; i >= 0; i--) {
        if (!isNaN(line[i])) {
            digits.push(+line[i]);
        } else {
            break;
        }
    }

    if (digits.length === 0) {
        return -1;
    }
    for (let i = digits.length - 1; i >= 0; i--) {
        number = digits[i] + number * 10;
    }
    return number;
};

const findNumberRightToAsterisk = (line, position) => {
    let number = 0;
    let digits = [];
    for (let i = position + 1; i < line.length; i++) {
        if (!isNaN(line[i])) {
            digits.push(+line[i]);
        } else {
            break;
        }
    }

    if (digits.length === 0) {
        return -1;
    }
    for (let i = 0; i < digits.length; i++) {
        number = digits[i] + number * 10;
    }
    return number;
};

const findNumberMidOnAsterisk = (line, position) => {
    let number = 0;
    let digits = [];
    let leftDigits = [];
    let rightDigits = [];

    let mid = line[position];
    for (let i = position - 1; i >= 0; i--) {
        if (!isNaN(line[i])) {
            leftDigits.push(+line[i]);
        } else {
            break;
        }
    }

    for (let i = position + 1; i < line.length; i++) {
        if (!isNaN(line[i])) {
            rightDigits.push(+line[i]);
        } else {
            break;
        }
    }

    for (let i = leftDigits.length - 1; i >= 0; i--) {
        digits.push(leftDigits[i]);
    }

    digits.push(+mid);

    for (let i = 0; i < rightDigits.length; i++) {
        digits.push(rightDigits[i]);
    }

    if (digits.length === 0) return -1;
    for (let i = 0; i < digits.length; i++) {
        number = digits[i] + number * 10;
    }
    return number;
};

const getLineAsteriskIndexes = (line) => {
    let asteriskIndex = -1;
    let workingLine = line;
    let asteriskIndexes = [];

    do {
        asteriskIndex = workingLine.search('\\*');
        if (asteriskIndex !== -1) {
            asteriskIndexes.push(asteriskIndex);
            workingLine = workingLine.replace('*', '!');
        }
    } while (asteriskIndex !== -1);
    return asteriskIndexes;
};

const checkMidParts = (line, asteriskPos) => {
    let leftNumber = -1;
    let rightNumber = -1;
    // check left & right adjacency
    if (!isNaN(line[asteriskPos - 1]) || !isNaN(line[asteriskPos + 1])) {
        leftNumber = findNumberLeftToAsterisk(line, asteriskPos);
        rightNumber = findNumberRightToAsterisk(line, asteriskPos);
    }
    return [leftNumber, rightNumber];
};

const checkDiagonalParts = (line, asteriskPos, from) => {
    let leftNumber = -1;
    let rightNumber = -1;
    let midNumber = -1;

    if (
        !isNaN(line[asteriskPos]) ||
        !isNaN(line[asteriskPos - 1]) ||
        !isNaN(line[asteriskPos + 1])
    ) {
        leftNumber = findNumberLeftToAsterisk(line, asteriskPos);
        rightNumber = findNumberRightToAsterisk(line, asteriskPos);

        if (!isNaN(line[asteriskPos])) {
            midNumber = findNumberMidOnAsterisk(line, asteriskPos);
            // let mid = '';
            // if (leftNumber >= 0) mid += leftNumber.toString();
            // mid += line[asteriskPos];
            // if (rightNumber >= 0) mid += rightNumber.toString();
            // midNumber = +mid;
            leftNumber = -1;
            rightNumber = -1;
        }
    }
    return [leftNumber, midNumber, rightNumber];
};

let gearParts = [];
const getSumLineParts = (top, bot, mid, asteriskIndexes) => {
    let sum = 0;
    let gearPartsNumbers = [];
    let incompleteParts = [];
    // check if exists any number adjacent to asterisk on mid
    for (let asteriskPos of asteriskIndexes) {
        let gear = [];
        // check left & right adjacency
        const [leftNumber, rightNumber] = checkMidParts(mid, asteriskPos);
        if (leftNumber >= 0) gear.push(leftNumber);
        if (rightNumber >= 0) gear.push(rightNumber);

        const [topLeft, topMid, topRight] = checkDiagonalParts(
            top,
            asteriskPos,
            mid
        );

        if (topMid >= 0) {
            gear.push(topMid);
        } else {
            if (topLeft >= 0) gear.push(topLeft);
            if (topRight >= 0) gear.push(topRight);
        }

        // check bot adjacency
        const [botLeft, botMid, botRight] = checkDiagonalParts(
            bot,
            asteriskPos,
            mid
        );

        if (botMid >= 0) {
            gear.push(botMid);
        } else {
            if (botLeft >= 0) gear.push(botLeft);
            if (botRight >= 0) gear.push(botRight);
        }

        if (gear.length === 0) continue;
        else if (gear.length > 2) {
            console.log(`too many gear parts ${gear}`);
            continue;
        } else if (gear.length === 1) {
            //console.log('too few parts');
            incompleteParts.push(gear);
            continue;
        } else {
            //console.log(`Gears found: [${gear[0]} * ${gear[1]}]`);
            gearPartsNumbers.push(gear);
            sum += gear[0] * gear[1];
        }
    }
    gearParts.push({
        top,
        mid,
        bot,
        ok: JSON.stringify(gearPartsNumbers),
        nok: JSON.stringify(incompleteParts),
    });
    return sum;
};

// gear ration= adjacent of '*' 1st  multiply by adjacent of '*' 2nd (see readme)
const computeGearParts = (top, bot, mid) => {
    const asteriskIndexes = getLineAsteriskIndexes(mid);
    const sumOfGearParts = getSumLineParts(top, bot, mid, asteriskIndexes);
    return sumOfGearParts;
};

for (let i = 0; i < engine.length; i++) {
    //console.log(engine[i]);
    //console.log(getLineNumbers(engine[i]));
    let line = engine[i];
    if (line.length != lineLen) throw new Error('Invalid line');
    // want to work with strings not array
    let t = '';
    let b = '';
    const numbers = getLineNumbers(engine[i]);
    allNumbers.push(numbers);
    if (i === 0) {
        top.fill('.');
        t = top.join('');
        b = engine[i + 1];
    } else if (i === engine.length - 1) {
        bot.fill('.');
        b = bot.join('');
        t = engine[i - 1];
    } else {
        t = engine[i - 1];
        b = engine[i + 1];
    }
    const sumOfLine = processLine(t, b, line, numbers);
    sum += sumOfLine;
    // sumOfNumbers = numbers.reduce((sum, curr) => sum+curr);
    // totalSum += sumOfNumbers;
    //console.log(`SumOfLine: ${sumOfLine} after processing numbers: ${numbers} - sum: ${sum}\n [sumOfNumbers: ${sumOfNumbers} - totalNumberSum: ${totalSum}]`);
    const sumOfGearPartsLine = computeGearParts(t, b, line);
    //console.log(`sumOfGearPartsLine: ${sumOfGearPartsLine}`);
    sumOfAllParts += sumOfGearPartsLine;
}

console.log(sum);
console.log(sumOfAllParts);
//console.log('----');
//console.log(gearParts);
