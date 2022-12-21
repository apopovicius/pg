#include <iostream>
#include "Test.h"

int main() {
    std::cout << "Hello, World!" << std::endl;

    {
        Test t;
    }

    return 0;
}