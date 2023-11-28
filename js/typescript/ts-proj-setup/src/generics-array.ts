
// function getElement<T>(elements: Array<T>): T
function getElement<T>(elements: T[]): T {
    return elements[0];
}
// <AT>(elements: Array<AT>): AT
const element = <AT>(elements: AT[]): AT => {
    return elements[0];
}