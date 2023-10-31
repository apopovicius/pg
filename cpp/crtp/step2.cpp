#include<iostream>
#include<vector>

using namespace std;

// reducing code redundancy introducing templates
struct Shape {
    template <typename T>
    Shape* Clone() {
        return new T(*this);
    }

    virtual void print() {
        cout << "This is shape \n";
    };

    virtual ~Shape() = default;
};

struct Square: public Shape {
    int x = 1;
    void print() override {
        cout << "Square \n";
    }
};

struct Rect: public Shape {
    int x = 1;
    int y = 2;
    void print() override {
        cout << "Rect \n";
    }
};

int main() {
    vector<Shape*> v;
    v.push_back(new Square);
    v.push_back(new Rect);

    for(auto s:v) {
        Shape *c = s->Clone<Shape>();
        c->print();
    }
    return 0;
}

