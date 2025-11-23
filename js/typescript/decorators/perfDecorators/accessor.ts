export function logAccess(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalGet = descriptor.get;
  const originalSet = descriptor.set;

  if (originalGet) {
    descriptor.get = function () {
      console.log(`Getting value of ${propertyKey}`);
      return originalGet.call(this);
    };
  }

  if (originalSet) {
    descriptor.set = function (value: any) {
      console.log(`Setting value of ${propertyKey} to ${value}`);
      originalSet.call(this, value);
    };
  }
}
