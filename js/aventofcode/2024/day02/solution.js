'use strict';
const { assert } = require('console');
const fs = require('fs');

// const content = fs.readFileSync('test.in').toString('utf-8').split('\r\n');
const content = fs.readFileSync('data.in').toString('utf-8').split('\r\n');
let resP1 = 0;
let resP2 = 0;

const ORDER = {
    ASC: 0,
    DESC: 1,
    UNKNOWN: 3
};

const getLevelOrder = (level) => {
    let asc = 0;
    let desc = 0;
    for (let i = 0; i < level.length - 1; i++) {
        const diff = level[i] - level[i + 1];
        if (diff < 0) asc++;
        if (diff >= 0) desc++;
        if (asc > 1 && desc <= 1) return ORDER.ASC;
        if (desc > 1 && asc <= 1) return ORDER.DESC;
    }
    console.log('Unkown order for level: ', level);
    return ORDER.UNKNOWN;
}

const validateLevel = (level, initialOrdered) => {
    for (let i = 0; i < level.length - 1; i++) {
        const current = level[i];
        const next = level[i + 1];
        const diff = current - next;
        const ordered = diff > 0 ? ORDER.DESC : ORDER.ASC;

        if (Math.abs(diff) > 3 || diff === 0) {
            return { valid: false, position: i };
        }

        if (ordered !== initialOrdered) {
            return { valid: false, position: i };
        }
    }
    return { valid: true, position: -1 };
}

const revalidate = (list, position) => {
    list.splice(position, 1);
    const newLevelOrder = getLevelOrder(list);
    assert(newLevelOrder !== ORDER.UNKNOWN, 'Should know the order of series for level:', list);
    const result = validateLevel(list, newLevelOrder);
    if (result.valid && result.position === -1) {
        fs.writeFileSync('valid-level.out', list.toString() + '\n', { encoding: 'utf-8', flag: 'a+' });
        return true;
    } else {
        return false;
    }
}


for (let report of content) {
    const level = report.split(' ').map(e => +e);
    const levelOrder = getLevelOrder(level);
    assert(levelOrder !== ORDER.UNKNOWN, 'Should know the order of series for level:', level);
    const result = validateLevel(level, levelOrder);
    if (result.valid) {
        resP1++;
        resP2++;
    } else {
        fs.writeFileSync('invalid-level.out', `Level: ${level} invalid because of: ${level[result.position]}\n`, { encoding: 'utf-8', flag: 'a+' });
        const validateCurrentPos = structuredClone(level);
        const validateNextPos = structuredClone(level);
        if (revalidate(validateCurrentPos, result.position)) {
            resP2++;
            continue;
        } 
        if (revalidate(validateNextPos, result.position + 1)) {
                resP2++;
                continue;
        }
    }
}

fs.writeFileSync('data.out', resP1.toString() + "\n", { encoding: 'utf-8' });
fs.writeFileSync('data.out', resP2.toString(), { encoding: 'utf-8', flag: 'a+' });


