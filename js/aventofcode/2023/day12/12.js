const fs = require('fs');

//NOT EVEN STARTED

function main() {
    const hsMap = fs.readFileSync('12-test.in').toString('utf-8').split('\n');
    for (let row of hsMap) {
        const [springs, damaged] = row.split(' ');
        const damageParts = damaged.split(',').map((x) => Number(x));
        let patternsToBuild = [];
        let possible = 0;
        for (let i = 0; i < damageParts.length; i++) {
            let dSpring = '#'.repeat(damageParts[i]);
            patternsToBuild.push(dSpring);
        }

        const patternsOwn = [];
        let line = '';
        for (let c of springs) {
            if (c === '#' || c === '?') line += c;
            else {
                if (line.length > 0) {
                    patternsOwn.push(line);
                }
                line = '';
            }
        }
        if (line.length > 0) {
            patternsOwn.push(line);
        }

        console.log(`Row: ${row}`);
        console.log(`Need: ${patternsToBuild} - Have: ${patternsOwn}`);
        console.log('----');
    }
}

main();
