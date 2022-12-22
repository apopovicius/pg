A _stack machine_ is a simple system that performs arithmetic operations on an input string of numbers and operators. It contains a stack that can store an arbitrary number of 12-bit unsigned integers. Intially the stack is empty. The machine processes a string of chars in the followin way:

-   the chars of the string are process one by one
-   if the current char is a digit('0'-'9'), the machine pushes the value of that digit onto its stack;
-   if the current char is '+', the machine pops the two topmost values from its stack, adds them and pushes the result onto the stack;
-   if the current char is '\*', the machine pops the two topmost values from its stack, multiply them and pushes the result onto the stack;
-   after the machine has processed the whole string it returns the topmost value of its stack as the result;
-   the machine reports an error if any operation it performs( addition or multiply ) results in an overflow;
-   the machine reports an error if it tries to pop an element from its stack when the stack is empty, or if the stack is empty after the machine has process the whole string;

> For example, given the string "13+62*7+*" the machine will perform the following operations:

| char | comment             | stack      |
| ---- | ------------------- | ---------- |
|      |                     | [empty]    |
| '1'  | push 1 to the stack | 1          |
| '3'  | push 3 to the stack | 1,3        |
| '+'  | perform addition    | 1+3 = 4    |
| '6'  | push 6 to the stack | 4,6        |
| '2'  | push 2 to the stack | 4,6,2      |
| '\*' | perform multiply    | 4, 2\*6=12 |
| '7'  | push 7 to the stack | 4, 12, 7   |
| '+'  | perform addition    | 4, 12+7=19 |
| '\*' | perform multiply    | 4\*19 = 76 |

> The machine will return 76 as the result as it is the topmost element of its stack

Write a function:

```
int solution(string &S);
```

that given a string S consisting of N chars containing input from the stack machine, return the result the machine would return if given the string. The function should return -1 if the machine will report an error when processing the string.

For example, given S = "11++" the function return -1

Assume that:

-   the lenght of S is in the range [0..200,000]"
-   the string S consists only of the following chars: "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+" and/or "\*".
