console.log("First challenge");
/*
#
##
###
####
#####
######
#######
*/

for (let i=0; i<7; i++) {
  	let line = '#'.repeat(i+1);
  	console.log(line);
}


console.log("FIZZ BUZZ challange");
/*
display number from 1 to 100 and 
FIZZ divisible by 3
BUZZ divisible by 5
FIZZBUZZ divisible by 15
*/

for (let i=1; i<101; i++) {
  switch(true) {
    case i%15 === 0:
      console.log("FIZZBUZZ");
      break;
    case i%3 === 0:
      console.log("FIZZ");
      break;
    case i%5 === 0:
      console.log("BUZZ");
      break;
    default:
      console.log(i);
      break;
  }
}


console.log("ChessBoard");
/*
8x8 grid 
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #

Write a generic solution for nxn
*/
let n = 10;
let line = '';
for (let i=0; i<n; i++) {
    if(i%2 === 0) {
      line = ' #'.repeat(n);
    }
    else {
      line = '# '.repeat(n);
    }
    console.log(line)    
}