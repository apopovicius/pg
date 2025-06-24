type Constructor = { new (...args: any[]): any };

// class decorator
// This decorator will measure the time taken by a method to execute
export function logTiming<T extends Constructor>(constructor: T) {
  return class extends constructor {
      __timings = [];

      printTimings() {
        console.log(this.__timings);
      }
  }
}