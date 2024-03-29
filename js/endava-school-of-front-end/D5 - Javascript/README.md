# JS Advanced Homework

## Exercise 1:
Create a function (getPhotoForStudent) which accepts a single string parameter and returns a Promise that:
1) Resolves with the student's name, followed by the .png extension, if the name is one of the following: 
"Andrei, Alexandru, Claudiu, Cristiana, Florin, Sergiu".
2) Rejects otherwise.

The promise should return the result after 2 seconds.

Example: getPhotoForStudent('Sergiu') -> Sergiu.png

Example: getPhotoForStudent('Adrian') -> Reject with error message (The photo doesn't exist)


## Exercise 2:
Create a web page that displays the first 10 album titles from https://jsonplaceholder.typicode.com/albums.
1) The albums should be displayed in an unordered list on one third of the page.
2) Upon clicking the album title, you will get the corresponding photos from https://jsonplaceholder.typicode.com/photos
and you will display 15 of them in the remaining two thirds of the page (see the example photo for guidance).
3) Optional:
Display all the images from Exercise 2, with pagination. Each album has 50 photos, so you should have a total of 4 pages
per album.

![alt text](https://github.com/apopovicius/pg/blob/master/js/endava-school-of-front-end/D5%20-%20Javascript/Homework-Design.png)


## Exercise 3:
Create a webpage that displays a todo list in a card for a user:
1) Default state: A form appears where you can select a user with a todo list, where you show his data, in a textarea, you should use the DOM API.
2) If you don't find your user, you should have a button where you can create an user with its todo list, and that one should be saved somewhere (local storage)



