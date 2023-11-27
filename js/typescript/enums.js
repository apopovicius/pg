"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AISLE = 0;
var MIDDLE = 1;
var WINDOW = 2;
var seat = 0;
if (seat == AISLE) {
    console.log('AISLE');
}
var SeatChoiceCode;
(function (SeatChoiceCode) {
    SeatChoiceCode[SeatChoiceCode["AISLE"] = 0] = "AISLE";
    SeatChoiceCode[SeatChoiceCode["MIDDLE"] = 1] = "MIDDLE";
    SeatChoiceCode[SeatChoiceCode["WINDOW"] = 10] = "WINDOW";
    SeatChoiceCode[SeatChoiceCode["NO_SEAT"] = 11] = "NO_SEAT"; // 11
})(SeatChoiceCode || (SeatChoiceCode = {}));
;
var mySeat = SeatChoiceCode.MIDDLE;
var seatString = "middle" /* SeatChoice.MIDDLE */;
console.log(seatString);
console.log(0 /* Fruits.Apple */);
