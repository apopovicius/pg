interface User {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: string;
    startTrial: () => string;
    endTrial(): string;
    getCoupon(coupon: string): number;
}

interface User {
    gitHubId?: string // this is allowed
}

interface Admin extends User {
    role?: "admin" | "qa" | "dev"
}

const i: User = {
    dbId: 5,
    email: "g@g.co",
    userId: 5,
    startTrial: () => { return "Hi" },
    endTrial: () => { return "Bye" },
    getCoupon: (name: string): number => { return 5 } // it doesn't have to match name parameters
    //getCoupon: () => { return 5 } // this is ignoring not taking the parameter
};
i.userId = 9;
//i.dbId = 10; // error

export { };

