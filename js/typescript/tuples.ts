let userUnion: (string|number) [] = [1, "hc"]; 
// this works fine but we want to restrict more the elements of array 
// so that it respects order and types( first number, 2nd string)
// for this lets use tuples
const user: [string, number, boolean] = ["hc", 1, true];
console.log(user);

let rgb: [number, number, number, number];
rgb = [255, 255, 123, 0.5];

type User = [number, string];
const newUser: User = [123, "g@g.com"];
newUser[1] = "ggg@ggg.com"; //accessing the 2nd element of tupple

// controversy: this is an array => we can access all methods of array
// this doesnt follow the protocol as we define it
newUser.push(5, "b.b"); // [123, 'ggg@ggg.com', 5, 'b.b']
console.log(newUser);

// to prevet this use readonly or as const
// const test:readonly [number, number] = [10,10] as const;
// test.push(5); // error;
export {};
