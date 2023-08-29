const leftPad = (n) => {
    return '*'.padStart(n, ' ');
};

const cache = [];
const result = [];
const arrowHead = (n) => {
    for (let i = 1; i <= n; i++) {
        if (i <= n / 2) {
            const line = leftPad(i);
            console.log(line);
            cache.push(line);
        } else {
            if (n % 2 != 0 && i == Math.floor(n / 2 + 1)) {
                //special use case for odd numbers
                const line = leftPad(i);
                console.log(line);
            } else {
                console.log(cache.pop());
            }
        }
    }
};

// console.log('arrow(7)');
// arrowHead(7);

// console.log('arrow(10)');
// arrowHead(10);

module.exports = { leftPad, arrowHead, cache };
