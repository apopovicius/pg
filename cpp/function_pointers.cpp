/* assing a function to a variable */

#include <iostream>
#include <vector>
#include <cstdlib>

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

void f1()
{
  std::cout << "F1" << std::endl;
}

void f2()
{
  std::cout << "F2" << std::endl;
}

void wrapper(void(*fun)())
{
  fun();
}

void add(int a, int b)
{
  std::cout << "Addition is: " <<  a+b << std::endl;
}

void subtract(int a, int b)
{
  std::cout << "Subtraction is: " <<  a-b << std::endl;
}

void multiply(int a, int b)
{
  std::cout << "Multiplication is: " << a*b  << std::endl;
}

int compvar(const void *one, const void *two)
{
    int a = *((int*)one);
    int b = *((int*)two);
    if (a<b)
       return -1;
    if (a == b)
       return 0;
    return 1;
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


    //5. auto func looks like : void(*func)() ---> where func -> is the name of the variable
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

    //10. function pointer as parameter
    wrapper(f1);
    wrapper(f2);

    //11. array of function pointers
    void (*fun_ptr_arr[])(int, int) = {add, subtract, multiply};
    unsigned int a = 15, b = 10;
    for(int i=0;i<=2;i++)
      (*fun_ptr_arr[i])(a,b);

    //12. void qsort (void* base, size_t num, size_t size, int (*compar)(const void*,const void*));
    // comparison function which returns:
    // ​a negative integer value if the first argument is less than the second,
    // a positive integer value if the first argument is greater than the second
    // and zero if the arguments are equal.
    std::qsort(&values[0], values.size(), sizeof(int), compvar);
    ForEach(values,PrintValue);

    return 0;
}

/*
* References:
* https://www.youtube.com/watch?v=p4sDgQ-jao4
* https://www.geeksforgeeks.org/function-pointer-in-c/
*/
