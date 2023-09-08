//     1
//    1 1
//   1 2 1
//  1 3 3 1
// 1 4 6 4 1
//
// Input: n = 5
// Output: [ [1], [1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1]]

const buildLine = (prevLine, size) => {
  let newArray = Array(size).fill(1);
  if (size <= 2) return newArray;
  for (let i = 1; i < size - 1; i++) {
    newArray[i] = prevLine[i - 1] + prevLine[i];
  }
  return newArray;
};

const solution = (nrOfRows) => {
  let pascalArray = [];
  let lastLine = [];
  for (let i = 0; i < nrOfRows; i++) {
    //console.log(`Line #${i} before: ${lastLine}`);
    lastLine = buildLine(lastLine, i + 1);
    //console.log(`Line #${i} after: ${lastLine} `);
    pascalArray.push(lastLine);
  }
  return pascalArray;
};

const sol = solution(5);
console.log(sol);
