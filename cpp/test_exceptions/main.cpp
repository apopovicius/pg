#include <iostream>

#include <stdexcept>

class mycustom_error: public std::invalid_argument
{
public:
    using _Mybase = std::invalid_argument;

    explicit mycustom_error(const std::string& _Message) : _Mybase(_Message.c_str()) {}

    explicit mycustom_error(const char* _Message) : _Mybase(_Message) {}
};


class TestClass {
public:
    explicit TestClass( int exception = 0)
    {
        if (exception == 1)
        {
            throw mycustom_error("mycustom_error thrown");
        }
        else
        {
            throw std::invalid_argument("Invalid Argument thrown");
        }
    }
};



int main() {
    try
    {
        TestClass t(3);
    }
    catch (mycustom_error e)
    {
        std::cout << e.what() << std::endl;
    }
    catch (std::invalid_argument e)
    {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
