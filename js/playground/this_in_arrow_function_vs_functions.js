const Person = {
    name: "Jake",
    age: 5,
    printPerson() {
        console.log(this.name, 'is', this.age, 'years old');
    },
    printPersonArrow: () => {
        // this keyword points to window
        console.log(this.name, 'is ', this.age, 'years old');
    },

    printTest: () => {
        // this.printPerson(); // undefined as expected
        Person.printPerson(); // Jake is 5 years old
    }
}


Person.printPerson() // Jake is  5 years old
Person.printPersonArrow() // undefined is  undefined years old
Person.printTest() // Jake is 5 years old


//
// hoisting for function vs arrow functions
//  

console.log(`Sum function: ${funcSum(5,3)}`); // 8
console.log(`Sum in arrow: ${arrowSum(5,3)}`); // will crash as could not find function

// !!! arrow functions dont benefit from hoisting
const arrowSum = (a, b) => {
    return a+b;
}

// function benefit from hoisting
function funcSum(a,b) {
    return a+b;
}