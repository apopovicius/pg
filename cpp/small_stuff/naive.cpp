#include <iostream>

class Animal {
    public:
        virtual void speak() = 0;
};

class Cat: public Animal {
    CatSpeakBehaviour behaviour  = new CatSpeakBehaviour();

    public void speak() override {
        std::cout << behavior.Speak();
    }
};

class Dog: public Animal {
    DogSpeakBehaviour behaviour  = new DogSpeakBehaviour();

    public void speak() override {
        return behavior.Speak();
    }
};

class ISpeakBehaviour {
    public:
        virtual void Speak();
};

class CatSpeakBehaviour: public ISpeakBehaviour {
    public:
    std::string Speak() {
        return "mjau";
    }
}

class DogSpeakBehaviour: public ISpeakBehaviour {
    public:
    std::string Speak() {
        return "woof";
    }
}


int main() {

    Animal dog = new Dog();
    dog.speak();

    Animal cat = new Cat();
    cat.speak();

    //Dog - Woof

    //Cat - Meow

    return 0;

}
