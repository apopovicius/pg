import "reflect-metadata";

export const formatMetadataKey = Symbol("format");

export function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

export function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
