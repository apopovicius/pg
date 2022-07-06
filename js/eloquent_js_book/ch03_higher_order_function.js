// A higher order function is a function that does at least one of this:
// ** takes one or more functions as an argument(parameter)
// ** returns a function ass the results

import { posts } from './posts.js'

// forEach
posts.forEach(post => { 
    console.log(post)
});

// filter
const filterPost = posts.filter(post => {
    return post.userId === 4;
});
console.clear();
console.log(filterPost);


// map
const mappedPosts = filterPost.map(post => {
    return post.id*10;
});
console.clear();
console.log(mappedPosts);


// reduce
const initialValue = 0;
const reducedPostsValue = mappedPosts.reduce((sum, post) => {
    return sum+post;
}, initialValue);
console.clear();
console.log(reducedPostsValue);