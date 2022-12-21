//
// Created by Andrei on 7/27/2021.
//

#ifndef CONTAINERS_CPP_ARRAYS_H
#define CONTAINERS_CPP_ARRAYS_H

#include <algorithm>
#include <array>

void print_array(int x[], size_t size)
{
    for(auto i=0; i<size; i++)
        std::cout << x[i] << ' ';

    std::cout << "\n";
}

template <size_t size>
void print_array_cpp(std::array<int, size> x )
{
    for(auto i=0; i<size; i++)
        std::cout << x[i] << ' ';

    std::cout << "\n";
}

void play_with_arrays()
{

    int x [] = {5,4,3,2,1};
    auto size = sizeof(x)/sizeof(x[0]);
    print_array(x, size);

    std::array<int, 3> a1{ {1, 2, 3} };
    std::array<int, 3> a2 = {1, 2, 3};
    std::array<std::string, 2> a3 = { std::string("a"), "b" };

    print_array_cpp(a1);

    // ranged for loop is supported
    for(const auto& s: a3)
        std::cout << s << ' ';

    // container operations are supported
    std::sort(a1.begin(), a1.end());
    std::reverse_copy(a2.begin(), a2.end(), std::ostream_iterator<int>(std::cout, " "));

    std::array<int, 4> a4{};
    a4.fill(5);
    std::cout  << '\n' << "Size: " << a4.size() << "\n";
    std::cout << (a4.empty() ? "empty" : "not empty");

    std::array<int, 3> alice{1, 2, 3};
    std::array<int, 3> bob{7, 8, 9};

    auto print = [](const int& n) { std::cout << ' ' << n; };
    std::for_each(alice.begin(), alice.end(), print);

    std::cout << "-- SWAP\n";
    std::swap(alice, bob);


}

#endif //CONTAINERS_CPP_ARRAYS_H
