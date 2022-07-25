/*
Exercise 1:
Create a function (getPhotoForStudent) which accepts a single string parameter and returns a Promise that:
1) Resolves with the student's name, followed by the .png extension, if the name is one of the following: 
"Andrei, Alexandru, Claudiu, Cristiana, Florin, Sergiu".
2) Rejects otherwise.
The promise should return the result after 2 seconds.

Example: getPhotoForStudent('Sergiu') -> Sergiu.png
Example: getPhotoForStudent('Adrian') -> Reject with error message (The photo doesn't exist)
*/

function getPhotoForStudent(name) {
    return new Promise((resolve, reject) => {
       setTimeout( () => {
  			let students = ['Andrei', 'Alexandru', 'Claudiu', 'Cristiana', 'Florin', 'Sergiu'];
     		let photo = students.filter(student => student === name)
        									  .map(student => student + '.png');
      	photo.length > 0 ? resolve(photo): reject('The photo doesn\'t exist');
      }, 2000);
    });
}

getPhotoForStudent('Andrei')
  .then(result => console.log(result))
	.catch(error => console.log(error))


getPhotoForStudent('Andreia')
  .then(result => console.log(result))
	.catch(error => console.log(error))

getPhotoForStudent('Cristiana')
  .then(result => console.log(result))
	.catch(error => console.log(error))

