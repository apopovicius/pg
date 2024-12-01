const fs = require('fs');

const TYPES = {
    five: 'Five of a kind',
    four: 'Four of a kind',
    fullHouse: 'Full House',
    three: 'Three of a kind',
    twoPairs: 'Two pair',
    onePair: 'One pair',
    highCard: 'High card',
};

const cardsValue = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
};

const whatsTheKind = (hand) => {
    const cards = hand.split('');
    const freq = {};
    for (let card of cards) {
        freq[card] = (freq[card] ?? 0) + 1;
    }

    const count = Object.values(freq).sort((a, b) => b - a);
    switch (count[0]) {
        case 5:
            return TYPES.five;
        case 4:
            return TYPES.four;
        case 3:
            if (count[1] === 2) return TYPES.fullHouse;
            else return TYPES.three;
        case 2:
            if (count[1] === 2) return TYPES.twoPairs;
            else return TYPES.onePair;
        case 1:
            return TYPES.highCard;
        default:
            throw new Error('Invalid game');
    }
};

const whatsTheKindJoker = (hand) => {
    const cards = hand.split('');
    const freq = {};
    for (let card of cards) {
        freq[card] = (freq[card] ?? 0) + 1;
    }

    let count = [];

    if (freq.hasOwnProperty('J')) {
        howMany = freq.J;
        delete freq.J;
        if (howMany === 5) {
            freq.A = 0;
        }
        count = Object.values(freq).sort((a, b) => b - a);
        count[0] += howMany;
    } else {
        count = Object.values(freq).sort((a, b) => b - a);
    }

    switch (count[0]) {
        case 5:
            return TYPES.five;
        case 4:
            return TYPES.four;
        case 3:
            if (count[1] === 2) return TYPES.fullHouse;
            else return TYPES.three;
        case 2:
            if (count[1] === 2) return TYPES.twoPairs;
            else return TYPES.onePair;
        case 1:
            return TYPES.highCard;
        default:
            throw new Error('Invalid game');
    }
};

const computePoints = (hands, rank) => {
    let totals = 0;
    for (const hand of hands) {
        totals += hand.gBid * rank;
        rank--;
    }
    return totals;
};

const getCardValue = (card) => {
    switch (card) {
        case 'A':
            return cardsValue.A;
        case 'K':
            return cardsValue.K;
        case 'Q':
            return cardsValue.Q;
        case 'J':
            return cardsValue.J;
        case 'T':
            return cardsValue.T;
        default:
            return Number(card);
    }
};

const getTotalsPerCategory = (games, category, rank) => {
    let totalPoints = 0;
    const cat = games
        .filter((e) => e.gCategory === category)
        .sort((a, b) => b.gEqualityNumber - a.gEqualityNumber);
    totalPoints += computePoints(cat, rank);
    rank = rank - cat.length;
    return [totalPoints, rank];
};

const rankIt = (games) => {
    let rank = games.length;
    let totalPoints = 0;
    let points = 0;
    [points, rank] = getTotalsPerCategory(games, TYPES.five, rank);
    totalPoints += points;
    [points, rank] = getTotalsPerCategory(games, TYPES.four, rank);
    totalPoints += points;
    [points, rank] = getTotalsPerCategory(games, TYPES.fullHouse, rank);
    totalPoints += points;
    [points, rank] = getTotalsPerCategory(games, TYPES.three, rank);
    totalPoints += points;
    [points, rank] = getTotalsPerCategory(games, TYPES.twoPairs, rank);
    totalPoints += points;
    [points, rank] = getTotalsPerCategory(games, TYPES.onePair, rank);
    totalPoints += points;
    [points, rank] = getTotalsPerCategory(games, TYPES.highCard, rank);
    totalPoints += points;
    return totalPoints;
};

function main() {
    const games = fs.readFileSync('07.in').toString('utf8').split('\n');
    let gamesConfig = [];
    let games2Config = [];
    for (const game of games) {
        const gParts = game.split(' ');
        const gCards = gParts[0];
        const gBid = Number(gParts[1]);
        const gCategory = whatsTheKind(gCards);
        const gCardsDigits = [];
        gCards
            .split('')
            .forEach((card) => gCardsDigits.push(getCardValue(card)));
        let gEqualityNumber = 0;

        let gEqualityNumberJoker = 0;
        const gCategoryJoker = whatsTheKindJoker(gCards);
        const gCardsDigitsJoker = gCardsDigits.map((e) => {
            if (e === cardsValue.J) return 1;
            else return e;
        });

        for (let i = 0; i < gCardsDigits.length; i++) {
            const power = Math.pow(14, gCardsDigits.length - i - 1);
            if (gCardsDigits[i] === cardsValue.J) {
                gEqualityNumberJoker = power * 1 + gEqualityNumberJoker;
            } else {
                gEqualityNumber = power * gCardsDigits[i] + gEqualityNumber;
                gEqualityNumberJoker =
                    power * gCardsDigits[i] + gEqualityNumberJoker;
            }
        }

        const gConfig = {
            gCards,
            gBid,
            gCategory,
            gCardsDigits,
            gEqualityNumber,
        };

        const gConfig2 = {
            ...gConfig,
            gCardsDigits: gCardsDigitsJoker,
            gCategory: gCategoryJoker,
            gEqualityNumber: gEqualityNumberJoker,
        };
        gamesConfig.push(gConfig);
        games2Config.push(gConfig2);
    }
    console.log(rankIt(gamesConfig));
    console.log(rankIt(games2Config));
}

main();
