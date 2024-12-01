const fs = require('fs');

//─, │, ┌, ┐, └ and ┘

function main() {
    const maze = fs.readFileSync('10-test.in').toString('utf-8').split('\n');
    let pipe = [];

    for (let line of maze) {
        let i = 0;
        let pipeLine = '';
        for (let ch of line) {
            let tCh = ch;
            if (tCh === 'L') tCh = '└';
            if (tCh === 'J') tCh = '┘';
            if (tCh === 'F') tCh = '┌';
            if (tCh === '7') tCh = '┐';
            if (tCh === 'S') tCh = '@';
            pipeLine += tCh;
        }
        pipe.push(pipeLine);
    }

    console.log(pipe.join('\n'));
}
main();
