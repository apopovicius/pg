const userData = [
    {
        name: {
            title: 'Mr',
            first: 'Levent',
            last: 'Busser',
        },
        dob: {
            date: '1971-08-21T01:08:00.099Z',
            age: 51,
        },
    },
    {
        name: {
            title: 'Mr',
            first: 'Kornelius',
            last: 'Hamnes',
        },
        dob: {
            date: '1961-09-23T13:13:49.283Z',
            age: 61,
        },
    },
    {
        name: {
            title: 'Mademoiselle',
            first: 'Ute',
            last: 'Henry',
        },
        dob: {
            date: '1956-06-30T11:33:42.549Z',
            age: 66,
        },
    },
    {
        name: {
            title: 'Mr',
            first: 'Estéfano',
            last: 'Monteiro',
        },
        dob: {
            date: '1945-07-16T19:48:22.796Z',
            age: 77,
        },
    },
    {
        name: {
            title: 'Mr',
            first: 'Oğuzhan',
            last: 'Beşerler',
        },
        dob: {
            date: '1947-09-28T10:12:30.102Z',
            age: 75,
        },
    },
    {
        name: {
            title: 'Mrs',
            first: 'Susanna',
            last: 'Burke',
        },
        dob: {
            date: '1961-06-13T21:41:24.455Z',
            age: 61,
        },
    },
    {
        name: {
            title: 'Mrs',
            first: 'Haritya',
            last: 'Starickiy',
        },
        dob: {
            date: '1945-12-14T21:29:22.822Z',
            age: 76,
        },
    },
    {
        name: {
            title: 'Miss',
            first: 'Nadja',
            last: 'Branković',
        },
        dob: {
            date: '1993-05-24T11:22:50.967Z',
            age: 29,
        },
    },
    {
        name: {
            title: 'Ms',
            first: 'Sonja',
            last: 'Lenzen',
        },
        dob: {
            date: '1945-03-21T04:33:04.759Z',
            age: 77,
        },
    },
    {
        name: {
            title: 'Ms',
            first: 'Shubhangi',
            last: 'Chatterjee',
        },
        dob: {
            date: '1956-12-25T18:50:29.484Z',
            age: 65,
        },
    },
];

/* Totally Private Data Farm 

Good news, renown advertising firm Evil Corp. wants to purchase our 
private user data! 

We'd never do this in real life of course, but just for practice 
let's pretend we're unethical web hackers and transform the data 
in the way Evil Corp. has requested. They're quite particular and
just want an array of users with a fullname and human readable
birthday.   

Write a function that maps through the current data and returns
a new an array of objects with only two properties: 
fullName and birthday. Each result in your 
array should look like this when you're done: 

{
    fullName: "Levent Busser", 
    birthday: "Sat Aug 21 1971"
}

Read about toDateString() for info on formatting a readable date. 

*/
function transformData(data) {
    return data.map((item) => ({
        fullname: item.name.first + ' ' + item.name.last,
        birthday: new Date(item.dob.date).toDateString(),
    }));
}

console.log(transformData(userData));
