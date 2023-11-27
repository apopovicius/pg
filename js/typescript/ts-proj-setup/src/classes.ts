class UserClassic {
    email: string;
    name: string;
    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }
}

const I = new UserClassic("h.h.com","V");

class User {
    protected _userCreated = 1;
    readonly city: string = 'Iasi';
    constructor(
        public email: string,
        public name: string,
        private userId: number
    ) {}

    get getAppleEmail(): string {
        return `apple${this.email}.${this.userId}`;
    }

    get nrOfUsersCreated(): number {
        return this._userCreated;
    }

    set incrNrOfUser(byNumber: number) /*void*/ { // setters has no return type so you can not make it a void
        if(byNumber < 0) throw Error("We need positive numbers");
        this._userCreated += byNumber;
    }
}

const I2 = new User('H.H.CO', 'V', 20);
console.log(I2.getAppleEmail);
I2.incrNrOfUser = 5;

class SubUser extends User {
    isFamily: boolean = true;
    constructor(name: string, email: string, userId: number, public age: number) {
        super(name, email, userId);
    }
    resetUserCreatedCount() {
        this._userCreated = 0;
        super.incrNrOfUser = 1;
    }
}

const SI2 = new SubUser('H.H.CO', 'V', 1, 55);
