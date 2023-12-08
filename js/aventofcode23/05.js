const fs = require('fs');
const almanac = fs.readFileSync('05.in').toString('utf-8').split('\r\n\r\n');

const getDestination = (map, target) => {
    const lines = map.split('\r\n').filter((e) => e !== '');
    for (let line of lines) {
        const [destStart, start, step] = line
            .split(' ')
            .map((x) => Number(x));
        const stop = start + step;
        if (target >= start && target < stop) {
            const destination = destStart + (target - start);
            console.log(`${target} ==> ${destination}`);
            return destination;
        }
    }
    const destination = target;
    //console.log(`*For ${target} returning: ${destination}`);
    console.log(`${target} ==> ${destination}`);
    return destination;
};

function main() {
    const seeds = almanac[0].split(':')[1];
    let minLocation = [];
    seeds
        .split(' ')
        .filter((e) => e !== '')
        .forEach((seed) => {
            let output = '';
            output += `Seed ${seed}, `;
            const soil = getDestination(almanac[1].split(':')[1], +seed);
            output += `soil ${soil}, `;
            const fertilizer = getDestination(almanac[2].split(':')[1], soil);
            output += `fertilizer ${fertilizer},`;
            const water = getDestination(almanac[3].split(':')[1], fertilizer);
            output += `water ${water}, `;
            const light = getDestination(almanac[4].split(':')[1], water);
            output += `light ${light}, `;
            const temp = getDestination(almanac[5].split(':')[1], light);
            output += `temperature ${temp}, `;
            const humidity = getDestination(almanac[6].split(':')[1], temp);
            output += `humidity ${humidity}, `;
            const location = getDestination(almanac[7].split(':')[1], humidity);
            output += `location ${location}. `;
            //console.log(output);
            minLocation.push(location);
        });
    minLocation.sort((a, b) => a - b);
    console.log(minLocation[0]);
}

main();
