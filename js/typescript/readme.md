# TypeScript

Typescript is a development tool wraped arround JS, that offers **type safety** to javascript.

```javascript
const user = { name: 'me', age: 10 };
console.log(user.email); // this produce an error at compile time
```

## What typescript does?

It just do a static check. Thats the only job for the typescript, just analyzing your code and help you understand you might be running into a potention error without even running the code.

> Analyze the code as we type!

## Installation

> npm install -g typescript
>
> tsc -v

**tsc** transform typescript into javascript code.

## Types

> Number, String, Boolean, null, undefined, void, object, array, tuples, ..., any, never, unknown

### any

In case you don't specify a type and TypeScript can't infer it from context, the compiler will typically default to **any**

Try to avoid this, because **any** isn't type-checked. Use the compiler flag **noImplicityAny** to flag any implicit **any** as an error.

```javascript
let hero; // this in infer to any
function getHero() {
    return 'Thor';
}
hero = getHero();
```

## Functions

If in case of variables sometimes you can infer the types, in case of functions it is recommended always to pass the type of your parameters

```javascript
function addTwo(num: number): number {
    return num + 2;
}

function getUpperBad(val) {
    return val.toUpperCase();
}

let upper = getUpperBad(4); // this is proving if function has no implicit types for parameters we cant catch this error and we will end up badly

function getUpper(val: string): string {
    return val.toUpperCase();
}

const heroes = ['batman', 'thor', 'superman'];
heroes.map((hero) => {
    return 2; // we dont want this
});

//better way
heroes.map((hero): string => {
    //return 2; //error
    return `Hero name is ${hero}`;
});
```

## Using **never**

The **never** type represents values which are _never_ observed. In a return type, this means that function throws an exception or terminates the execution of the program.

**never** also appears when TypeScript determines there's nothing left in a union.

```javascript
function handleError(msg: string): never {
    throw new Error(msg);
}
```

## Objects

```javascript
function createUser({ name: string, isPaid: boolean }) {}
createUser({ name: 'John', isPaid: true });

function createCourse(): { name: string, price: number } {
    return { name: 'reactjs', price: 399 };
}

//bad behaviour of Objects
createUser({ name: 'Mark', isPaid: false, email: 'm@h.ck' }); // error
// trick to hide this error;
let newUser = { name: 'Mark', isPaid: false, email: 'm@h.ck' };
createUser(newUser); // NOT ANYMORE AN ERROR
```

## Type Aliases

> https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#reusable-types-type-aliases

```javascript
type User = {
    name: string,
    email: string,
    isPaid: boolean,
};

function createUser(user: User) {}
createUser({ name: 'Mark', isPaid: false, email: 'm@h.ck' });
```

## ReadOnly / Optionals

```javascript
type User = {
    readonly _id: string;
    name: string;
    email: string;
    isPaid: boolean;
    creditCardNumber?: CardDetails;
};

type CardNumber = {
    cardNumber: string
}

type CardDate = {
    cardDate: string
}

type CardDetails = CardNumber & CardDate & {
    cvv: number;
};

let user:User = {
    _id: "123",
    name: "h",
    email: "h.c@j.k",
    isPaid: true,
};

user.email = "h@j.k"; // allowed
user._id = "543"; // error this cant be changed
let card:CardDetails = {
    cardNumber: "555445",
    cardDate: "5.5.2023",
    ccv: 555
};

user.creditCardNumber = card;
```

> **readonly** marks the property as readonly this means you can change this property once is set.

> **?** marks the creditCardNumber as optional. this means you can set it or not depending on the usecase

## Arrays

```javascript
const marks = [1, 2, 3]; //not ideal
const rating: number[] = []; //better
rating.push(5);
const participants: Array<string> = []; // using keyword
participants.push('Ana');
```

### ReadOnly Arrays

And it has a specific **ReadonlyArray<T>** type that removes side-affecting methods and prevents writing to indices of the array, as well as special syntax for this type:

```javascript
let a: ReadonlyArray<number> = [1, 2, 3];
let b: readonly number[] = [1, 2, 3];
a.push(102); // error
b[0] = 101; // error
```

You can also use a **const-assertion**, which operates on arrays and object literals:

```javascript
let a = [1, 2, 3] as const;
a.push(102); // error
a[0] = 101; // error
```

## Union types

This is a combination of two or three or more data types that you can include into a variable.

```javascript
let score: number | string = 33;
score = 44;
score = `Score is ${score}`;
console.log(score);

type User = {
    name: string,
    id: number,
};

type Admin = {
    username: string,
    id: number,
};

let me: User | Admin = { name: 'Mark', id: 55 };
console.log(me);
me = { username: 'Mike', id: 56 };
console.log(me);

function transformDBId(id: number | string): number | string {
    console.log(`the id is: ${id}`);
    if (typeof id === 'string') {
        return id.toUpperCase();
    } else {
        return id + 5;
    }
}

console.log(transformDBId(11));
console.log(transformDBId('aaa'));

//array
//const data: number[] = [1,2,3,"4"]; // error;
//const data: string[] | number[] = ["1","2", 4]; // error: will be either string either number
const data: (string | number)[] = ['1', '2', 4]; // OK
```

### Literal type assignment

```javascript
let pi: 3.14 = 3.14;
pi = 3.145; // NOT ALLOWED

let seatAllotment: 'aisle' | 'middle' | 'window';
seatAllotment = 'test'; // NOT ALLOWED
seatAllotment = 'aisle'; //OK
```

## Tuples

```javascript
let userUnion: (string | number)[] = [1, 'hc'];
// this works fine but we want to restrict more the elements of array
// so that it respects order and types( first number, 2nd string)
// for this lets use tuples
const user: [string, number, boolean] = ['hc', 1, true];
console.log(user);

let rgb: [number, number, number, number];
rgb = [255, 255, 123, 0.5];

type User = [number, string];
const newUser: User = [123, 'g@g.com'];
newUser[1] = 'ggg@ggg.com'; //accessing the 2nd element of tupple

// controversy: this is an array => we can access all methods of array
// this doesnt follow the protocol as we define it
newUser.push(5, 'b.b'); // [123, 'ggg@ggg.com', 5, 'b.b']
console.log(newUser);

// to prevet this use readonly or as const
// const test:readonly [number, number] = [10,10] as const;
// test.push(5); // error;
export {};
```

> https://stackoverflow.com/questions/64069552/typescript-array-push-method-cant-catch-a-tuple-type-of-the-array

## Enums

```javascript
enum SeatChoiceCode {
    AISLE, // starts from 0
    MIDDLE, // 1
    WINDOW = 10,
    NO_SEAT // 11
};

const mySeat = SeatChoiceCode.MIDDLE;

// or
enum SeatChoice {
    AISLE = "aisle",
    MIDDLE = "middle",
    WINDOW = "window",
    NO_SEAT = 0
}
```

The enums above generated in javascript is a IIFE(Immediately Invoked Function Expressions)

```javascript
(function (SeatChoiceCode) {
    SeatChoiceCode[(SeatChoiceCode['AISLE'] = 0)] = 'AISLE';
    SeatChoiceCode[(SeatChoiceCode['MIDDLE'] = 1)] = 'MIDDLE';
    SeatChoiceCode[(SeatChoiceCode['WINDOW'] = 10)] = 'WINDOW';
    SeatChoiceCode[(SeatChoiceCode['NO_SEAT'] = 11)] = 'NO_SEAT'; // 11
})(SeatChoiceCode || (SeatChoiceCode = {}));
```

To avoid this just make the enum **const**

```javascript
const enum Fruits {
    Apple,
    Grapes,
    Pineapple
}
```

## Interfaces

```
```
