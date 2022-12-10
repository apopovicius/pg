function sortByLength(strs) {
    return strs.sort((a, b) => {
        if (a.length > b.length) return 1;
        if (a.length < b.length) return -1;
        return 0;
    });
}

const strs = ['abc', '', 'aaa', 'a', 'zz'];
const result = sortByLength(strs);
console.log('expect: ["", "a", "zz", "abc", "aaa"]');
console.log('result: ', result);
