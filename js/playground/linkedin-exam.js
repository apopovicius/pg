// objects
const ex1 = () => {
    var cat = { n: 'At' };
    function swap(feline) {
        feline.n = 'wild';
        feline = { n: 'Tab' };
    }

    swap(cat);
    console.log(cat.n);
};
ex1();

// slice
const ex2 = () => {
    let ax = ['1', '2', '3'];
    ax.splice(0, 2);
    console.log(ax);
};
ex2();

// objects
const ex3 = () => {
    let bear = {
        sound: 'roar',
        roar() {
            console.log(this.sound);
        },
    };

    bear.sound = 'grunt';
    let bearSound = bear.roar;
    bearSound();
};
ex3();

// objects
const ex4 = () => {
    const a = { x: 1 };
    const b = { x: 1 };

    console.log(a.x === b.x);
    console.log(a['x'] === b['x']);
    console.log(a === b);
    console.log(a != b);
};
ex4();

// iteration
const ex5 = () => {
    let rainFA = 10;
    let animals = 0;
    while (rainFA < 13 || animals <= 2) {
        rainFA++;
        animals += 2;
    }

    console.log(animals);
};
ex5();

// array
// Array.of('foo', 2, 'bar', true));
// Expected output: Array ["foo", 2, "bar", true]
ex6 = () => {
    let vowels = Array.of('aeiou');
    console.log(vowels[0]);
};
ex6();

// modulo
const ex7 = () => {
    let x = 6 % 2;
    let y = x ? 'One' : 'two';
    console.log(y);
};
ex7();

// array of objects
// If start is undefined, then the slice begins at index 0.
// If end is undefined, then the slice extends to the end of the array.
const ex8 = () => {
    let xxx = [{ type: 'lion' }, 'tiger'];
    let clones = xxx.slice();

    clones[0].type = 'bear';
    clones[1] = 'sheep';

    console.log(xxx);
    console.log(clones);
};
ex8();

// array destructor
const ex9 = () => {
    let axy = ['1', '2', '3'];
    let [dd, db, dc] = axy;
    console.log(dd, db, dc);
};
ex9();

// function
const ex10 = () => {
    const foo = {
        bar() {
            console.log('AAA');
        },
        name: 'MM',
        age: 25,
    };

    foo;
};
ex10();

// array
const ex11 = () => {
    let jagEag = ['jag', 'eagle'];
    jagEag.reverse();
    jagEag.pop();
    console.log(jagEag);
};
ex11();

// filter
const ex12 = () => {
    let amm = ['e', 'o', 's'];
    let key = (amm) => amm === 's';
    if (amm.filter(key) === true) console.log('swim');
    //if (amm.filter(key).length === 1) console.log('found 1');
};
ex12();

const ex13 = () => {
    const des = { type: 'pi' };
    des.type = 'pu';
    const sec = des;
    sec.type = 'fr';

    console.log(des);
    console.log(sec);
};
ex13();
