//
// Created by Andrei on 7/16/2021.
//

#ifndef RULEOFTHREEFIVEZERO_TEST_H
#define RULEOFTHREEFIVEZERO_TEST_H
#include <iostream>

class Test {
public:
    Test()
    {
        std::cout  << "ctor";
    }
    ~Test()
    {
        std::cout << "dtor";
    }

};


class IFace {
    virtual void method1() = 0;
    virtual void method() = 0;
};

class MyFace : public IFace {

};

class Obj
{
public:
    Obj() {}
    Obj(const Obj&) {}
    Obj(Obj&&) {}
};



void someFunc(unsigned int size)
{
    Obj* objArr = new Obj[size]; // allocates an array of Boxes
    /*
    // Some processing
    */
    delete[] objArr;
}

#endif //RULEOFTHREEFIVEZERO_TEST_H
