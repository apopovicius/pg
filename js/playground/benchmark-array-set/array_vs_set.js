const names = [
  "Alice",
  "James",
  "Sophia",
  "Liam",
  "Olivia",
  "Ethan",
  "Emma",
  "Noah",
  "Ava",
  "Mason"
]

const getRandom = (min, max) => {
    return Math.random()* (max-min) + min;
};

const generateName = () => {
    const index = Math.round(getRandom(0, names.length -1));
    return names[index];
};

const MAX = 100000000

const benchMarkArray = () =>{
    console.time('array-total')
    console.time('array-create');
    const arr = [];    
    for(let i=0; i<MAX; i++) {
        arr[i] = generateName();
    }
    console.timeEnd('array-create');
    
    const random = getRandom(0,MAX);
    
    // add new at random
    console.time('array-add');
    arr.splice(random, 0, generateName());
    console.timeEnd('array-add');
  
    // delete random position
    console.time('array-delete');
    arr.splice(random, 1);
    console.timeEnd('array-delete');

    
    console.timeEnd('array-total')    
}

const benchMarkSet = () =>{
    console.time('set-total')
    console.time('set-create');
    const set = new Set();
    for(let i=0; i<MAX; i++) {
        set.add(generateName());
    }
    console.timeEnd('set-create');
    
    const newName = generateName();

    // add new at random
    console.time('set-add-end');
    set.add(newName);
    console.timeEnd('set-add-end');

    // delete random position
    console.time('set-delete');
    set.delete(newName);
    console.timeEnd('set-delete');

 
    console.timeEnd('set-total')    
}


benchMarkArray();
benchMarkSet();