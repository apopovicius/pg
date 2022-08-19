const posts = [
    { title: 'Post one', body: 'This is post one' },
    { title: 'Post two', body: 'This is post two' },
];

// callbacks
function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

//getPosts();
// function creatPost(post, callbacks) {
//     setTimeout( () => {
//         posts.push(post);
//         callbacks();
//     }, 2000);
// }

// creatPost( {title: 'Post three', body: 'This is post three'}, getPosts);

// promises
function creatPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;
            if (!error) {
                resolve();
            } else {
                reject('Error: Something went wrong');
            }
        }, 2000);
    });
}

//creatPost( {title: 'Post three', body: 'This is post three'} )
//    .then(getPosts)
//    .catch(error => console.log(error))

// promise.all
const promise1 = Promise.resolve('Hello world');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) =>
    setTimeout(resolve, 2000, 'Goodbye')
);
const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(
    (response) => response.json()
);

Promise.all([promise1, promise2, promise3, promise4]).then((values) =>
    console.log(values)
);

// → ['Hello world', 10, 'Goodbye']
// → 0: "Hello world"
// → 1: 10
// → 2: "Goodbye"
// → 3: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// → length: 4

// async/await
async function init() {
    await creatPost({ title: 'Post three', body: 'This is post three' });
    getPosts();
}
init();

// async/await/fetch
async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    console.log(data);
}

fetchUsers();
// → [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// → 0: {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: {…}, …}
// → 1: {id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', address: {…}, …}
// → 2: {id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', address: {…}, …}
// → 3: {id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org', address: {…}, …}
// → 4: {id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca', address: {…}, …}
// → 5: {id: 6, name: 'Mrs. Dennis Schulist', username: 'Leopoldo_Corkery', email: 'Karley_Dach@jasper.info', address: {…}, …}
// → 6: {id: 7, name: 'Kurtis Weissnat', username: 'Elwyn.Skiles', email: 'Telly.Hoeger@billy.biz', address: {…}, …}
// → 7: {id: 8, name: 'Nicholas Runolfsdottir V', username: 'Maxime_Nienow', email: 'Sherwood@rosamond.me', address: {…}, …}
// → 8: {id: 9, name: 'Glenna Reichert', username: 'Delphine', email: 'Chaim_McDermott@dana.io', address: {…}, …}
// → 9: {id: 10, name: 'Clementina DuBuque', username: 'Moriah.Stanton', email: 'Rey.Padberg@karina.biz', address: {…}, …}
// → length: 10
