#include <bits/stdc++.h>

// Time Complexity: O(n Log n)
bool checkSorted(int n, int arr[])
{
    // Create a sorted copy of original array
    int b[n];
    for (int i = 0; i < n; i++)
        b[i] = arr[i];
    std::sort(b, b + n);

    // Check if 0 or 1 swap required to
    // get the sorted array
    int ct = 0;
    for (int i = 0; i < n; i++)
        if (arr[i] != b[i])
            ct++;
    if (ct == 0 || ct == 2)
        return true;
    else
        return false;
}

int main()
{
    // [1,5,3,3,7] - ok
    // [1,3,5,3,4] - nok
    // [1,5,3,3,2,6] - ok
    // [-1,-3,2,3,2,4] - nok
    int arr[] = {1, 5, 3, 3, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    if (checkSorted(n, arr))
        cout << "Yes";
    else
        cout << "No";
    return 0;
}