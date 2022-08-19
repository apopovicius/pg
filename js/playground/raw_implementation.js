// https://www.youtube.com/watch?v=Rs7ARD5TCFU

// 1. promiseAll
function promiseAll(promises) {
    const outputs = [];
    let handledPromisedCounter = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, i) => {
            promise
                .then((value) => {
                    outputs[i] = value;
                    handledPromisedCounter++;
                    if (handledPromisedCounter === promises.length) {
                        resolve(outputs);
                    }
                })
                .catch(reject);
        });
    });
}

// 2. deep equals
function iterateValues(valueOne, valueTwo) {
    let allTrue = true;
    let counter = 0;

    if (typeof valueOne === 'object' && !Array.isArray(valueOne)) {
        let keyObj1 = Object.keys(valueOne);
        let keyObj2 = Object.keys(valueTwo);
        if (keyObj1.length !== keyObj2.length) {
            return false;
        }
        for (let index in keyObj1) {
            if (!deepEquals(keyObj1[index], keyObj2[index])) return false;
        }
    }

    for (let index in valueOne) {
        allTrue = deepEquals(valueOne[index], valueTwo[index]);
        if (allTrue === false) {
            return false;
        } else if (counter === valueOne.length) {
            return true;
        }
        counter++;
    }
    return true;
}

function isNotAnObject(valueOne) {
    if (
        typeof valueOne === 'string' ||
        typeof valueOne === 'boolean' ||
        typeof valueOne === 'number' ||
        typeof valueOne === 'undefined' ||
        valueOne === null
    ) {
        return true;
    }
    return false;
}

function deepEquals(valueOne, valueTwo) {
    if (typeof valueOne !== typeof valueTwo) {
        return false;
    } else if (isNotAnObject(valueOne)) {
        return valueOne === valueTwo;
    } else if (typeof valueOne !== NaN && typeof valueTwo !== NaN) {
        return iterateValues(valueOne, valueTwo);
    } else if (valueOne !== valueTwo) {
        return false;
    }
    return true;
}

//3. CountDownTimmer isoDate: '2022-06-02T00:00:00.000-07:00'
// takes a string in isoDate format
// return an object that could be use for a timmer functionality
// timmerInfo = {hours: number, minutes: number, seconds: number}
// how many hours, min, seconds TILL reach the date passed as input?
function getTimmer(isoDate, timmerInfo) {
    const date = new Date(isoDate);
    setInterval(() => {
        const timeTillDate = date - Date.now();
        const seconds = Math.floor(timeTillDate / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        timmerInfo.seconds = seconds % 60;
        timmerInfo.minutes = minutes % 60;
        timmerInfo.hours = hours;
    }, 500);
}

// Test your code from here
// #1
const slowPromise = new Promise((res) =>
    setTimeout(() => res('slow promise'), 2000)
);
const promises = [
    Promise.resolve(2),
    slowPromise,
    //Promise.reject('error'),
    Promise.resolve('string'),
];
promiseAll(promises).then(console.log);

// #2
console.log('TRUE');
console.log(deepEquals(5, 5));
console.log(deepEquals('asd', 'asd'));
console.log(deepEquals('a', 'a'));
console.log(deepEquals([], []));
console.log(deepEquals([1], [1]));
console.log(deepEquals([1, 2, 3], [1, 2, 3]));
console.log(deepEquals([1, 2, 3, [1, 2]], [1, 2, 3, [1, 2]]));
console.log(
    deepEquals(
        [1, 2, [3, 4], [5, 6], [7, 8, [9, 10]]],
        [1, 2, [3, 4], [5, 6], [7, 8, [9, 10]]]
    )
);
console.log(deepEquals(false, false));
console.log(deepEquals(undefined, undefined));
console.log(deepEquals(null, null));
console.log(deepEquals({}, {}));
console.log(deepEquals({ x: 2, y: 'asd' }, { x: 2, y: 'asd' }));

console.log('FALSE');
console.log(deepEquals('asd', 'asdf'));
console.log(deepEquals(true, false));
console.log(deepEquals(true, 'true'));
console.log(deepEquals(NaN, 0));
console.log(deepEquals(5, 6));
console.log(deepEquals(5, '6'));
console.log(deepEquals(null, 0));
console.log(deepEquals(null, NaN));
console.log(deepEquals(null, 'null'));
console.log(deepEquals([1, 2, 3], [1, 2, 3, 4]));
console.log(deepEquals([1, 2, 3, [1, 2]], [1, 2, 3, [1, 2, 3]]));
console.log(
    deepEquals(
        [1, 2, [3, 4], [5, 6], [7, 8, [9, 10]]],
        [1, 2, [3, 4], [5, 6], [7, 8, [9, 11]]]
    )
);
console.log(deepEquals({ x: 2, y: 'asd' }, { x: 2, y: 'asd', z: 2 }));
console.log(deepEquals({ a: undefined, b: 2 }, { b: 2, c: 3 }));

// #3
timmerInfo = { hours: 0, minutes: 0, seconds: 0 };
getTimmer('2022-08-21T00:00:00.000+03:00', timmerInfo);
let times = 10;
myLoop = setInterval(() => {
    console.log(timmerInfo);
    times--;
    if (times === 0) clearInterval(myLoop);
}, 999);
