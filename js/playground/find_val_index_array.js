const x = [2, 3, 5, 8, 9, 12];
const start = 3;
const end = 10;

const naiv_find = (x, start, stop) => {
    let b = -1;
    let e = -1;

    for(let i=0; i<x.length; i++) 
    {
        if(x[i] >= stop && b > 0) {
            e = i;
            break;
        }

        if(x[i] >= start && b < 0) {
            b = i;
        }
    }

    return [b, e];
}


const binary_search = (b, e, value) => {
    const mid = (b+e) >>> 1;
    if(b >= e) {
        return e;
    } 
    if(x[mid] > value) {
        return binary_search(b, mid, value);
    }
    if(x[mid] < value) {
        return binary_search(mid+1, e, value);
    }
    if(x[mid] === value)
        return mid;
}


console.log(naiv_find(x, start, end));
const startPos = binary_search(0, x.length, start);
const endPos = binary_search(0, x.length, end);
console.log(startPos);
console.log(endPos);