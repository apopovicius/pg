const fs = require('fs');

const expandHorizontally = (smallG, times = 1) => {
    let galaxy = [];
    smallG.forEach((line) => {
        const empty =
            line.split('').filter((e) => e === '.').length === line.length
                ? true
                : false;
        if (empty) {
            galaxy.push(line);
        }
        galaxy.push(line);
    });
    return galaxy;
};

const expandVertically = (galaxy, times = 1) => {
    const newGalaxy = [];
    let position = Array(galaxy[0].length).fill(0);
    galaxy.forEach((line) => {
        const lineArray = line.split('');
        for (let i = 0; i < lineArray.length; i++) {
            if (lineArray[i] === '#') {
                position[i] = 1;
            }
        }
    });
    // index with value 0 is empty
    galaxy.forEach((line) => {
        const lineArray = line.split('');
        let galaxyLine = [];
        for (let i = 0; i < lineArray.length; i++) {
            if (position[i] === 0) {
                galaxyLine.push('.');
            }
            galaxyLine.push(lineArray[i]);
        }
        newGalaxy.push(galaxyLine);
    });
    return newGalaxy;
};

const getGalaxyPositions = (galaxy) => {
    const gPos = [];
    const lineLength = galaxy.length;
    const columnLength = galaxy[0].length;
    for (let i = 0; i < lineLength; i++) {
        for (let j = 0; j < columnLength; j++) {
            if (galaxy[i][j] === '#') {
                const coordinates = [i, j];
                gPos.push(coordinates);
            }
        }
    }

    return gPos;
};

function main() {
    const smallG = fs.readFileSync('11.in').toString('utf-8').split('\n');
    const galaxyH = expandHorizontally(smallG);
    const galaxy = expandVertically(galaxyH);
    let totalDistances = 0;
    const galaxyPositions = getGalaxyPositions(galaxy);
    for (let i = 0; i < galaxyPositions.length; i++) {
        for (let j = i + 1; j < galaxyPositions.length; j++) {
            const distance =
                Math.abs(galaxyPositions[j][0] - galaxyPositions[i][0]) +
                Math.abs(galaxyPositions[j][1] - galaxyPositions[i][1]);

            totalDistances += distance;
        }
    }
    console.log(totalDistances);
}

main();
