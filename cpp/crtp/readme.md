# Curiously recurring template pattern

https://en.wikipedia.org/wiki/Curiously_recurring_template_pattern

Reference: https://www.youtube.com/watch?v=7-nHdQjSRe0
Let's implement a Rectangle & Square class thats derived from Shape base class. We need to see what type of clone will be printed.

```cpp
    vector<Shape*> v;
    v.push_back(new Square);
    v.push_back(new Rect);

    for(auto s:v) {
        Shape *c = s->Clone();
        c->print();
    }
```

## step1.cpp

This is the implementation with straight inheritance and polymorphism usage.
As you can observe in the code there is a piece of code that is repeating and can be improved.

```cpp
struct Shape {
    virtual void print() = 0;
    virtual Shape* Clone() = 0;
    virtual ~Shape() = default;
};

struct Square: public Shape {
    ...
    Square* Clone() {
            return new Square(*this);
    }
    ...
};

struct Rect: public Shape {
    ...
    Rect* Clone() {
        return new Rect(*this);
    }
    ...
}
```

> Output:

```
Square
Rect
```

## step2.cpp

We will try to use templates for the repeating piece of code by adding it to the base class.

```cpp
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
...
int main() {
    ...
    Shape *c = s->Clone<Shape>(); // we need to pass to clone the Shape type
    ...
}
```

> It can be observed that in order to use the clone here we need to offer print an implementation in the Shape class so that it will compile with the main example. The output will be in this case:

```cpp
This is shape
This is shape
```

This is not the desire output! That's because when we clone we don't know if its a square or a rect, we just know its a form of **Shape**:

```cpp
Shape *c = s->Clone<Shape>()
```

## step3.cpp

Using the CRTP we will extract into a new class the template

```cpp
struct Shape {
    virtual Shape* Clone() = 0;
    virtual void print() = 0; // this can get back to pure function => abstract class
    virtual ~Shape() = default;
};

template <typename T>
struct ShapeCRTP: public Shape {
    Shape* Clone() override {
        return new T(*static_cast<T*>(this));
    }
};

struct Square: public ShapeCRTP<Square>
...

struct Rect: public ShapeCRTP<Rect>
...

int main() {
    ...
    for(auto s:v) {
        Shape *c = s->Clone();
        c->print();
    }
    return 0;
}

```

It can be observe that now we inherit from **ShapeCRTP(Square)**- offering the type to the template. This way in clone we will know the type of shape and we care return a clone of that type( **Shape\* of type Square or Rect**).

Also, we had to do some code changes in the Clone function to avoid the error:

```cpp
In instantiation of 'Shape* ShapeCRTP<T>::Clone() [with T = Square]':
step3.cpp:15:12:   required from here
step3.cpp:16:16: error: no matching function for call to 'Square::Square(ShapeCRTP<Square>&)'
   16 |         return new T(*(this));
```

So:

```cpp

return new T(*this);
```

becomes now:

```cpp
return new T(*static_cast<T*>(this));
```

> Output:

```
Square
Rect
```
