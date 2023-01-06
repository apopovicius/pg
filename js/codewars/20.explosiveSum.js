/*
How many ways can you make the sum of a number?
From wikipedia: https://en.wikipedia.org/wiki/Partition_(number_theory)

In number theory and combinatorics, a partition of a positive integer n, also called an integer partition, is a way of writing n as a sum of positive integers. Two sums that differ only in the order of their summands are considered the same partition. If order matters, the sum becomes a composition. For example, 4 can be partitioned in five distinct ways:

4
3 + 1
2 + 2
2 + 1 + 1
1 + 1 + 1 + 1
Examples
Basic
sum(1) // 1
sum(2) // 2  -> 1+1 , 2
sum(3) // 3 -> 1+1+1, 1+2, 3
sum(4) // 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
sum(5) // 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

sum(10) // 42
Explosive
sum(50) // 204226
sum(80) // 15796476
sum(100) // 190569292

See here for more examples:
http://www.numericana.com/data/partition.htm

Explanation:
https://www.youtube.com/watch?v=ZaVM057DuzE&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8
https://www.youtube.com/watch?v=PafJOaMzstY&list=PLeIMaH7i8JDjMEB-b2I8NGcKMFZc85djW&index=10
*/

function sum(num = 1) {
    let memoization = Array(num + 1)
        .fill(null)
        .map(() => {
            return Array(num + 1).fill(null);
        });

    for (let j = 1; j <= num; j += 1) {
        memoization[0][j] = 0;
    }
    for (let i = 0; i <= num; i += 1) {
        memoization[i][0] = 1;
    }

    for (let i = 1; i <= num; i++) {
        // coins
        for (let j = 1; j <= num; j++) {
            // target/sum
            if (i > j) {
                // copy value form above
                memoization[i][j] = memoization[i - 1][j];
            } else {
                // excluding new coin(above cell)+ including new coin(diff between total-coin 5-3 new and take value from that cell)
                memoization[i][j] =
                    memoization[i - 1][j] + memoization[i][j - i];
            }
        }
    }
    return memoization[num][num];
}

const sum2 = (num) => {
    const dp = [1, ...new Array(num).fill(0)];

    for (let i = 1; i <= num; i++) {
        for (let j = i; j <= num; j++) {
            dp[j] += dp[j - i];
        }
    }

    return dp[num];
};

// ?How TO?
// for the coin change problem you will receive 2 parameters of the sum, one is for coin and other is for total
// the return will be matrix[c][t]
// eg sum(c = 3, t = 5) => return matrix[c][t] = 5

// ! TEST
console.log(sum(1));
console.log(sum(2));
console.log(sum(3));
console.log(sum(4));
console.log(sum(5));
console.log(sum(10));
console.log(sum(50));

console.log(sum2(1));
console.log(sum2(2));
console.log(sum2(3));
console.log(sum2(4));
console.log(sum2(5));
console.log(sum2(10));
console.log(sum2(50));
