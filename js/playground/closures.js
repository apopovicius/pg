/*
It's about 2 functions - outer function & inner function
Closures remember the outer function scope even after creation time.
*/

// function human() {
//     const name = 'Marko'
//     function sayHi() {
//         console.log(`Hi I am ${name}`)
//     }
//     function sayHowYouFeel() {
//         console.log(`${name} is feeling good`)
//     }
//     sayHi()
//     sayHowYouFeel()
// }

function human(name) {
    function sayHi() {
        console.log(`Hi I am ${name}`);
    }
    function sayHowYouFeel() {
        console.log(`${name} is feeling good`);
    }

    return {
        sayHi,
        sayHowYouFeel,
    };
}

//human()
human('Eugene');

const marko = human('Marko');
const ted = human('Ted');

marko.sayHi();
ted.sayHowYouFeel();
