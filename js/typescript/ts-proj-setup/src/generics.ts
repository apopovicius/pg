function identity(arg: number) : number {
    return arg;
}

// this can receive a number and can be returning a string which is BAD
function identityNS(arg: number | string): string|number {
    return arg;
}

//NOT A GOOD IDEA either
function identityN(arg: any): any {
    return arg;
}

//defining a generic function
function identityT<Type,>(arg: Type): Type {
    return arg;
}

const ret = identityT(1); // ret will be number;
const ret2 = identityT("myStr"); // string


// this is similar two identityT but we are using shorthand
// You can define your own letter, in our example we used T
function identityShortT<T,>(arg: T): T {
    return arg;
}

interface Genetics {
    chromoX: boolean,
    chromoY: boolean,
}

function identify<Genetics>(arg: Genetics): Genetics{
    return arg;
}

function toObj<A, B>(a: A, b: B): object {
    return {
        a,
        b
    };
}

function toObj2<A, B extends Number>(a: A, b: B): object {
    return {
        a,
        b
    };
}

toObj(5, "two");
//toObj2(5, "two"); //not allowed

interface DB {
    connection: string,
    userName: string,
    password: string,
}

function init<V, T extends DB>(handler: V, db: T): number {
    return 5;
}

init(5, {connection:"a", userName:"B", password:"p"});