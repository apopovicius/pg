"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userUnion = [1, "hc"];
// this works fine but we want to restrict more the elements of array 
// so that it respects order and types( first number, 2nd string)
// for this lets use tuples
var user = ["hc", 1, true];
console.log(user);
var rgb;
rgb = [255, 255, 123, 0.5];
var newUser = [123, "g@g.com"];
newUser[1] = "ggg@ggg.com"; //accessing the 2nd element of tupple
// controversy: this is an array => we can access all methods of array
// this doesnt follow the protocol as we define it
newUser.push(5, "b.b");
console.log(newUser);
