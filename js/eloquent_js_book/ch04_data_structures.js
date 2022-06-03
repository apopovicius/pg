/* The sum of a range
Write a range function that takes two arguments, start and end, and returns
an array containing all the numbers from start up to (and including) end.
Next, write a sum function that takes an array of numbers and returns the
sum of these numbers. Run the example program and see whether it does
indeed return 55.
As a bonus assignment, modify your range function to take an optional third
argument that indicates the “step” value used when building the array
*/

let range = (start, end, step = start < end ? 1: -1) => {
    let array = [];
  	if(step > 0) {
      for (let i=start; i<=end; i = i+step)  array.push(i);
    }
    else {
			for (let i=start; i>=end; i = i+step) array.push(i);
    }
    
    return array;
}

let sum = (myArray) => {
  let sum = 0;
  for (let number of myArray) {
    sum += number;
  }
  return sum;
}

let myArray = range(1,10,2);
let myArray2 = range(5,2,-1);
let myArray3 = range(20,10,2);

console.log(myArray);
console.log(myArray2);
console.log(sum(myArray));

/* Reversing an array
For this exercise, write two functions, reverseArray and reverseArrayInPlace. 
The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. 
The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. 
Neither may use the standard reverse method.
*/

// Your code here.
let reverseArray = (array) => {
    let output = [];
    for(let i=array.length-1; i>=0; i--) output.push(array[i]);
    return output;
  }
  
//    let reverseArrayInPlace = (array) => {
//      let reversedArray = reverseArray(array);
//      array = reversedArray;
//      return array;
//    }
  
function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let old = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = old;
    }
    return array;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]



/* A list

let list = {
    value: 1,
    rest: {
        value: 2,
            rest: {
                value: 3,
                rest: null
            }
        }
    };

*/
let arrayToList = (array) => {
    let list = null;
    for(let i = array.length - 1; i >= 0; i--) {
        list = { value:array[i], rest: list };
    }
    return list;
  }
  
  let listToArray = (list) => {
    let array = [];
    for(let node = list; node; node = node.rest) {
      array.push(node.value);
    }
    return array;
  }
  
  let prepend = (value, list) => {
    return {value: value, rest:list};
  }
  
  let nth = (list, n) => {
    if(!list) return undefined;
    else if(n==0) return list.value;
    else return nth(list.rest, n-1);
  }
  
  console.log(arrayToList([10, 20]));
  // → {value: 10, rest: {value: 20, rest: null}}
  console.log(listToArray(arrayToList([10, 20, 30])));
  // → [10, 20, 30]
  console.log(prepend(10, prepend(20, null)));
  // → {value: 10, rest: {value: 20, rest: null}}
  console.log(nth(arrayToList([10, 20, 30]), 2));
  // → 20


/* Deep comparison
*/
let deepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

/// ?????? 