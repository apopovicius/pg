function fib(n) {
    if (n === 0) return 0;
    else if (n <= 2) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

const computation = async(n) => {
    console.time('computation')
    const val = fib(n);
    console.timeEnd('computation')
    return val;
};

const computationPromise = (n) => {
    return new Promise((resolve) => {
        console.time('computationPromise');
        const val = fib(n);
        console.timeEnd('computationPromise');
        resolve(val);
    });
};


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
};

async function main() {
    // in this case because the promise1 is havy computation the total time is sum up
    console.time('PromiseAll#1');
    await Promise.all([computation(43), sleep(1000)]);
    console.timeEnd('PromiseAll#1');

    console.time('PromiseAll#2');
    await Promise.all([computationPromise(43), sleep(3000)]);
    console.timeEnd('PromiseAll#2');

    console.time('PromiseAll#3');
    await Promise.all([sleep(3000), sleep(1000)]);
    console.timeEnd('PromiseAll#3');

    console.time('PromiseAll#4');
    await Promise.all([sleep(3000), sleep(5000)]);
    console.timeEnd('PromiseAll#4');
}

main();