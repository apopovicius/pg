#include <ctype>

//! Todo should replace the stack array with std::vector so that we really remove items from stack :)
int solution(string &S) {
    int stack[12] = {0};
    unsigned result = 0, stackSize=0;

    for(auto &ch: S) {
        if(isdigit(ch)) {
            stack[stackSize++] = it - '0';
        }
        else if( ch == '+' ) {
            // we have 2 items to pop
            if(stackSize-2 >= 0) {
                result = stack[stackSize-1] + stack[stackSize-2];
                // reduce the stack with 2
                stack[stackSize-1] = -1;
                stack[stackSize-2] = -1;
                stackSize -= 2;
                stack[stackSize++] = result;
            }
            else {
                return -1;
            }
        }
        else if( ch == '*' ) {
            if(stackSize-2 >= 0) {
                result = stack[stackSize-1] * stack[stackSize-2];
                stackSize -= 2; // reduce the stack with 2
                stack[stackSize++] = result;
            }
            else {
                return -1;
            }
        }
        else {
            return -1;
        }
    }
    return stack[stackSize-1];
}