// avoid collission
// reusability
// maintainability
//
// strict mode
//"use strict";
// x = 3.14;       // This will cause an error because x is not declared


"use strict"; // run in strict mode

// v1 - function myModule() {
var moduleX  = (function() { // IIFE - imediatlly invoked function execution

    let version = Math.floor(Math.random()*9999);
    let _greet = 'Hello', _goodbey = 'So long';

    const _getGreet = function() {
        let random = Math.floor(Math.random()*10);
        random > 5 ? _greet = 'Ohay ' : _greet = 'Hi ';
        return _greet;
    };

    const greeting = function(name) {
        console.log(`${_getGreet() + name}!`);
    };

    // what we publish
    return {
        version: version,
        message: greeting
    };
// v1 };
})();

// from outside
//var module = myModule(); //V1
//module.message("Mark"); //V1

moduleX.message("Mark");
