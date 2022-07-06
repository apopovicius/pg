## Array & objects & strings

### Strings - Basic Operations
```javascript
let string = "coconuts"
string.slice(4,7);
// → nut 
console.log("coconut".indexOf("c"));
// → 5
console.log("one two three".indexOf("ee")); 
// → 11
console.log(" okay \n ".trim()); 
// → okay
console.log(String(6).padStart(3, "0")); 
// → 006
let sentence = "Secretarybirds specialize in stomping"; 
let words = sentence.split(" ");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"] 
console.log(words.join(". "));
// → Secretarybirds. specialize. in. stomping
console.log("LA".repeat(3)); 
// → LALALA
let string = "abc"; 
console.log(string.length);
// → 3
console.log(string[1]);
// → b
```

### Rest parameters
```javascript
function max(...numbers) {
   let result = -Infinity;
   for (let number of numbers) {
     if (number > result) result = number;
   }
   return result;
 }
 console.log(max(4, 1, 9, -2));
 // → 9

let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7

let words = ["never", "fully"]; 
console.log(["will", ...words, "understand"]); 
// → ["will", "never", "fully", "understand"]
 ```



### Destructuring
```javascript
let {name} = {name: "Faraji", age: 23}; 
console.log(name);
// → Faraji
```

### JSON - JavaScript Object Notation
```javascript
// JSON.stringify and JSON.parse to convert data to and from this format.
// JSON.stringify takes a JavaScript value and returns a JSON-encoded string. 
// JSON.parse takes such a string and converts it to the value it encodes.

let string = JSON.stringify({squirrel: false, events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]
```

### Objects
```javascript
let object = {
    name: "Mark",
    age: 32,
    sex: "male",
    narried: true
};
```

### Iterating through array
```javascript
let array = ["Ingrid", "Delia", "Madona", "Raluca", "Ramona"]

// A
for(let i=0; i<array.length; i++) { 
    console.log(array[i]);
}

// OR
for(let elem of array ) {
    console.log(elem);
}
// OR
array.forEach(el => console.log(el));

// Output of all loops
// → Ingrid
// → Delia
// → Madona
// → Raluca
// → Ramona
```

### Array of objects
```javascript
let arrayOfObject = [];
arrayOfObject.push(object);
arrayOfObject.push({name: "Eugen", age: 22, sex: "male", married: true });
arrayOfObject.push({name: "Emilia", age: 28, sex: "female", married: true });
arrayOfObject.push({name: "Daria", age: 12, sex: "female", married: false });
```

### HighOrderFunctions - Filter
```javascript
array.filter(el => el[0] === "R")
// → (2) ['Raluca', 'Ramona']

arrayOfObject.filter( elem => elem.married === true )
// → (2) [{…}, {…}]
// → 0: {name: 'Eugen', age: 22, sex: 'nake', narried: true}
// → 1: {name: 'Emilia', age: 32, sex: 'female', narried: true}
// → length: 2
```

### Operation on array of objects
```javascript
console.log(Object.keys(arrayOfObject[0]));
// → (4) ['name', 'age', 'sex', 'narried']

delete arrayOfObject[0].narried; // delete the wrong key in object
arrayOfObject[0].married = true; // re-add the correct key 
// or
Object.assign(arrayOfObject[0], {married: true});
console.log("married" in arrayOfObject[0]);
// → true
```

### HighOrderFunctions - Map
```javascript
function map(array, transform) {
    let mapped = [];
    for(el of array) {
        mapped.push(transform(el));
    }
    return mapped;
};

map(arrayOfObject, s => s.narried ? "married": "un-married" );
// → (4) ['un-married', 'married', 'married', 'un-married']

console.log([1, 2, 3, 4].reduce((a, b) => a + b)); // reduce all values of an array to one 
// → 10
```