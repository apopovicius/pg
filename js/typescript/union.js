"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var score = 33;
score = 44;
score = "Score is ".concat(score);
console.log(score);
var me = { name: "Mark", id: 55 };
console.log(me);
me = { username: "Mike", id: 56 };
console.log(me);
function transformDBId(id) {
    console.log("the id is: ".concat(id));
    if (typeof id === 'string') {
        return id.toUpperCase();
    }
    else {
        return id + 5;
    }
}
console.log(transformDBId(11));
console.log(transformDBId("aaa"));
//array
//const data: number[] = [1,2,3,"4"]; // error;
//const data: string[] | number[] = ["1","2", 4]; // error: will be either string either number
var data = ["1", "2", 4]; // OK
var pi = 3.14;
//pi = 3.145; // NOT ALLOWED
var seatAllotment;
//seatAllotment = "test"; // NOT ALLOWED
seatAllotment = "aisle"; //OK
console.log(seatAllotment);
