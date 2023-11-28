function perform(val: number | string) {
    if(typeof val === "string")
        return val.toLowerCase();
    return val+3;
}

perform(5); // 8
perform("AAA"); //aaa

function transformId(id: string|null): string|void {
    if(!id) {
        console.log('provide id');
        return
    }
    return id.toLowerCase();
}

const X = transformId("ABC");


interface User {
    email: string
}

interface Admin {
    email: string,
    isAdmin: boolean
}

function isAdminAccount(account: User | Admin):  boolean {
    if("isAdmin" in account) return true;
    return false
}

// new keyword works with instanceof
function logValue(x: Date | string) {
    if(x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toLocaleUpperCase());
    }
}


type Fish = { swim: () => void};
type Bird = { fly: () => void};

function isFish(pet: Fish|Bird): pet is Fish{
    return (pet as Fish).swim() !== undefined
}


interface Circle {
    kind: "circle"
    radius: number
}

interface Square {
    kind: "square"
    side: number
}

interface Rectangle {
    kind: "rectangle"
    length: number
    width: number
}

type Shape = Circle | Square | Rectangle;
function getAreaDiscriminatedUnions(shape: Shape) {
    if(shape.kind === 'circle') return Math.PI * shape.radius;
    if(shape.kind === 'square') return shape.side * shape.side;
    if(shape.kind === 'rectangle') return shape.length * shape.width;
}

// using never for default
// calling getArea with an other shape type from the one defined in cases
// will trigger Typescript error
function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius;
        case 'rectangle': return shape.length * shape.width;
        case 'square': return shape.side * shape.side;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

