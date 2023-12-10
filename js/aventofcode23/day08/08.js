const fs = require('fs');

function main() {
    const map = fs
        .readFileSync('08.in')
        .toString('utf-8')
        .split('\n\n')
        .map((x) => x.trim());

    const instructions = map[0];
    const paths = map[1].split('\n');
    let countStep = 0;
    let next = '';
    let nextInstr = 0;
    let theStep = 'AAA';

    const pathConfig = {};
    for (let path of paths) {
        const [curr, routes] = path.split(' = ');
        pathConfig[curr] = routes.slice(1, -1).split(', ');
    }

    let dirOut = '';

    do {
        countStep++;
        dirOut += instructions[nextInstr];
        const [left, right] = pathConfig[theStep];
        if (instructions[nextInstr] === 'L') next = left;
        else next = right;

        // console.log(
        //     `curr: ${theStep} having instr: ${instructions[nextInstr]} gets us to ${next}`
        // );

        theStep = next;
        nextInstr++;
        if (nextInstr === instructions.length) {
            dirOut += '\n';
            nextInstr = 0;
        }
    } while (next !== 'ZZZ');

    console.log(countStep);
}

main();
