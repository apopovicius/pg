interface User {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: string;
    startTrial: () => string;
    endTrial(): string;
    getCoupon(coupon: string): number;
}

const i: User = {
    dbId: 5,
    email: "g@g.co",
    userId: 5,
    startTrial: () => { return "Hi" },
    endTrial: () => { return "Bye" },
    getCoupon: (name: string) => { return 5 } // it doesn't have to match name parameters
    //getCoupon: () => { return 5 } // this is ignoring not taking the parameter
};
i.userId = 9;
//i.dbId = 10; // error

export { };

