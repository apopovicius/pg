A non-empty zero-index array A consists of N integer is given.

You can perform a single swap operation in array A. This operation takes two indices I and J, such 0 <= I<= J < N, and exchanges the values of A[I] and A[J].

The goal is to check wheter the array A can be sorted into non-decreasing order by performing most one swap operation.

For example:

A[0] = 1

A[1] = 5

A[2] = 3

A[3] = 3

A[4] = 7

After exchangig the values A[1] and A[3] we obtain [1,3,3,5,7] wich is sorted in non-decreasing order.

Write a function

```
bool solution(vector<int> &A)
```

that, given a non-empty array, returns true if the array can be sorted non-decreasing order by performing at most one swap operation or false otherwise.

Other example:

A[0] = 1

A[1] = 3

A[2] = 5

A[3] = 3

A[4] = 4

should return false, as there is no single swap operation that sorts array by 1 swap.

If array is already sorted return true.

> Assume that:

-   N is an integer within range [1...100]
-   each element of arrray A is an integer within range [1..1,000,000,000]
