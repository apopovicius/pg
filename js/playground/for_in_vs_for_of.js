//https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html
//Both for..of and for..in statements iterate over lists;
// the values iterated on are different though,
// for..in returns a list of keys on the object being iterated, whereas
// for..of returns a list of values of the numeric properties of the object being iterated.

let list = [4, 5, 6];

for (let i in list) {
    console.log(i); // "0", "1", "2",
}

for (let i of list) {
    console.log(i); // "4", "5", "6"
}

// Another distinction is that for..in operates on any object; it serves as a way to inspect properties on this object.
// for..of on the other hand, is mainly interested in values of iterable objects.
// Built-in objects like Map and Set implement Symbol.iterator property allowing access to stored values.

let pets = new Set(['Cat', 'Dog', 'Hamster']);
pets['species'] = 'mammals';

for (let pet in pets) {
    console.log(pet); // "species" -> the name of the key from object
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}
