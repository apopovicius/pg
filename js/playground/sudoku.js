const ok = [
  [7, 5, 1, 8, 4, 3, 9, 2, 6],
  [8, 9, 3, 6, 2, 5, 1, 7, 4],
  [6, 4, 2, 1, 7, 9, 5, 8, 3],
  [4, 2, 5, 3, 1, 6, 7, 9, 8],
  [1, 7, 6, 9, 8, 2, 3, 4, 5],
  [9, 3, 8, 7, 5, 4, 6, 1, 2],
  [3, 6, 4, 2, 9, 7, 8, 5, 1],
  [2, 8, 9, 5, 3, 1, 4, 6, 7],
  [5, 1, 7, 4, 6, 8, 2, 3, 9],
];


const nok = [
  [7, 5, 1, 8, 4, 3, 3, 2, 6],
  [8, 9, 3, 6, 2, 5, 1, 7, 4],
  [6, 4, 2, 1, 7, 9, 5, 8, 3],
  [4, 2, 5, 3, 1, 6, 7, 9, 8],
  [1, 7, 6, 9, 8, 2, 3, 4, 5],
  [9, 3, 8, 7, 5, 4, 6, 1, 2],
  [3, 6, 4, 2, 9, 7, 8, 5, 1],
  [2, 8, 9, 5, 3, 1, 4, 6, 7],
  [5, 1, 7, 4, 6, 8, 2, 3, 9],
];


const invalid = [
  [7, 5, 1, 8, 4, 3, -2, 2, 6],
  [8, 9, 3, 6, 2, 5, 1, 7, 4],
  [6, 4, 2, 1, 7, 9, 5, 20, 3],
  [4, 2, 5, 3, 1, 6, 7, 9, 8],
  [1, 7, 6, 9, 8, 2, 3, 4, 5],
  [9, 3, 8, 7, 5, 4, 6, 1, 2],
  [3, 6, 4, 2, 9, 7, 8, 5, 1],
  [2, 8, 9, 5, 3, 1, 4, 6, 7],
  [5, 1, 7, 4, 6, 8, 2, 3, 9],
];
const validate = (sudoku) => {
  const rows = Array.from({length:9}, () => Array(9).fill(false));
  const cols = Array.from({length:9}, () => Array(9).fill(false));
  const square = Array.from({length:9}, () => Array(9).fill(false));

  for(let row = 0; row<9 ; row++) {
    for(let col = 0; col<9; col++) {
      const num = sudoku[row][col];
      if(num > 9 || num < 0) {
        console.log(`Invalid ${num} value in sudoku matrix!`);
        return false;
      }
      if(num === 0) continue; //skip enmpty cells
      const index = num - 1;
      
      const squareNr = Math.floor(row/3) * 3 + Math.floor(col/3);
      if(rows[row][index] || cols[col][index] || square[squareNr][index]) return false;

      rows[row][index]=true;
      cols[col][index]=true;
      square[squareNr][index]=true;
    }
  }

  return true;
}


console.log('This should be true: ', validate(ok));
console.log('This should return false:', validate(nok));
console.log('This should return false:', validate(invalid));
