let score: number | string = 33;
score = 44;
score = `Score is ${score}`;
console.log(score);

type User = {
  name: string;
  id: number;
};

type Admin = {
  username: string;
  id: number;
};

let me: User | Admin = {name: "Mark", id: 55};
console.log(me);
me = {username: "Mike", id: 56};
console.log(me);

function transformDBId(id: number|string): number|string {
  console.log(`the id is: ${id}`);
  if(typeof id === 'string') {
    return id.toUpperCase(); 
  }
  else {
    return id+5; 
  }
}

console.log(transformDBId(11));
console.log(transformDBId("aaa"));

//array
//const data: number[] = [1,2,3,"4"]; // error;
//const data: string[] | number[] = ["1","2", 4]; // error: will be either string either number
const data: (string|number)[] = ["1","2",4]; // OK

let pi:3.14 = 3.14;
//pi = 3.145; // NOT ALLOWED

let seatAllotment: "aisle" | "middle" | "window";
//seatAllotment = "test"; // NOT ALLOWED
seatAllotment = "aisle"; //OK
console.log(seatAllotment);
export {};
