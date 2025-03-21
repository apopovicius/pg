const arr = [20, 3, 10, 1, 2, 4];
const x = new Set(arr);
let longest = 0;

for(let n of x) {
  if(!x.has(n-1)) {
    let length = 1;
    while(x.has(n+length)) length++;
    longest = Math.max(length,longest);
  }
}

console.log(`For array: ${arr} the longest consecutive series has lenght: ${longest}`);
