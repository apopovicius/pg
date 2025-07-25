# TypeScript Decorators & Metadata – Reference Guide

## How TypeScript Decorators Work

When `experimentalDecorators` is enabled, TypeScript emits runtime functions for class field decorators. These functions receive:

- The class prototype
- The property name
- (Optional) property descriptor

They are evaluated once at class definition time.

---

## Runtime Type Metadata via `emitDecoratorMetadata`

With `emitDecoratorMetadata`, TypeScript injects metadata using `Reflect.metadata`:

```ts
Reflect.getMetadata("design:type", target, propertyKey);
```

Example:

```ts
class Item {
  @attribute()
  name: string;
}

// Runtime:
Reflect.getMetadata("design:type", Item.prototype, "name"); // [Function: String]
```

---

## Limitations

| Type                  | Metadata Result |
| --------------------- | --------------- |
| `string[]`            | `Array`         |
| `Set<string>`         | `Set`           |
| `Map<string, number>` | `Map`           |
| `MyType \| null`      | `Object`        |
| `readonly`            | Not supported   |
| `private`             | Not supported   |

Complex type metadata (generics, unions, tuples) is erased.

---

## Required tsconfig.json Settings

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "Node",
    "strict": true
  }
}
```

---

## Decorator POC Example

```ts
import "reflect-metadata";

const DynamoDbSchema = Symbol.for("DynamoDbSchema");

function attribute(): PropertyDecorator {
  return (target, propertyKey) => {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    const schema = Reflect.getMetadata(DynamoDbSchema, target) ?? {};
    schema[propertyKey as string] = { type };
    Reflect.defineMetadata(DynamoDbSchema, schema, target);
  };
}

class MyItem {
  @attribute()
  id: string;

  @attribute()
  count: number;
}

console.log(Reflect.getMetadata(DynamoDbSchema, MyItem.prototype));
```

---

## Why Jest Works, Vitest Doesn’t (By Default)

| Feature                 | Jest (ts-jest) | Vitest (default/esbuild) | Vitest (SWC) |
| ----------------------- | -------------- | ------------------------ | ------------ |
| Full TypeScript Support | ✅             | ❌                       | ✅           |
| Decorator Syntax        | ✅             | ✅                       | ✅           |
| emitDecoratorMetadata   | ✅             | ❌                       | ✅           |
| `Reflect.getMetadata()` | ✅             | ❌                       | ✅           |
| Speed                   | ❌ (slower)    | ✅ (very fast)           | ✅           |

---

`esbuild` lacks full TypeScript compiler features:

- **Does not emit metadata** required for `reflect-metadata`
- **Ignores** `emitDecoratorMetadata` flag
- Only parses decorator syntax without full support

---

## Fixing Vitest with SWC

Install SWC:

```bash
npm install -D @swc/core @swc/register
```

Update `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  esbuild: false,
});
```

---

## Monorepo Notes

- Every `tsconfig.json` (apps/libs) must include the decorator flags.
- Always import `reflect-metadata` at app entrypoint or test setup.
- Consistency is key across shared libraries and isolated packages.

---

## Final Takeaway

- Decorators + metadata work fully with `ts-jest` and SWC.
- Vite’s default esbuild cannot emit decorator metadata.
- Metadata can be used to auto-register class schemas.
- TypeScript type info is limited at runtime — treat metadata as sha
