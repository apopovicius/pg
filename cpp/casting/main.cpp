#include <iostream>

class Human {
public:
    virtual void print() {};
};

class Student: public Human {
};

class Employee: public Human {
};

int main()
{
    Student *s = new Student();
    Human *he = new Employee();
    Human *hs = s;

    std::cout << "'s' is: " << typeid(s).name() << " - '*s' is: "  << typeid(*s).name() << "\n";
    std::cout << "'he' is: " << typeid(he).name() << " - '*he' is: "  << typeid(*he).name() << "\n";
    std::cout << "'hs' is: " << typeid(hs).name() << " - '*hs' is: "  << typeid(*hs).name() << "\n";
    int i;
    std::cout << typeid(int).name() << "\n";

    Student *s1= dynamic_cast<Student*>(he);
    Student *s2= dynamic_cast<Student*>(hs);
    if (s1){
        std::cout << typeid(s1).name()<< "\n";
    }
    if (s2){
        std::cout << typeid(*s2).name()<< "\n";
    }
    return 0;
}
