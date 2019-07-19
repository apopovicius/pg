/*
Anonymus functions object
[ captures ] ( params ) -> ret { body }
[ captures ] ( params ) { body }
[ captures ] { body }

[&epsilon] capture by reference
[&] captures all variables used in the lambda by reference
[=] captures all variables used in the lambda by value
[&, epsilon] captures variables like with [&], but epsilon by value
[=, &epsilon] captures variables like with [=], but epsilon by reference

Q: Where to use?
A: Whenever you have a function pointer you can you use a lambda
*/

#include <iostream>
#include <vector>
#include <algorithm>
#include <array>

void ForEach(const std::vector<int>& values, void(*func)(int))
{
    for (int value : values)
        func(value);
}

int main(void)
{
    std::vector<int> values = { 1,8,5,4,2,6,7 };
    ForEach(values, [](int value) { std::cout << "Value: " << value << std::endl; });
    
    std::cout << "Find value test:" << std::endl;
    auto it = std::find_if(values.begin(), values.end(), [](int value) { return value > 3; });
    std::cout << *it << std::endl;

    std::cout << "Erase test:" << std::endl;
    auto lambda = [](int value) { std::cout << "Value: " << value << std::endl; };
    int xx = 5;
    values.erase(std::remove_if(values.begin(), values.end(), [xx](int n) { return n < xx; }), values.end());
    ForEach(values, lambda);

    std::cout << "foo/bar test:" << std::endl;
    int i = 0;
    auto foo = [i]() { std::cout << i << std::endl; };
    auto bar = [&i]() { std::cout << i << std::endl; };
    i = 10;
    foo();
    bar();

    
    //i = 1;
    //[&i]() { i = 1; }; // ok, 'i' is captured by-reference.
    //[i]() { i = 1; }; // ERROR: assignment of read-only variable 'i'.
    //[i]() mutable { i = 1; }; // ok.

    std::cout << "mutable test:" << std::endl;
    i = 0;
    auto x = [i]() mutable { std::cout << ++i << std::endl; };
    x();
    auto y = x;
    x();
    y();

    std::cout << "Size?:" << std::endl;
    auto f1 = []() {};
    std::cout << sizeof(f1) << std::endl;

    std::array<char, 100> ar;
    auto f2 = [&ar]() {};
    std::cout << sizeof(f2) << std::endl;

    auto f3 = [ar]() {};
    std::cout << sizeof(f3) << std::endl;

    return 0;
}



/*
* References:
* https://en.cppreference.com/w/cpp/language/lambda
* https://www.youtube.com/watch?v=mWgmBBz0y8c
* 
* Output:
* Value: 1
* Value: 8
* Value: 5
* Value: 4
* Value: 2
* Value: 6
* Value: 7
* Find value test:
* 8
* Erase test:
* Value: 8
* Value: 5
* Value: 6
* Value: 7
* foo/bar test:
* 0
* 10
* mutable test:
* 1
* 2
* 2
* Size?:
* 1
* 4
* 100
*/
