const fs = require('fs');

const countGems = (round) => {
    const gems = round.split(',');
    let red = 0;
    let blue = 0;
    let green = 0;
    gems.forEach((gem) => {
        const parts = gem.split(' ').filter((e) => e !== '');
        switch (parts[1]) {
            case 'red':
                red += +parts[0];
                break;
            case 'blue':
                blue += +parts[0];
                break;
            case 'green':
                green += +parts[0];
                break;
            default:
                throw new Error(`corrupted game! gem: ${parts[2]} not found`);
        }
    });
    return [red, green, blue];
};

const OK = {
    red: 12,
    green: 13,
    blue: 14,
};

function main() {
    const games = fs.readFileSync('02.in').toString('utf-8').split('\n');
    const gameSelection = {}; // P1+P2
    const gamePowers = {}; // P2
    let sum = 0; // P1
    let sumOfPowers = 0; // P2

    for (let g of games) {
        const parts = g.split(':');
        const gameId = parts[0].split(' ')[1];
        const rounds = parts[1].split(';').map((x) => x.trim());

        // create new gameSelection
        gameSelection[gameId] = {
            red: 0,
            green: 0,
            blue: 0,
        };

        // for some reason i miss this from problem description
        // seen on other people solution that for each game you get the max number of gem color
        // eg for game X:  [10 green, 9 blue, 1 red], [1 red, 7 green], [11 green, 6 blue], [8 blue, 12 green]
        // we keep: [1 red, 12 green, 9 blue]
        for (let round of rounds) {
            const amounts = round.split(', ');
            for (let amount of amounts) {
                const [count, color] = amount.split(' ');
                const number = Number(count);
                if (gameSelection[gameId][color] <= number) {
                    gameSelection[gameId][color] = number;
                }
            }
        }

        gamePowers[gameId] =
            gameSelection[gameId].red *
            gameSelection[gameId].blue *
            gameSelection[gameId].green;
        sumOfPowers += gamePowers[gameId];

        if (gameSelection[gameId].red > OK.red) continue;
        if (gameSelection[gameId].green > OK.green) continue;
        if (gameSelection[gameId].blue > OK.blue) continue;
        sum += +gameId;
    }

    console.log(sum); // P1
    console.log(sumOfPowers); // P2
}

main();
