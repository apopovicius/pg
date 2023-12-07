// Requiring the fs module
const fs = require('fs');

// Creating a function which takes a file as input
const readFileLines = (filename) =>
    fs.readFileSync(filename).toString('UTF8').split('\n');

// Driver code
const engineSchematic = readFileLines('03.in');

const sumAdjacentNumbers = (engineSchematic) => {
    const rows = engineSchematic;
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    let totalSum = 0;
    let partNumber = [];
    let gears = new Map();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        let numbers = 0;
        let rowIndex = 0;
        while (rowIndex < row.length - 1) {
            if (isNaN(row.charAt(rowIndex))) {
                rowIndex++;
            } else {
                numbers = numbers * 10 + parseInt(row.charAt(rowIndex));
                let j = rowIndex + 1;
                while (!isNaN(row.charAt(j)) && j < row.length) {
                    numbers = numbers * 10 + parseInt(row.charAt(j));
                    j++;
                }
                if (numbers !== 0) {
                    let flag = false;
                    let isGeared = false;
                    let position = '';
                    for (let a = rowIndex; a < j; a++) {
                        for (const [dx, dy] of directions) {
                            if (row[i + dy]) {
                                const adjacentChar = rows[i + dy].charAt(
                                    a + dx
                                );
                                if (
                                    isNaN(adjacentChar) &&
                                    adjacentChar !== '.'
                                ) {
                                    flag = true;
                                }
                                if (adjacentChar === '*') {
                                    position = i + dy + '-' + (a + dx);
                                    isGeared = true;
                                }
                            }
                        }
                    }
                    if (flag) {
                        partNumber.push(numbers);
                    }
                    if (isGeared) {
                        if (!gears.get(position))
                            gears.set(position, [numbers]);
                        else {
                            const value = gears.get(position);
                            value.push(numbers);
                            gears.set(position, value);
                        }

                        position = '';
                    }
                }
                rowIndex = j;
                numbers = 0;
            }
        }
    }
    totalSum = partNumber.reduce((a, b) => a + b);

    let gearSum = 0;
    gears.forEach((value) => {
        if (value.length === 2) {
            //console.log(`Gears found: [${value[0]} * ${value[1]}]`);
            gearSum += value[0] * value[1];
        }
    });
    console.log('P1 - Sum of adjacent numbers: ', totalSum);
    console.log('P2 - Sum of gears: ', gearSum);
};

sumAdjacentNumbers(engineSchematic);
