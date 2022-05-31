// calculate min of 2 values
let minimum = (x, y) => Math.min(x, y);

console.log(minimum(1,-6));

function min(x,y) {
  return Math.min(x, y);
}

let myMin = min(5,6);
console.log(myMin);


// check if a number isEven recursively
function isEven( n ) {
  if(n === 0) {
    return true;
  }
  else if(n === 1) {
    return false;
  }
  else if(n < 0) {
    return isEven(-n);
  }
  else
  {
    return isEven(n-2);
  }
}

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));


// Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters there are in the string
let countBs = (myString) => {
    let n=0;
    for(let i=0; i<myString.length; i++) {
      if(myString[i] === 'B')
        n++;
    }
    return n;
  }
  
  console.log(countBs("AlaBbAsBB"));
  

// Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters). Rewrite countBs to make use of this new function.
let countChar = (myString, searchChar) => {
    let n=0;
    for(let i=0; i<myString.length; i++) {
        if(myString.charAt(i) === searchChar)
        n++;
    }
    return n;
}
  
console.log(countChar("AlaBbAsBB", "a"));