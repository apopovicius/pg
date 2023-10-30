const myPromise = (ms, retVal) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(retVal);
        }, ms);
    });
};

async function main() {
    const retVal = await myPromise(500, 10);
    console.log(retVal);
}

async function main2() {
    console.log(await main());
}

console.log(0);
main2();

console.log(main);
console.log(1);

const myTest = () => {};

console.log(myTest());
