Consider N coins aligned in a row. Each coin is showing either heads or tails. The _adjacency_ of these coins is the number of adjacent pairs of coins showing the same face.

Given a non-empty array A of N integer elements representing the coins, return the maximum possible adjacency that can be obtained by reversing exactly one coin( that is, one of the coins must be reversed). Consecutive elements of array A represent consecutive coins in a row. Array A contains only 0s and/or 1s:

-   0 represents coin with head facing up
-   1 represents coin with tails facing up

> Example:

A = [1,1,0,1,0,0]

The functions return 4. The initial adjacency is 2, as there are two pairs of adjacent coins showing the same face, namely(0,1) and (4,5).
After reversing the coin represent by A[2] the adjacency equals 4, as there are four pairs: (0,1),(1,2),(2,3),(4,5), and its not possible to obtain a higher adjacency.

Unfortunately despite the fact the function may return expected result for the example input, there is a bug in the implemenatation, which may produce incorrect results for other inputs.

Find the bug and correct it. You should modify at most _three_ lines of code

Assume:
N is integer [1..1,000]
each element of A is an integer having 0 or 1 as value

Complexity:

-   expected worst-case time complexity: O(N)
-   expected worst-case space complexity: O(1), beyond input storage(not including the storage required for input arguments).

```
int solution(vector<int>& A) {
    int n = A.size();
    int result = 0;
    for( int i=0; i< n-1; i++ ) {
        if(A[i] == A[i+1]) {
            result += 1;
        }
    }
    int r=0;
    for( int i=0; i< n; i++ ) {
        int count = 0;
        if(i>0) {
            if(A[i-1]!=A[i])
                count +=1;
            else
                count -=1;
        }
        if(i < n-1) {
            if(A[i+1]!=A[i])
                count +=1;
            else
                count -=1;
        }
        r=max(r, count);
    }
    return result + r;
}
```
