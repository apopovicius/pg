import "reflect-metadata";

export const calledWithMetadataKey = Symbol("calledWith");

export function calledWith(target: Object, 
  propertyKey: string,
  parameterIndex: number)  
  {
    // get the existing parameters
    const existingParameters: number[] = 
      Reflect.getOwnMetadata(calledWithMetadataKey, target, propertyKey) || [];

    // add the parameter index to the list
    existingParameters.push(parameterIndex);
    
    // set the metadata
    Reflect.defineMetadata(calledWithMetadataKey, existingParameters, target, propertyKey);
  }