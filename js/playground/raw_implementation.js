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
function deepEquals(valueOne, valueTwo) {}

//3. timmer isoDate: '2022-06-02T00:00:00.000-07:00'
function getTimmer(isoDate) {}

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
