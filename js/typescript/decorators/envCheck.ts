import "reflect-metadata";

import { assert } from "console";

const CUSTOM_METADATA_KEY = Symbol("custom:marker");

function TestDecorator(): PropertyDecorator {
  return (target, propertyKey) => {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    console.log("design:type:", type);
    assert(type, "type should be defined");
    Reflect.defineMetadata(CUSTOM_METADATA_KEY, type, target, propertyKey);
  };
}

class MyClass {
  @TestDecorator()
  myProp!: string;
}

const metadata = Reflect.getMetadata(
  CUSTOM_METADATA_KEY,
  MyClass.prototype,
  "myProp"
);
console.log("Retrieved metadata:", metadata);
