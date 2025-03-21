// majority = means appairs n/2 times (n = length of array)
const arr1 = [2,2,1,1,1,2,2];
const arr2 = [2,2,1,1,1,3,3];

// O(n) space
const onSpace = (array) => {
  const freq = {};
  const max = Math.floor(array.length/2);
  for(const x of array) {
    freq[x] = (freq[x] || 0) + 1;
    if(freq[x] > max) return x;
  }
}

// O(1) space
// boyer more
const constSpace = (array) => {
  let candidate = null;
  let balance = 0;

  for(const num of array) {
    if(balance == 0) { 
      candidate = num;
    }
    balance += (num === candidate) ? 1 : -1; 
  }
  return candidate;
}

console.log(`For array: ${arr1} the O(n) space solution returns: ${onSpace(arr1)} and O(1) space returns: ${constSpace(arr1)}`);

// Boyer-Moore assumes a majority exists
// thats why returns 3 even 3 is not the majority
console.log(`For array: ${arr2} the O(n) space solution returns: ${onSpace(arr2)} and O(1) space returns: ${constSpace(arr2)}`);
