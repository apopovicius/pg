const fs = require('fs');
const almanac = fs.readFileSync('05.in').toString('utf-8').split('\r\n\r\n');

const getDestination = (map, target) => {
    const lines = map.split('\r\n').filter((e) => e !== '');
    for (let line of lines) {
        const [destStart, start, step] = line.split(' ').map((x) => Number(x));
        const stop = start + step;
        if (target >= start && target < stop) {
            const destination = destStart + (target - start);
            //console.log(`${target} ==> ${destination}`);
            return destination;
        }
    }
    const destination = target;
    //console.log(`${target} ==> ${destination}`);
    return destination;
};

const findRangeStep = (target) => {
    const lines = almanac[1]
        .split(':')[1]
        .split('\r\n')
        .filter((e) => e != '');
    for (let line of lines) {
        const [, start, step] = line.split(' ').map((x) => Number(x));
        if (target >= start && target < start + step) {
            return step;
        }
    }

    const newStart = lines
        .map((e) => {
            const [, start] = e.split(' ').map((x) => Number(x));
            return start;
        })
        .sort((a, b) => a - b);

    for (let number of newStart) {
        if (target < number) {
            return number - target;
        }
    }

    return -1;
};

function obtainLocation(seed) {
    let output = '';
    output += `Seed ${seed}, `;
    const soil = getDestination(almanac[1].split(':')[1], seed);
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
    return location;
}

const obtainLocationRange = (range, rangeLength) => {
    const minLocationParts = [];
    let nextRange = range;
    do {
        const stepRange = findRangeStep(nextRange);
        const begin = obtainLocation(nextRange);
        let endRange = 0;
        if (stepRange === -1) {
            endRange = range + rangeLength;
            nextRange = -1;
        } else {
            if (rangeLength > stepRange) {
                // we need to iterate once more
                nextRange = nextRange + stepRange;
                endRange = nextRange;
                rangeLength -= stepRange;
            } else {
                // we fit in this range
                nextRange = -1;
                endRange = nextRange + rangeLength - 1;
            }
        }
        const end = obtainLocation(endRange);
        const minLocation = begin > end ? end : begin;
        minLocationParts.push(minLocation);
    } while (nextRange != -1);
    return minLocationParts;
};

function main() {
    const seeds = almanac[0]
        .split(':')[1]
        .split(' ')
        .filter((e) => e != '')
        .map((x) => Number(x));

    let minLocation = [];
    let minRangeLocation = [];

    seeds.forEach((seed) => {
        const location = obtainLocation(seed);
        minLocation.push(location);
    });

    //console.log('---Computing part 2---');

    for (let i = 0; i < seeds.length - 1; i = i + 2) {
        const range = seeds[i];
        const rangeLength = seeds[i + 1];
        // we need to split the range and not iterate through each number as it might take a while to compute the location
        const location = obtainLocationRange(range, rangeLength);
        minRangeLocation = minRangeLocation.concat(location);
    }

    minLocation.sort((a, b) => a - b);
    minRangeLocation.sort((a, b) => a - b);
    console.log(minLocation[0]);
    console.log(minRangeLocation[0]);
}

main();
