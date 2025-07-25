# Decorators

Decorators are a mechanism to add metadata information to our source code.

They are just functions in a particular form which can apply to:

- Class
- Class Property
- Class Method
- Class Accessor
- Class Method Parameter

The syntax of a decorator is pretty simple, just add the @ operator before the decorator you want to use, then the decorator will be applied to the target:

```js
function simpleDecorator() {
  console.log("---hi I am a decorator---");
}

@simpleDecorator
class A {}
```

**Limitation** on typescript we can add decorators only to classes and individual functional are not yet supported.

## Class decorator

It’s suitable for extending an existing class with some properties or methods.

```js
type ClassDecorator = <TFunction extends Function> (target: TFunction) => TFunction | void;
```

- @Params:
  target: the constructor of the class.
- @Returns:
  if the class decorator returns a value, it will replace the class declaration.

Here is an example that converts to string using a decorator

```js
type Consturctor = { new (...args: any[]): any };

function toString<T extends Consturctor>(BaseClass: T) {
  return class extends BaseClass {
    toString() {
      return JSON.stringify(this);
    }
  };
}

@toString
class C {
  public foo = "foo";
  public num = 24;
}

console.log(new C().toString())
// -> {"foo":"foo","num":24}
```

## Class property decorator

```js
type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
```

- @Params:

1.  target: Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
2.  propertyKey: The name of the property.

- @Returns:
  The return value will be ignored.

Except being used to collect information, property decorators can also be used to add some methods or properties to the class. For example, we can write a decorator to add the ability to listen changes on some properties.

```js
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function observable(target: any, key: string): any {
  // prop -> onPropChange
  const targetKey = "on" + capitalizeFirstLetter(key) + "Change";

  target[targetKey] = function (fn: (prev: any, next: any) => void) {
    let prev = this[key];
    Reflect.defineProperty(this, key, {
      set(next) {
        fn(prev, next);
        prev = next;
      },
    });
  };
}

class C {
  @observable
  foo = -1;

  @observable
  bar = "bar";
}

const c = new C();

c.onFooChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`));
c.onBarChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`));

c.foo = 100; // -> prev: -1, next: 100
c.foo = -3.14; // -> prev: 100, next: -3.14
c.bar = "baz"; // -> prev: bar, next: baz
c.bar = "sing"; // -> prev: baz, next: sing
```

## Method decorator

```js
type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;
```

- @Params:

1. target: Either the constructor function of the class for a static member,
   or the prototype of the class for an instance member.
2. propertyKey: The name of the property.
3. descriptor: The property descriptor for the member;

- @Returns:
  If returns a value, it will be used as the descriptor of the member.

What makes method decorators different from property decorators is the descriptor parameter, which lets us override the original implementation and inject some common logic.
For example, we can add logger for some method to log out the input and output:

```js
function logger(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args) {
    console.log("params: ", ...args);
    const result = original.call(this, ...args);
    console.log("result: ", result);
    return result;
  };
}

class C {
  @logger
  add(x: number, y: number) {
    return x + y;
  }
}

const c = new C();
c.add(1, 2);
// -> params: 1, 2
// -> result: 3
```

## Accesor decorators

Accessor decorators are generally the same as method decorators. The only differences are the keys in the descriptor:

The descriptor in a method decorator has keys:

- value
- writable
- enumerable
- configurable

The descriptor in an accessor decorator has keys:

- get
- set
- enumerable
- configurable

```js
function immutable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.set;

  descriptor.set = function (value: any) {
    return original.call(this, { ...value })
  }
}

class C {
  private _point = { x: 0, y: 0 }

  @immutable
  set point(value: { x: number, y: number }) {
    this._point = value;
  }

  get point() {
    return this._point;
  }
}

const c = new C();
const point = { x: 1, y: 1 }
c.point = point;

console.log(c.point === point)
// -> false

```

## Parameter decorator

```js
type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void;
```

- @Params:

1.  target: Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
2.  propertyKey: The name of the property (Name of the method, not the parameter).
3.  parameterIndex: The ordinal index of the parameter in the function’s parameter list.

- @Returns:
  The return value will be ignored.

# TODO implementation:

Extend perf decorators with following:

- class property decorator
- accesor decorator

# References:

- https://www.youtube.com/watch?v=Cos-ctPX5hw
- https://mirone.me/a-complete-guide-to-typescript-decorator/
