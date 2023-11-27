const AISLE = 0;
const MIDDLE = 1;
const WINDOW = 2;

let seat = 0;
if( seat == AISLE) {
    console.log('AISLE');
}

enum SeatChoiceCode {
    AISLE, // starts from 0
    MIDDLE, // 1
    WINDOW = 10,
    NO_SEAT // 11
};

const mySeat = SeatChoiceCode.MIDDLE;

const enum SeatChoice {
    AISLE = "aisle",
    MIDDLE = "middle",
    WINDOW = "window",
    NO_SEAT = 0
}

const seatString = SeatChoice.MIDDLE;
console.log(seatString);

const enum Fruits {
    Apple,
    Grapes,
    Pineapple
}

console.log(Fruits.Apple)

export { };

