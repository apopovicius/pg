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
    void operator()(int x) { std::cout << "Functor: " << x << std::endl; }
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
    auto y = xt;
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
    
    std::function<void(int)> f;
    std::cout << "testing std::function" << std::endl;

    f = global_f;
    f(1);

    f = [](int x){ std::cout << "Lambda:" << x << std::endl;};
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
            return 0.6;
    };
    
    
    auto f = [](bool isT)
    {
        if (isT)
            return "str";
        else
            return std::string("str");
    };
    
    auto a = f(true);
    auto b = f(false);
     */
   
	auto l_fs = [](bool isT) -> std::string
	{
		if (isT)
			return "str";
		else
			return std::string("str");
	};

	auto l_f2 = [](bool isT) -> float
	{
		if (isT)
			return 1;
		else
			return 1.5;
	};

	auto a = l_f2(true);
	auto b = l_f2(false);

	auto c = l_fs(true);
  
    return 0;
}

// capture this pointer 
// std::for_each(vec.begin(), vec.end(), [mCounter](int element) -> will not work
class OddCounter
{
	// tracks the count of odd numbers encountered
	int mCounter = 0;
public:
	int getCount()
	{
		return mCounter;
	}
	void update(std::vector<int> & vec)
	{
		// Traverse the vector and increment mCounter if element is odd
		// this is captured by value inside lambda
		// Now as “this” is copied by value inside lambda, all member variables from outer scope can be accessed directly.
		std::for_each(vec.begin(), vec.end(), [this](int element){
			if(element % 2)
				mCounter++; // Accessing member variable from outer scope
		});
	}
};
 
/*
[=] means that all external variables are captured by value. This would allow anonymous function to read value of pointer, deference it and call methods\access fields of the objects it points to.
[&] would mean capture by reference. Pointer is variable. This would allow lamba to modify it, making it to point to other object.

[=]() mutable {};
The mutable specifier allows the lambda to modify the parameters captured by copy and to call their non-const member functions. It doesn't affect variables captured by reference.
The generated class would probably look like:
struct Lambda {
    void operator()() { x++; }
    int x{10};
};
If you remove the mutable specifier, the function operator is defined as const:
struct Lambda {
    void operator()() const { x++; }
    int x{10};
};
*/

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
* https://thispointer.com/c11-lambda-how-to-capture-member-variables-inside-lambda-function/
* https://stackoverflow.com/questions/16944894/c-lambdas-difference-between-mutable-and-capture-by-reference
* https://stackoverflow.com/questions/42056454/lambda-capture-by-value-and-the-mutable-keyword
* https://arne-mertz.de/2015/11/lambdas-part-2-capture-lists-and-stateful-closures/
*/
