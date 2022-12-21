#include <iostream>

void* operator new(size_t n)
{
    std::cout << "[Allocation of " << n << " bytes]: ";
    return malloc(n);
}


int main() {
    for (size_t i = 0; i<44; i++)
        std::cout << i << ":" << std::string(i,'*') << "\n";
    return 0;
}
