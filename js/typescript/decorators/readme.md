# TypeScript Decorators Library

This library provides a set of useful TypeScript decorators for performance monitoring, logging, and metadata management.

## Installation

```bash
npm install
```

## Usage

### Class Decorators

#### `@logTiming`

Adds a `printTimings()` method to the class which logs the execution time of decorated methods.

```typescript
@logTiming
class MyClass {
  // ...
}

const instance = new MyClass();
// @ts-ignore
instance.printTimings();
```

### Method Decorators

#### `@timing()`

Measures the execution time of the decorated method and stores it. Use `@logTiming` on the class to retrieve these timings.

```typescript
class MyClass {
  @timing()
  async myMethod() {
    // ...
  }
}
```

### Accessor Decorators

#### `@logAccess`

Logs a message to the console whenever the getter or setter of the decorated accessor is called.

```typescript
class MyClass {
  private _value: string;

  @logAccess
  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
  }
}
```

### Property Decorators

#### `@format(formatString: string)`

Stores a format string as metadata on the property. This can be retrieved using `getFormat(target, propertyKey)`.

```typescript
import { format, getFormat } from "./perfDecorators";

class MyClass {
  @format("Hello, %s")
  name: string;
}
```

### Parameter Decorators

#### `@calledWith`

Captures the value of the decorated parameter when the method is called. This value is included in the timing logs if `@timing` is also used.

```typescript
class MyClass {
  @timing()
  method(@calledWith id: number) {
    // ...
  }
}
```

## Running Examples

To see the decorators in action, run:

```bash
npx ts-node index.ts
```

## Testing

Run the test suite with:

```bash
npm test
```
