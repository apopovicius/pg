const fs = require('fs');

const getEmptyHPositions = (galaxy) => {
    let hPositions = [];
    for (let i = 0; i < galaxy.length; i++) {
        const line = galaxy[i];
        const empty =
            line.split('').filter((e) => e === '.').length === line.length
                ? true
                : false;
        if (empty) {
            hPositions.push(i);
        }
    }
    return hPositions;
};

const expandHorizontally = (smallG) => {
    let galaxy = [];
    const emptyGalaxyHPosition = getEmptyHPositions(smallG);
    for (let i = 0; i < smallG.length; i++) {
        const line = smallG[i];
        if (emptyGalaxyHPosition.find((e) => e === i) !== undefined) {
            galaxy.push(line);
        }
        galaxy.push(line);
    }
    return galaxy;
};

const getEmptyVPositions = (galaxy) => {
    const vPositions = [];
    let position = Array(galaxy[0].length).fill(0);
    galaxy.forEach((line) => {
        const lineArray = line.split('');
        for (let i = 0; i < lineArray.length; i++) {
            if (lineArray[i] === '#') {
                position[i] = 1;
            }
        }
    });
    for (let i = 0; i < position.length; i++) {
        if (position[i] === 0) {
            vPositions.push(i);
        }
    }
    return vPositions;
};

const expandVertically = (galaxy) => {
    const newGalaxy = [];

    const vPositions = getEmptyVPositions(galaxy);
    // index with value 0 is empty
    galaxy.forEach((line) => {
        const lineArray = line.split('');
        let galaxyLine = [];
        for (let i = 0; i < lineArray.length; i++) {
            if (vPositions.find((e) => e === i) !== undefined) {
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

const sumOfLengthSmallGalaxy = (smallG) => {
    const galaxyH = expandHorizontally(smallG);
    const galaxy = expandVertically(galaxyH);
    let totalDistance = 0;
    const galaxyPositions = getGalaxyPositions(galaxy);
    for (let i = 0; i < galaxyPositions.length; i++) {
        for (let j = i + 1; j < galaxyPositions.length; j++) {
            const distance =
                Math.abs(galaxyPositions[j][0] - galaxyPositions[i][0]) +
                Math.abs(galaxyPositions[j][1] - galaxyPositions[i][1]);

            totalDistance += distance;
        }
    }
    return totalDistance;
};

const sumOfLengthGalaxy = (galaxy, magnitude = 1) => {
    let total = 0;
    let hEmptyPos = getEmptyHPositions(galaxy);
    let vEmptyPos = getEmptyVPositions(galaxy);
    const initGalaxyPosition = getGalaxyPositions(galaxy);
    for (let i = 0; i < initGalaxyPosition.length; i++) {
        for (let j = i + 1; j < initGalaxyPosition.length; j++) {
            let vAdj = 0;
            let hAdj = 0;

            const jx = initGalaxyPosition[j][1];
            const jy = initGalaxyPosition[j][0];
            const ix = initGalaxyPosition[i][1];
            const iy = initGalaxyPosition[i][0];

            const howManyAdjustment = (n1, n2, emptyPos) => {
                let adj1 = 0;
                let adj2 = 0;
                emptyPos.forEach((e) => {
                    if (e <= n1) adj1++;
                    if (e <= n2) adj2++;
                });
                return Math.abs(adj2 - adj1) * magnitude;
            };

            hAdj = howManyAdjustment(ix, jx, vEmptyPos);
            vAdj = howManyAdjustment(iy, jy, hEmptyPos);

            const distance = Math.abs(jy - iy) + Math.abs(jx - ix);
            total += distance + hAdj + vAdj;
        }
    }
    return total;
};

function main() {
    const smallG = fs.readFileSync('11.in').toString('utf-8').split('\n');
    const totalSmallGalaxy = sumOfLengthSmallGalaxy(smallG); // P1;
    const totalSmallGalaxyV2 = sumOfLengthGalaxy(smallG); // P1 v2;
    const totalOlderGalaxy = sumOfLengthGalaxy(smallG, 999999); // P2;
    console.log(totalSmallGalaxy);
    console.log(totalSmallGalaxyV2);
    console.log(totalOlderGalaxy);
}

main();
