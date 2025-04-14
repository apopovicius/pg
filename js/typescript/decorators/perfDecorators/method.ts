import { performance } from 'perf_hooks';
import { calledWithMetadataKey } from './parameter';

interface ThisWithTimings { __timings: unknown[] }

// This decorator will measure the time taken by a method to execute
// method decorator
export function timing() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // get the method
    const value = descriptor.value;
    // replace the method
    descriptor.value = async function(...args: any[]) {
      // start the timer
      const start = performance.now();
      // run original function
      const out = await value.apply(this, args);
      // end the timer
      const end = performance.now();


      // get calledWith metadata
      const calledWithValues = []
      const calledWithParamenters = Reflect.getOwnMetadata(calledWithMetadataKey, target, propertyKey);
      if( calledWithParamenters ) { 
        for(let parameterIndex of calledWithParamenters) {
          calledWithValues.push(args[parameterIndex]);          
        }
      }

      // log the time taken
      if((this as ThisWithTimings).__timings) {
        (this as ThisWithTimings).__timings.push({
          method: propertyKey, // method name
          time: end-start,
          calledWith: calledWithValues
        });
      } else {
        console.log(end-start)
      }
      return out;
    } 
  }
}