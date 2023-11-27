"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i = {
    dbId: 5,
    email: "g@g.co",
    userId: 5,
    startTrial: function () { return "Hi"; },
    endTrial: function () { return "Bye"; },
    getCoupon: function (name) { return 5; } // it doesn't have to match name parameters
    //getCoupon: () => { return 5 } // this is ignoring not taking the parameter
};
i.userId = 9;
