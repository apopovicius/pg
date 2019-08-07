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
#include <functional>

static void ForEach(const std::vector<int>& values, void(*func)(int))
{
    for (int value : values)
        func(value);
}

void global_f(int x) {
    std::cout << "global_f(): " << x << std::endl;
}

struct Functor {
    void operator()() { std::cout << "Functor" << std::endl; }
};


struct LambdaAsFunctor
{
    LambdaAsFunctor(int my_x): my_x(my_x) {}

    void operator()(int amount) { my_x += amount; }

    int my_x;
};

int FFF = 0;

int main(void)
{
     int x = 10;

    auto lm = [my_x = x](int amount) mutable { my_x += amount; }; // won't work without mutable
    auto lm_ref = [&x](int amount) { x += amount; };
    auto lf = LambdaAsFunctor(x);

    lm(5);
    lf(5);
    
    std::vector<int> values = { 1,8,5,4,2,6,7 };
    ForEach(values, [](int value) { std::cout << "Value: " << value << std::endl; });
    
    std::cout << "Find value test:" << std::endl;
    auto it = std::find_if(values.begin(), values.end(), [](int value) { return value > 3; });
    std::cout << *it << std::endl;

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
    auto xt = [i]() mutable { std::cout << ++i << std::endl; };
    xt();
    auto y = x;
    xt();
    y();

    std::cout << "Size?:" << std::endl;
    auto f1 = []() {};
    std::cout << sizeof(f1) << std::endl;

    std::array<char, 100> ar;
    auto f2 = [&ar]() {};
    std::cout << sizeof(f2) << std::endl;

    auto f3 = [ar]() {};
    std::cout << sizeof(f3) << std::endl;
    
    std::function<void()> f;
    std::cout << "testing std::function" << std::endl;

    f = global_f;
    f(1);

    f = [](){ std::cout << "Lambda" << std::endl;};
    f(2);

    Functor functor;
    f = functor;
    f(3);

    /* CAN'T CAPTURE */ 
    static int k = 0;
	//auto f4 = [FFF]() {}; // cant capture static storage duration
	//auto f5 = [k]() {}; // cant capture static storage duration

	// can't deduce return type => error or have to specify return type
    /*
    auto f = [](bool isT)
    {
        if (isT)
            return 10;
        else
            reuturn 0.6;
    };
    
    
    auto f = [](bool isT)
    {
        if (isT)
            return "str";
        else
            reuturn std::string("str");
    };
    
    auto a = f(true);
    auto b = f(false);
     */
    
    auto f = [](bool isT) -> std::string
    {
        if (isT)
            return "str";
        else
            reuturn std::string("str");
    };
    
    auto a = f(true);
    auto b = f(false);
    
   
    return 0;
}



/*
*
* Output:
* Value: 1
* Value: 8
* Value: 5
* Value: 4
* Value: 2
* Value: 6
* Value: 7
*
* Find value test:
* 8
*
* foo/bar test:
* 0
* 10
*
* mutable test:
* 1
* 2
* 2
*
* Size?:
* 1
* 4
* 100
*
* testing std::function
* global_f()
* Lambda
* Functor
*
*
* References:
* https://en.cppreference.com/w/cpp/language/lambda
* https://www.youtube.com/watch?v=mWgmBBz0y8c
* https://shaharmike.com/cpp/lambdas-and-functions/
* 
*/
