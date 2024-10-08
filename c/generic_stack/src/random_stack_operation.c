#include "stack.h"

void stack_push_multiple_types(stack_t *s) {
   // Allocate a float * on the heap and set the value that's pointed to to 3.14
    float *float_value = malloc(sizeof(float));  // Allocate memory for a float
    if (float_value == NULL) {
        // Handle allocation failure (optional)
        return;  // Or handle the error in another way
    }
    *float_value = 3.14f;  // Set the float value

    // Push the float pointer onto the stack
    stack_push(s, (void *)float_value);

    // Allocate a char * on the heap and set the value that's pointed to
    const char *text = "Sneklang is blazingly slow!";
    char *char_value = malloc(strlen(text) + 1);  // Allocate memory for the string + null terminator
    if (char_value == NULL) {
        // Handle allocation failure (optional)
        free(float_value);  // Free previously allocated float if this fails
        return;  // Or handle the error in another way
    }
    strcpy(char_value, text);  // Copy the string into the allocated memory

    // Push the char pointer onto the stack
    stack_push(s, (void *)char_value);
}

void scary_double_push(stack_t *s) {
    // Push the value 1337 directly onto the stack
    int value1 = 1337;
    stack_push(s, (void *)(int*)value1);  // Cast int to void *

    // Allocate memory for a new int on the heap
    int *value2 = malloc(sizeof(int));  // Allocate memory for an int
    if (value2 == NULL) {
        // Handle allocation failure (optional)
        return;  // Or you might want to handle the error in a different way
    }

    *value2 = 1024;  // Set the value that the address points to

    // Push the int pointer onto the stack
    stack_push(s, (void *)value2);
}