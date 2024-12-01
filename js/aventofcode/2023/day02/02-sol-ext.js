const fs = require('fs');
const main = () => {
    const input = fs.readFileSync('./02.in', 'utf8').split('\n');

    const available = {
        red: 12,
        green: 13,
        blue: 14,
    };

    const goodGames = [];
    const gameRequirements = {};
    const gamePowers = {};

    for (const line of input) {
        const [game, config] = line.split(':').map((x) => x.trim());
        const gameId = Number(game.split(' ').at(1));
        gameRequirements[gameId] = {
            red: 0,
            green: 0,
            blue: 0,
        };

        const subgames = config.split(';').map((x) => x.trim());

        for (const sg of subgames) {
            const colorConfig = sg.split(', ');
            for (const cc of colorConfig) {
                const [amount, color] = cc.split(' ');
                const numAmount = Number(amount);
                if (numAmount >= gameRequirements[gameId][color]) {
                    gameRequirements[gameId][color] = numAmount;
                }
            }
        }

        gamePowers[gameId] =
            gameRequirements[gameId].red *
            gameRequirements[gameId].green *
            gameRequirements[gameId].blue;

        if (gameRequirements[gameId].red > available.red) {
            continue;
        }
        if (gameRequirements[gameId].green > available.green) {
            continue;
        }
        if (gameRequirements[gameId].blue > available.blue) {
            continue;
        }
        goodGames.push(gameId);
    }

    let sumOfGoodGames = goodGames.reduce((acc, cur) => acc + cur, 0);
    console.log(goodGames);
    console.log(sumOfGoodGames);

    console.log(gamePowers);
    sumOfGoodGames = Object.values(gamePowers).reduce(
        (acc, cur) => acc + cur,
        0
    );
    console.log(sumOfGoodGames);
};

main();
