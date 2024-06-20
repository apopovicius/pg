const CLIArgs = process.argv;
// console.log(CLIArgs);
const isNumber = (n) => {
  return Number(n) == n;
}
const listOfNumbers = CLIArgs.slice(2);
const sum  = listOfNumbers.reduce((prev, curr)=> { 
  if(isNumber(curr)) {
    return Number(curr) + Number(prev);
  }
  return Number(prev);
}, 0);
console.log(sum);

