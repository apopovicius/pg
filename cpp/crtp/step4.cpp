#include<iostream>
#include<vector>
#include<string>

using namespace std;

// using the pattern: curiously recurring template pattern
// getting rid of the print also ;)
struct Shape {
    virtual Shape* Clone() = 0;
    virtual void print() = 0;
    virtual ~Shape() = default;
};

template <typename T>
struct ShapeCRTP: public Shape {
    Shape* Clone() override {
        return new T(*static_cast<T*>(this));
    }

    void print() override {
        string type = typeid(T).name();
        cout << type.erase(0, 1) << endl;
    }
};

struct Square: public ShapeCRTP<Square> {
    int x = 1;
};

struct Rect: public ShapeCRTP<Rect> {
    int x = 1;
    int y = 2;
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

