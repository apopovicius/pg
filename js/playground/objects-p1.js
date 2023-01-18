const users = {
    Alex: {
        email: 'alex@alex.com',
        skills: ['HTML', 'CSS', 'JavaScript'],
        age: 20,
        isLoggedIn: false,
        points: 30,
    },
    Asab: {
        email: 'asab@asab.com',
        skills: [
            'HTML',
            'CSS',
            'JavaScript',
            'Redux',
            'MongoDB',
            'Express',
            'React',
            'Node',
        ],
        age: 25,
        isLoggedIn: false,
        points: 50,
    },
    Brook: {
        email: 'daniel@daniel.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux'],
        age: 30,
        isLoggedIn: true,
        points: 50,
    },
    Daniel: {
        email: 'daniel@alex.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'Python'],
        age: 20,
        isLoggedIn: false,
        points: 40,
    },
    John: {
        email: 'john@john.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'Node.js'],
        age: 20,
        isLoggedIn: true,
        points: 50,
    },
    Thomas: {
        email: 'thomas@thomas.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        age: 20,
        isLoggedIn: false,
        points: 40,
    },
    Paul: {
        email: 'paul@paul.com',
        skills: [
            'HTML',
            'CSS',
            'JavaScript',
            'MongoDB',
            'Express',
            'React',
            'Node',
        ],
        age: 20,
        isLoggedIn: false,
        points: 40,
    },
};

//1. Find the person who has many skills in the users object.
function getUserWithTheMostSkills() {
    const userEntries = Object.entries(users);
    let max = 0;
    let skilledPerson = '';
    for (let user of userEntries) {
        if (user[1].skills.length >= max) {
            max = user[1].skills.length;
            skilledPerson = user[0];
        }
    }
    console.log(`The most skilled person is ${skilledPerson}`);
}
getUserWithTheMostSkills();

//2. Count logged in users, count users having greater than equal to 50 points from the following object.
function counter() {
    let loggedIn = 0;
    let passingPoints = 0;
    for (let key in users) {
        if (users[key].isLoggedIn === true) loggedIn++;
        if (users[key].points >= 50) passingPoints++;
    }

    console.log(`LoggedIn counter: ${loggedIn}`);
    console.log(`Passing points counter: ${passingPoints}`);
}
counter();

//3. Find people who are MERN stack developer from the users object
function MERNStack() {
    let people = [];
    for (let key in users) {
        if (users[key].skills.includes('React')) people.push(key);
    }

    console.table(`People with React software stack are: ${people}`);
}
MERNStack();

//4. Set your name in the users object without modifying the original users object
users.Andrei = {
    email: 'andrei@andrei.com',
    skills: ['HTML', 'CSS', 'JavaScript', 'MongoDB', 'Express', 'Node'],
    age: 20,
    isLoggedIn: false,
    points: 99,
};
console.table(users);

//5. Get all keys or properties of users object
console.log(`Users keys are: ${Object.keys(users)}`);

//6. Get all the values of users object
console.table(`Users values are: ${Object.values(users)}`);
