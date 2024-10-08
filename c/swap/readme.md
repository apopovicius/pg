# int swap
To swap two integers in C, you can use a simple function that takes two pointers to the integers and swaps their values. 

Explanation:
- Pointers: The function swap takes two pointers to integers (int *a and int *b).
- Temporary Variable: A temporary variable temp stores the value of *a (the value that a points to). Then, the values of the integers are swapped.
- Function Call: In main(), the addresses of x and y are passed to the swap function using the & (address-of) operator.

# strings swap
Swapping two strings in C can be a bit different compared to swapping integers because strings are represented as pointers to character arrays. To swap two strings, you should swap their pointers, not the individual characters.

- Pointers to Pointers: The swap function takes two pointers to strings (char **str1 and char **str2). Each parameter is a pointer to a char*, allowing the function to modify the original pointers passed to it.
- Swapping the Addresses: By swapping the values of the pointers, the function changes which string each pointer refers to, thus effectively swapping the strings.
- No Memory Allocation Required: This approach does not involve copying the entire contents of the strings—just the addresses are swapped.

# generic swap
In C, you can write a generic swap function using the standard C library function memcpy() to copy data between two memory locations. Since C doesn’t support function overloading or templates like C++, the approach is to work with void* pointers, which can point to any data type.

Explanation:
- void* Pointers: The swap() function takes two void* pointers (a and b) and a size_t argument size, which specifies the size of the data type to be swapped.

- Temporary Memory: A temporary buffer temp of size size is allocated using malloc() to hold the data during the swap.

- memcpy(): The function memcpy() is used to copy the memory contents of one location to another. This is done in three steps:
    - Copy the contents of a to the temporary buffer temp.
    - Copy the contents of b to a.
    - Copy the contents of temp back to b.
- Memory Management: After the swap is completed, the temporary buffer temp is freed using free().