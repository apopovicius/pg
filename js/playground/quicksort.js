function quicksort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    const sortedLeft = quicksort(left);
    const sortedRight = quicksort(right);

    const sortedArray = [...sortedLeft, pivot, ...sortedRight];
    return sortedArray;
}

const unsortedArray = [5, 3, 8, 4, 2, 7, 1, 6];
const sortedArray = quicksort(unsortedArray);
console.log(sortedArray);
