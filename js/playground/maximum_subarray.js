// kadene algoritm
const arr = [-2,7,-3,4];

const kadane = () => { 
  let maxCurr = arr[0]; // -2
  let maxGlobal = arr[0]; // -2

  for(const n of arr.slice(1)) {
    // 7, -3, -4
    maxCurr = Math.max(n, maxCurr+n); 
    // Max(7, -2+7) => 7 
    // Max(-3, 7-3) => 4 
    // Max(4, 4+4) => 8
    maxGlobal = Math.max(maxGlobal, maxCurr); 
    // Max(-2, 7) => 7
    // Max(7, 4) => 7
    // Max(7, 8) => 8
  }

  return maxGlobal;
}

console.log(`For array: ${arr} the max sum is: ${kadane()}`);
