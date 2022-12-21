#include <iostream>
#include "unique_ptr.h"
#include "shared_ptr.h"
#include "weak_ptr.h"



int main() {
    test_unique_ptr();
    test_shared_ptr();
    test_weak_ptr();
    return 0;
}
