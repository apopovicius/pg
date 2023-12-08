const fs = require('node:fs');
let answerA = -1;
try {
    const input = fs.readFileSync('05.in', 'utf8') + '\r\n'; //hack to add new lines to end to trigger output cal at end of loop
    const lines = input.split('\r\n');
    const seeds = lines[0].match(/\d+/g);
    seeds.forEach((seed) => {
        let input = seed * 1;
        let output = -1;
        //console.log("\nLOOKING AT SEED", input);
        for (let row = 1; row < lines.length; row++) {
            const line = lines[row];
            if (line.trim() == '') {
                if (output == -1) output = input;
                console.log(`${input} ==> ${output}`);
                input = output;
                output = -1;
            } else {
                if (line.indexOf(':') != -1) {
                    //console.log(line);
                } else if (output == -1) {
                    const bits = line.match(/\d+/g);
                    if (
                        input >= bits[1] * 1 &&
                        input < bits[1] * 1 + bits[2] * 1
                    ) {
                        output = input + bits[0] * 1 - bits[1] * 1;
                    }
                }
            }
        }
        if (answerA == -1) {
            answerA = input;
        } else {
            answerA = Math.min(answerA, input);
        }
    });
} catch (e) {
    console.error(e);
}

console.log('The answer to part 1 is:', answerA);
