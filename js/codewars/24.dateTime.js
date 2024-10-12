let myDate = new Date();
console.log(myDate.getFullYear());
console.log(myDate.getMonth() + 1); // 0 - 11
console.log(myDate.getDate()); // gets the day of the month
console.log(myDate.getDay()); // Day as number
console.log(myDate.getHours());
console.log(myDate.getMinutes());
let allSeconds = Date.now();
console.log(allSeconds);

/*
Create a human-readable time format using the Date time object
YYYY-MM-DD HH:mm
DD-MM-YYYY HH:mm
DD/MM/YYYY HH:mm
*/

// format date javascript
function dateFormater(date, separator) {
    const day = ('' + date.getDate()).padStart(2, '0');
    // add +1 to month because getMonth() returns month from 0 to 11
    const month = ('' + date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hh = ('' + date.getHours()).padStart(2, 0);
    let mm = ('' + date.getMinutes()).padStart(2, 0);

    // now we have day, month and year
    // use the separator to join them
    return day + separator + month + separator + year + ' ' + hh + ':' + mm;
}

console.log(dateFormater(myDate, '/'));
console.log(dateFormater(myDate, '-'));
console.log(dateFormater(myDate, '.'));

console.log('dd-mm-yyyy => ' + myDate.toLocaleDateString());

const date = new Date();
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
};

console.log(myDate.toLocaleDateString('en-us', options));
