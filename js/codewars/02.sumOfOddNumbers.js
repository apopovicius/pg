/*
Given the triangle of consecutive odd numbers:

             1
          3     5
       7     9    11
   13    15    17    19
21    23    25    27    29
...
Calculate the sum of the numbers in the nth row of this triangle (starting at index 1) e.g.: (Input --> Output)

1 -->  1
2 --> 3 + 5 = 8
3 --> 7
4 --> 13
5 --> 21   => n*(n-1)
*/

function rowSumOddNumbers(n) {
    if (n < 1) return 0;
    const firstNumber = n * (n - 1) + 1;
    let row = [n];
    row[0] = firstNumber;
    for (let i = 1; i < n; i++) {
        row[i] = row[i - 1] + 2;
    }
    return row.reduce((acc, curr) => acc + curr, 0);
}

//! short solution
function rowSumOddNumbers(n) {
    /* The rows' start numbers are Hogben's centered polygonal numbers:
    1, 3, 7, 13, 21, 31, 43 = b[n] = n^2 - n + 1.
    <https://oeis.org/A002061>

    The sum of one row is given by:
    s[n] = n^2 + n(b[n] - 1).
    <https://www.quora.com/What-is-the-sum-of-n-consecutive-odd-integers/answer/Xavier-Dectot>

    Inline b[n]:
    s[n]= n^2 + n(n^2 - n + 1 - 1)
        = n^2 + n(n^2 - n)
        = n^2 + n^3 - n^2
        = n^3
    ... oh.
      */
    return n ** 3;
}

for (let i = 0; i < 100; i++) {
    console.log(`row ${i}: ${rowSumOddNumbers(i)}`);
}
