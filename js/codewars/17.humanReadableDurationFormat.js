/*
Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

The function must accept a non-negative integer. If it is zero, it just returns "now". Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.

It is much easier to understand with an example:

* For seconds = 62, your function should return
    "1 minute and 2 seconds"
* For seconds = 3662, your function should return
    "1 hour, 1 minute and 2 seconds"
For the purpose of this Kata, a year is 365 days and a day is 24 hours.

Note that spaces are important.
*/

function formatDuration(seconds) {
    let years = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let sec = 0;

    if (seconds < 1) {
        return 'now';
    }

    years = (seconds / (3600 * 24 * 365)) | 0;
    days = ((seconds / (3600 * 24)) | 0) % 365;
    hours = ((seconds / 3600) | 0) % 24;
    minutes = ((seconds / 60) | 0) % 60;
    sec = seconds % 60;

    //console.log(years, days, hours, minutes, sec);
    let readableDuration = '';

    let yearString = `${years} year`;
    let daysString = `${days} day`;
    let hoursString = `${hours} hour`;
    let minutesString = `${minutes} minute`;
    let secString = `${sec} second`;

    if (years != 0) {
        readableDuration += yearString;
        if (years > 1) {
            readableDuration += 's';
        }
        readableDuration += '*';
    }

    if (days != 0) {
        readableDuration += daysString;
        if (days > 1) {
            readableDuration += 's';
        }
        readableDuration += '*';
    }

    if (hours != 0) {
        readableDuration += hoursString;
        if (hours > 1) {
            readableDuration += 's';
        }
        readableDuration += '*';
    }

    if (minutes != 0) {
        readableDuration += minutesString;
        if (minutes > 1) {
            readableDuration += 's';
        }
        readableDuration += '*';
    }

    if (sec != 0) {
        readableDuration += secString;
        if (sec > 1) {
            readableDuration += 's';
        }
    }

    let formated = readableDuration.split('*').filter((el) => el !== '');
    if (formated.length === 1) {
        readableDuration = formated.toString();
    }
    if (formated.length >= 2) {
        formated.splice(formated.length - 1, 0, 'and');
        readableDuration = formated.join(', ');
        readableDuration = readableDuration.replace(', and,', ' and');
    }

    return readableDuration;
}

// !shorthand
// taken from others - not validated
const formatDurationSH = (seconds) => {
    !seconds
        ? 'now'
        : [
              Math.floor(seconds / 31536000),
              Math.floor(seconds / 86400) % 365,
              Math.floor(seconds / 3600) % 24,
              Math.floor(seconds / 60) % 60,
              seconds % 60,
          ]
              .map((n, i) =>
                  !n
                      ? ''
                      : n +
                        [' year', ' day', ' hour', ' minute', ' second'][i] +
                        (n > 1 ? 's' : '')
              )
              .filter((el) => el)
              .join(', ')
              .replace(/,([^,]*)$/, ' and$1');
};

console.log(
    `Expecting formatDuration(1) to return '1 second' => ${formatDuration(1)}`
);

console.log(
    `Expecting formatDuration(62 to return '1 minute and 2 seconds' => ${formatDuration(
        62
    )}`
);
console.log(
    `Expecting formatDuration(120) to return '2 minutes' => ${formatDuration(
        120
    )}`
);
console.log(
    `Expecting formatDuration(3600) to return '1 hour' => ${formatDuration(
        3600
    )}`
);

console.log(
    `Expecting formatDuration(3662) to return '1 hour, 1 minute and 2 seconds' => ${formatDuration(
        3662
    )}`
);
