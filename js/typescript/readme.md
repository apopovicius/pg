# TypeScript

> https://www.typescriptlang.org/cheatsheets

Typescript is a development tool wrapped around JS, that offers **type safety** to javascript.

```javascript
const user = { name: 'me', age: 10 };
console.log(user.email); // this produce an error at compile time
```

## What typescript does?

It just do a static check. Thats the only job for the typescript, just analyzing your code and help you understand you might be running into a potential error without even running the code.

> Analyze the code as we type!

## Installation

> npm install -g typescript
>
> tsc -v

**tsc** transform typescript into javascript code.

## Types

> https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

> Number, String, Boolean, null, undefined, void, object, array, tuples, ..., any, never, unknown

## any

In case you don't specify a type and TypeScript can't infer it from context, the compiler will typically default to **any**

Try to avoid this, because **any** isn't type-checked. Use the compiler flag **noImplicitAny** to flag any implicit **any** as an error.

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
    return 2; // we don't want this
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

---

## Objects

```javascript
function createUser({ name: string, isPaid: boolean }) {}
createUser({ name: 'John', isPaid: true });

function createCourse(): { name: string, price: number } {
    return { name: 'react-js', price: 399 };
}

//!!!Observation: bad behavior of Objects
// error cause of extra parameter
createUser({ name: 'Mark', isPaid: false, email: 'm@h.ck' });

// trick to hide this error
let newUser = { name: 'Mark', isPaid: false, email: 'm@h.ck' };
createUser(newUser); // NOT ANYMORE AN ERROR
```

---

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

> **?** marks the creditCardNumber as optional. this means you can set it or not depending on the use-case

---

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

---

## Union types

This is a combination of two or three or more data types that you can include into a variable by using the operator **|**. The union type offer the possibility for a variable to be _either one type_ **or** _another_

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

---

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
newUser[1] = 'ggg@ggg.com'; //accessing the 2nd element of tuple

// controversy: this is an array => we can access all methods of array
// this doesn't follow the protocol as we define it
newUser.push(5, 'b.b'); // [123, 'ggg@ggg.com', 5, 'b.b']
console.log(newUser);

// to prevent this use readonly or as const
// const test:readonly [number, number] = [10,10] as const;
// test.push(5); // error;
export {};
```

> https://stackoverflow.com/questions/64069552/typescript-array-push-method-cant-catch-a-tuple-type-of-the-array

---

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

---

## Interfaces

```javascript
interface User {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: string;
    startTrial: () => string;
    endTrial(): string;
    getCoupon(coupon: string): number;
}

const i: User = {
    dbId: 5,
    email: "g@g.co",
    userId: 5,
    startTrial: () => { return "Hi" },
    endTrial: () => { return "Bye" },
    getCoupon: (name: string): number => { return 5 } // it doesn't have to match name parameters
    //getCoupon: () => { return 5 } // this is ignoring not taking the parameter
};
i.userId = 9;
//i.dbId = 10; // error

export { };
```

Interface is like a blue print/contract for an object that you need to define. In our case the object will be **i**

As it can be seen interface for getCoupon is allowed without signaling any error.

Also **readonly** keyword will prevent changing the property of that interface.

### Difference between interface and type aliases

> https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

You can extend **interface** by calling again the keyword **interface**. If you do this with **type** it will get an **error**

```javascript
interface User {
    gitHubId?: string; // this is allowed and extends User interface
}
```

An other advantage that you get with **interfaces** is inheritance

```javascript
interface Department {
    depName?: string;
}

interface Admin extends User, Department {
    role?: 'admin' | 'qa' | 'dev';
}
```

You can get same behavior with types by using operator **&**

```javascript
type _2D = {
    X: string,
    Y: string,
};

type _3D = _2D & {
    Z: string,
};

// Example usage
const point: _3D = {
    X: '1',
    Y: '2',
    Z: '3',
};
```

---

## Classes

```typescript
class UserClassic {
    email: string;
    name: string;
    readonly city: string = 'Iasi';
    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }
}

const I = new UserClassic('h.h.com', 'V');
```

You can use the shorthand of this implementation this way:

```typescript
class User {
    protected _userCreated = 1;
    readonly city: string = 'Iasi';
    constructor(
        public email: string,
        public name: string,
        private userId: number
    ) {}

    get getAppleEmail(): string {
        return `apple${this.email}.${this.userId}`;
    }

    get nrOfUsersCreated(): number {
        return this._userCreated;
    }

    set incrNrOfUser(byNumber: number) /*:void*/ {
        // setters has no return type so you can not make it a void
        if (byNumber < 0) throw Error('We need positive numbers');
        this._userCreated += byNumber;
    }
}

const I2 = new User('H.H.CO', 'V', 20);
console.log(I2.getAppleEmail);
I2.incrNrOfUser(5);

class SubUser extends User {
    isFamily: boolean = true;
    constructor(name: string, email: string, id: number, public age: number) {
        super(name, email, id);
    }
    resetUserCreatedCount() {
        this._userCreated = 0;
        super.incrNrOfUser = 1;
    }
}

const SI2 = new SubUser('H.H.CO', 'V', 1, 55);
```

Also notice the **private** keyword there that makes the userId unaccessible from outside the class. We can have also private methods not only properties.

For accessing this private properties we will use **setters** and **getters**.

For getters we put **get** in front of the method and in order to call it we just use it as property **I2.getAppleEmail** this means without **()** parentheses.

For the setter we use the keyword **set** and call it **I2.incrNrOfUser = 5**. To observe that function should return nothing even returning _void_ is not allowed, also you can throw errors from setters.

Similar to **private** we have **protected** keyword used for inherited classes to get access to the parent members.

An other important keyword used is **super**. We used it to call the parent **constructor** and as it can be seen it can call the **setters, getters and even parent methods**.

## Classes & interfaces

```typescript
interface TakePhoto {
    cameraMode: string;
    filter: string;
    burst: number;
}

class Instagram implements TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number
    ) {}
}

interface Story {
    createStory(): string;
}

class Youtube implements TakePhoto, Story {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number,
        public short: string
    ) {}

    createStory(): string {
        return 'created story';
    }
}
```

The power of interfaces is that a class can be forced to follow that interface definitions. To do that use the keyword **implements**

In the above example _Instagram_ implements _TakePhoto_ this means constructor has to provide all members.
The _Youtube_ implements _TakePhoto_ and _Story_ interface. In addition to the member Youtube class has to provide implementation for _createStory_ method. In addition we add into Youtube class a new member called _short_

If you miss a member or a function implementation an error will be trigger by tsc compiler.

## Abstract classes

```typescript
abstract class TakePhoto2 {
    constructor(public cameraMode: string, public filter: string) {}

    getSepia(): string {
        return 'Sepia5';
    }

    abstract getWhiteBalance(): void;
}

//const ITP = new TakePhoto("Auto", "MD0"); // we cannot create an instance of abstract class

class Instagram2 extends TakePhoto2 {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number
    ) {
        super(cameraMode, filter);
    }
    getWhiteBalance(): void {
        console.log(`${this.burst}`);
    }
}

const instagramITP = new Instagram2('Manual', 'Md5', 55);
instagramITP.getSepia();
instagramITP.getWhiteBalance();
```

The keyword **abstract** do the magic here. It can be used for classes and for the methods. By putting _abstract_ in front of _methods_ this means the child has to provide an implementation.

Also to be notice in case of _abstract classes_ the child has to _extend_ from parent.

_**Also an abstract class cant be instantiated!**_

The power of abstract is that you can provide some functionality that will be inherited for free in all its child classes.

---

## Generics

A generic function can be declared using this format: **function xyz< Type >(arg: Type): Type{}**

```typescript
function identity(arg: number): number {
    return arg;
}

// this can receive a number and can be returning a string which is BAD
function identityNS(arg: number | string): string | number {
    return arg;
}

//NOT A GOOD IDEA either
function identityN(arg: any): any {
    return arg;
}

//defining a generic function
function identityT<Type>(arg: Type): Type {
    return arg;
}

const ret = identityT(1); // ret will be number;
const ret2 = identityT('myStr'); // string

// this is similar two identityT but we are using shorthand
// You can define your own letter, in our example we used T
function identityShortT<T>(arg: T): T {
    return arg;
}

interface Genetics {
    chromoX: boolean;
    chromoY: boolean;
}

function identify<Genetics>(arg: Genetics): Genetics {
    return arg;
}
```

### Generics in array

```typescript
// function getElement<T>(elements: Array<T>): T
function getElement<T>(elements: T[]): T {
    return elements[0];
}
// <AT>(elements: Array<AT>): AT
const element = <AT>(elements: AT[]): AT => {
    return elements[0];
};
```

When you see **<T,>** the comma after type this is just an highlighter used mostly in React to say this is not JSX language this is using generics.

### Generic constraints

In order to achieve any constraint on the generic type use the keyword **extends**

```typescript
function toObj<A, B>(a: A, b: B): object {
    return {
        a,
        b,
    };
}

function toObj2<A, B extends number>(a: A, b: B): object {
    return {
        a,
        b,
    };
}

toObj(5, 'two');
//toObj2(5, "two"); //not allowed
```

Here below a common use-case example:

```typescript
interface DB {
    connection: string;
    userName: string;
    password: string;
}

function init<V, T extends DB>(handler: V, db: T): number {
    return 5;
}

init(5, { connection: 'a', userName: 'B', password: 'p' });
```

## Generic classes

```typescript
interface Quiz {
    name: string;
    type: string;
}

interface Course {
    name: string;
    author: string;
    price: number;
}

//generic class
class Sellable<T> {
    public cart: T[] = [];
    addToCart(product: T) {
        this.cart.push(product);
    }
}

const mySell = new Sellable<Quiz>();
```

**Observation**: function **addToCart(product: T)** is already generic and if you add the **<T,>** to the function signature will trigger a compilation error.

--

## Type narrowing

This is done using the keyword **typeof**

> https://www.typescriptlang.org/docs/handbook/2/narrowing.html

**typeof** type guards
As we’ve seen, JavaScript supports a typeof operator which can give very basic information about the type of values we have at runtime. TypeScript expects this to return a certain set of strings:

-   "string"
-   "number"
-   "bigint"
-   "boolean"
-   "symbol"
-   "undefined"
-   "object" - this includes [] and null
-   "function"

```typescript
function perform(val: number | string) {
    if (typeof val === 'string') return val.toLowerCase();
    return val + 3;
}

perform(5); // 8
perform('AAA'); //aaa

function transformId(id: string | null): string | void {
    if (!id) {
        console.log('provide id');
        return;
    }
    return id.toLowerCase();
}

const X = transformId('ABC');
```

In JavaScript, constructs like if first “coerce” their conditions to booleans to make sense of them, and then choose their branches depending on whether the result is true or false. Values like:

-   0
-   NaN
-   "" (the empty string)
-   0n (the bigint version of zero)
-   null
-   undefined

all coerce to false, and other values get coerced to true. You can always coerce values to booleans by running them through the Boolean function, or by using the shorter double-Boolean negation. (The latter has the advantage that TypeScript infers a narrow literal boolean type true, while inferring the first as type boolean.)

```typescript
function printAll(strs: string | string[] | null) {
    // !!!!!!!!!!!!!!!!
    //  DON'T DO THIS!
    //   KEEP READING
    // !!!!!!!!!!!!!!!!
    if (strs) {
        if (typeof strs === 'object') {
            for (const s of strs) {
                console.log(s);
            }
        } else if (typeof strs === 'string') {
            console.log(strs);
        }
    }
}
```

In this example may look we cover everything.
_BUT_ there is one thing it didn't cover: **"" - empty string**. Empty string is falsy!

### Type narrowing using in operator

```typescript
interface User {
    email: string;
}

interface Admin {
    email: string;
    isAdmin: boolean;
}

function isAdminAccount(account: User | Admin): boolean {
    // in operator will narrow down account to Admin type
    if ('isAdmin' in account) return true;
    return false;
}
```

### Type narrowing using instanceof

As stated in the below code if you create a new object with **new** keyword you can detect the type by using the keyword **instanceof**

```typescript
// new keyword works with instanceof
function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toLocaleUpperCase());
    }
}
```

### Type narrowing with type predicates

Using keyword **as** we can check if the method from the type is defined resulting we narrow to what we are looking after.
An other important aspect is the return type that make use of keyword **is**. This will prevent method to return true or false and it will return the Type of the object.

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim() !== undefined;
}
```

### Discriminated unions & Exhaustiveness checking

For the discriminated unions concept there is a recommendation to add **kind** into the object definition so that it will be easier to detect the **kind** of it :D

The exhaustive checking means you have to go throw all kind of variable and get its kind.

```typescript
interface Circle {
    kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    side: number;
}

interface Rectangle {
    kind: 'rectangle';
    length: number;
    width: number;
}

type Shape = Circle | Square | Rectangle;
function getAreaDiscriminatedUnions(shape: Shape) {
    if (shape.kind === 'circle') return Math.PI * shape.radius;
    if (shape.kind === 'square') return shape.side * shape.side;
    if (shape.kind === 'rectangle') return shape.length * shape.width;
}

// using never for default
// calling getArea with an other shape type from the one defined in cases
// will trigger Typescript error
function getArea(shape: Shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius;
        case 'rectangle':
            return shape.length * shape.width;
        case 'square':
            return shape.side * shape.side;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
```

For the default we define a **never** type that will trigger an Typescript error in case we forgot to include a case for all the possible type of the shape. (e.g. we don't include case 'square').

