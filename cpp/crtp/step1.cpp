#include<iostream>
#include<vector>

using namespace std;

// Simple inheritance
struct Shape {
    virtual void print() = 0;
    virtual Shape* Clone() = 0;
    virtual ~Shape() = default;
};

struct Square: public Shape {
    int x = 1;
    Square* Clone() {
        return new Square(*this);
    }
    void print() override{
        cout << "Square \n";
    }
};

struct Rect: public Shape {
    int x = 1;
    int y = 2;
    Rect* Clone() {
        return new Rect(*this);
    }
    void print() override {
        cout << "Rect \n";
    }
};

int main() {
    vector<Shape*> v;
    v.push_back(new Square);
    v.push_back(new Rect);

    for(auto s:v) {
        Shape *c = s->Clone();
        c->print();
    }
    return 0;
}

