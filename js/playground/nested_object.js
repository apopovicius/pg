const objIN = [
    { layerId: 1, key1: 'test', key2: 'test2' },
    { layerId: 1, key1: 'test2', key2: 'test2' },
    { layerId: 2, key1: 'tttt', key2: 'dssd' },
    { layerId: 2, key1: 'testsss', key2: 'sdsds' },
];

function nested() {
    let objOUT = {};
    for (let item of objIN) {
        if (!(item.layerId in objOUT)) objOUT[item.layerId] = [];
        objOUT[item.layerId].push(item);
    }
    return objOUT;
}

function nestedHighOrder() {
    return objIN.reduce((objOUT, item) => {
        objOUT[item.layerId] = objOUT[item.layerId] || [];
        objOUT[item.layerId].push(item);
        return objOUT;
    }, {});
}

console.log(nested());
console.log(nestedHighOrder());
