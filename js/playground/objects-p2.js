/* 1. Create an object literal called personAccount.
It has firstName, lastName, incomes, expenses properties and
it has totalIncome, totalExpense, accountInfo, addIncome, addExpense and accountBalance methods.
Incomes is a set of incomes and its description and expenses is a set of incomes and its description.
*/

let personAccount = {
    firstName: '',
    lastName: '',
    incomes: [],
    expenses: [],
    totalIncome: function () {
        return this.incomes.reduce((acc, prev) => acc + prev, 0);
    },
    totalExpense: function () {
        return this.expenses.reduce((acc, prev) => acc + prev, 0);
    },
    accountInfo: function () {
        return `This account is owned by ${this.firstName} ${
            this.lastName
        } and have a debit of ${this.accountBalance()} USD`;
    },
    addIncome: function (value) {
        this.incomes.push(value);
    },
    addExpense: function (value) {
        this.expenses.push(value);
    },
    accountBalance: function () {
        return this.totalIncome() - this.totalExpense();
    },
};

personAccount.firstName = 'Andrei';
personAccount.lastName = 'Nathan';
personAccount.addIncome(10);
personAccount.addIncome(50);
console.log(personAccount.accountInfo());
console.log(personAccount.accountBalance());
personAccount.addExpense(30);
console.log(personAccount.accountBalance());

/*
Imagine you are getting the above users collection from a MongoDB database.
a. Create a function called signUp which allows user to add to the collection.
If user exists, inform the user that he has already an account.
b. Create a function called signIn which allows user to sign in to the application
*/
let users = [
    {
        _id: 'ab12ex',
        username: 'Alex',
        email: 'alex@alex.com',
        password: '123123',
        createdAt: '08/01/2020 9:00 AM',
        isLoggedIn: false,
    },
    {
        _id: 'fg12cy',
        username: 'Asab',
        email: 'asab@asab.com',
        password: '123456',
        createdAt: '08/01/2020 9:30 AM',
        isLoggedIn: true,
    },
    {
        _id: 'zwf8md',
        username: 'Brook',
        email: 'brook@brook.com',
        password: '123111',
        createdAt: '08/01/2020 9:45 AM',
        isLoggedIn: true,
    },
    {
        _id: 'eefamr',
        username: 'Martha',
        email: 'martha@martha.com',
        password: '123222',
        createdAt: '08/01/2020 9:50 AM',
        isLoggedIn: false,
    },
    {
        _id: 'ghderc',
        username: 'Thomas',
        email: 'thomas@thomas.com',
        password: '123333',
        createdAt: '08/01/2020 10:00 AM',
        isLoggedIn: false,
    },
];

// if user is in the collection return already existing user
function signUp(user, mail, pass = '') {
    const existingUser = users.filter((el) => {
        if (el.username === user || el.email === mail) return true;
        else return false;
    });
    if (existingUser.length > 0)
        return `Can not create new user ${user} with ${mail} because its already exists!`;

    let crypto = require('crypto');

    let newUser = {};
    newUser._id = crypto.randomBytes(6).toString('hex');
    newUser.username = user;
    newUser.email = mail;
    newUser.password = pass;
    newUser.isLoggedIn = false;
    newUser.createdAt = new Date();

    users.push(newUser);
    return `User ${user} was created!`;
}
function sign(user, pass) {
    const existingUser = users.filter((el) => {
        if (el.username === user && el.password === pass) return true;
        else return false;
    });
    if (existingUser.length === 1) {
        // mark is logedIn to true
        for (let updateUser of users) {
            if (updateUser.username === user) {
                updateUser.isLoggedIn = true;
            }
        }
    } else {
        return `Invalid credentials for ${user}`;
    }
    return `User ${user} loggedIn`;
}

console.log(signUp('Alex', 'alex@alex.com'));
console.log(signUp('Andrei', 'andrei@andrei.com', '54321'));
console.table(users);
console.log(sign('Andrei', '12345'));
console.log(sign('Andrei', '54321'));
console.table(users);

/* The products array has three elements and each of them has six properties.
a. Create a function called rateProduct which rates the product
b. Create a function called averageRating which calculate the average rating of a product
c. Create a function called likeProduct. Will helps to like to the product if it is not liked
and remove like if it was liked.
*/
let products = [
    {
        _id: 'eedfcf',
        name: 'mobile phone',
        description: 'Huawei Honor',
        price: 200,
        ratings: [
            { userId: 'fg12cy', rate: 5 },
            { userId: 'zwf8md', rate: 4.5 },
        ],
        likes: [],
    },
    {
        _id: 'aegfal',
        name: 'Laptop',
        description: 'MacPro: System Darwin',
        price: 2500,
        ratings: [],
        likes: ['fg12cy'],
    },
    {
        _id: 'hedfcg',
        name: 'TV',
        description: 'Smart TV:Procaster',
        price: 400,
        ratings: [{ userId: 'fg12cy', rate: 5 }],
        likes: ['fg12cy'],
    },
];

function rateProduct(id, userId, rate) {
    if (products.filter((el) => el._id === id).length < 1)
        return 'Product not found';
    for (let product of products) {
        if (product._id === id) {
            product.ratings.push({ userId, rate });
            break;
        }
    }
    return 'Product updated';
}

function averageRating(id) {
    let product = products.filter((el) => el._id === id)[0];
    if (!product) return 'Invalid product';
    return (
        product.ratings.reduce((acc, prev) => acc + prev.rate, 0) /
        product.ratings.length
    );
}

function likeProduct(id, userId) {
    let product = products.filter((el) => el._id === id)[0];
    if (!product) return 'Invalid product';
    let position = -1;
    for (let product of products) {
        if (product._id === id) {
            for (let i = 0; i < product.likes.length; i++) {
                if (product.likes[i] === userId) {
                    //need to take out this like
                    position = i;
                    break;
                }
            }
            if (position === -1) product.likes.push(userId);
        }
    }
    let newLike1 = product.likes.slice(0, position);
    let newLike2 = product.likes.slice(position + 1, product.likes.length);
    if (position !== -1) product.likes = newLike1.concat(newLike2);

    return 'Product like list updated';
}

console.log(rateProduct(5, 'sasd', 5));
console.log(averageRating('hedfcg'));
console.log(rateProduct('hedfcg', 'mark', 4.9));
console.log(averageRating('hedfcg'));
console.table(products);

console.log(likeProduct('aegfal', 'fg12cy'));
console.table(products);
console.log(likeProduct('aegfal', 'fg12cy'));
console.table(products);
console.log(likeProduct('aegfal', 'asssss'));
console.table(products);
console.log(likeProduct('aegfal', 'ttttt'));
console.table(products);
console.log(likeProduct('aegfal', 'fg12cy'));
console.table(products);
console.log(likeProduct('aegfal', 'ttttt'));
console.table(products);
