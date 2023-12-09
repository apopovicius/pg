const fs = require('fs');
const assert = require('assert');

const calculatePoints = (havingOK) => {
    return Math.pow(2, havingOK - 1);
};

const fromPointsToHowMany = (points) => {
    return Math.log2(points);
};

const isWinner = (winning, tryNumber) => {
    return winning.includes(tryNumber);
};

const calculatePointsPerCard = (game) => {
    // split winging vs owning
    const parts = game.split('|');
    const winning = parts[0]
        .split(':')[1]
        .split(' ')
        .filter((e) => e !== '')
        .sort((a, b) => a - b)
        .map((e) => +e);
    const having = parts[1]
        .split(' ')
        .filter((e) => e !== '')
        .sort((a, b) => a - b)
        .map((e) => +e);

    let ok = 0;
    // this can be optimized by checking if a winning number exists in the having pot
    for (let tryNumber of having) {
        if (isWinner(winning, tryNumber)) ok++;
    }

    const pointsPerGame = ok > 0 ? calculatePoints(ok) : 0;
    assert(pointsPerGame <= calculatePoints(winning.length));
    return pointsPerGame;
};

const buildInitialDeck = (gameCards, deck) => {
    for (let game of gameCards) {
        const cardName = game.split(':')[0];
        const cardNumber = +cardName.split(' ').filter((e) => e != '')[1];
        deck[`${cardNumber}`] = 1;
    }
    return deck;
};

const addCopiesToDeck = (deck, howManyCopies, originCard) => {
    const originCardNumber = +originCard.split(' ').filter((e) => e != '')[1];
    for (let j = 0; j < deck[originCardNumber]; j++) {
        for (let i = 1; i <= howManyCopies; i++) {
            let nextCopyCardNumber = originCardNumber + i;
            if (!(nextCopyCardNumber in deck))
                throw new Error('Initial deck was not properly set-up');
            deck[nextCopyCardNumber] += 1;
        }
    }

    return deck;
};

function main() {
    const gameCards = fs.readFileSync('04.in').toString('utf-8').split('\n');
    let totalPoints = 0;
    let deck = {};
    deck = buildInitialDeck(gameCards, deck);
    for (let game of gameCards) {
        let pointsPerGame = calculatePointsPerCard(game);
        totalPoints += pointsPerGame;

        const card = game.split(':')[0];
        if (pointsPerGame === 0) continue;
        deck = addCopiesToDeck(
            deck,
            fromPointsToHowMany(pointsPerGame) + 1,
            card
        );

        // console.log(
        //     `Points for this game: ${pointsPerGame} - total points: ${totalPoints}`
        // );
    }
    let totalCards = 0;
    for (const [key, value] of Object.entries(deck)) {
        totalCards += value;
    }

    console.log(totalPoints);
    console.log(totalCards);
}

main();
