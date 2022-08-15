/* It is a function that create objects for us
class ConstructorFunction {
    constructor() {

    }
}
- not returning created object
- new keyword
- this keyword
*/

function Person(name) {
    this.name = name
    this.talk = () => {
        return `Hello ${this.name}`;
    }
}

const sina = new Person('Sina');
const sam = new Person('Sam');
const ben = new Person('Ben');


// constructor vs factory function
// how to make factory behave like constructor
// Object.create - this way you can modify of the new object created and use the power of inheritance

const myCoolProto = {
    talk() {
        return `Hello ${this.name}`;
    }
}

function createPerson(name) {
    return Object.create(myCoolProto, {
        name: {
            value: name
        }
    })
}