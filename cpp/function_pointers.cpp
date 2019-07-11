#include <iostream>

#include <vector>

/* assing a function to a variable */

void HelloWorld()
{
    std::cout << "Hello World" << std::endl;
}

void Hello(int a)
{
    std::cout << "Hello: " << a <<std::endl;
}

void PrintValue(int value)
{
  std::cout << "Value " << value << std::endl;
}

void ForEach(const std::vector<int> & values, void(*f)(int))
{
    for(int value:values)
    {
         f(value);
    }
}

int main(void)
{
    //1. direct call
    HelloWorld();

    //2. can not deduce auto type because we call function
    //  auto func = HelloWorld();

    //3. fix 2 - getting the function pointer ( memory address of that function )
    auto func = HelloWorld; // &HelloWorld

    //4. call func
    func();


    //5. func looks like
    //void(*func)() ---> func -> name of the variable
    void(*var_name)();
    var_name = HelloWorld;
    var_name();

    // void(*var_name)() = HelloWorld;

    //6. look better
    typedef void(*HelloWolrdFunction)();
    HelloWolrdFunction function = HelloWorld;
    function();

    //7. using function with parameters
    typedef void(*HelloFunction)(int);
    HelloFunction functionH = Hello;

    functionH(5);
    functionH(6);
    functionH(7);

    //8. practical example
    std::vector<int> values = {1,5,6,4,2,3};
    ForEach(values,PrintValue);

    //9. transition to lambda
    ForEach(values,[](int value){std::cout << "Value: " << value << std::endl;});

    return 0;
}
