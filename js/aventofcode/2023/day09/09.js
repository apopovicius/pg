const fs = require('fs');

const test = [
    13, 14, 13, 10, 5, -2, -11, -22, -35, -50, -67, -86, -107, -130, -155, -182,
    -211, -242, -275, -310, -347,
];
const test2 = [0, 3, 6, 9, 12, 15];

const makeNewRow = (arr) => {
    let row = [];
    for (let i = 0; i < arr.length - 1; i++) row.push(arr[i + 1] - arr[i]);
    1;
    return row;
};

const computeTheHistoryNumber = (arr, reversed = false) => {
    let theNumber = 0;
    let distance = 0;
    for (let i = arr.length - 2; i >= 0; i--) {
        if (reversed) {
            distance = arr[i] - theNumber;
        } else {
            distance = arr[i] + theNumber;
        }
        theNumber = distance;
    }

    return theNumber;
};

function main() {
    let solution = {};
    let count = 0;
    const history = fs.readFileSync('09.in').toString('utf-8').split('\n');
    let historySum = 0; // p1
    let historySumFirst = 0; // p2
    history.forEach((line) => {
        let arr = line.split(' ').map((x) => Number(x));
        let goMore = 1;
        let t = [];
        let newRow = [];
        let lastNumbers = [];
        let firstNumbers = [];
        firstNumbers.push(arr[0]);
        lastNumbers.push(arr[arr.length - 1]);
        do {
            newRow = makeNewRow(arr);
            //console.log(newRow);
            t.push(newRow);
            arr = newRow;
            let filtered = newRow.filter((e) => e === 0).length;
            if (filtered === arr.length) {
                goMore = 0;
            }
            lastNumbers.push(newRow[newRow.length - 1]);
            firstNumbers.push(newRow[0]);
        } while (goMore === 1);
        solution[count] = t;
        historySum += computeTheHistoryNumber(lastNumbers);
        historySumFirst += computeTheHistoryNumber(firstNumbers, true);
        count++;
    });

    console.log(historySum);
    console.log(historySumFirst);
}

main();
