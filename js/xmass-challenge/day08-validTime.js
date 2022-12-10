function validTime(str) {
    const time = str.split(':');
    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]);
    if (hours >= 24 || hours < 0) return false;
    if (minutes >= 60 || minutes < 0) return false;
    return true;
}

console.log('13:58 => ' + validTime('13:58'));
console.log('25:51 => ' + validTime('25:51'));
console.log('02:76 => ' + validTime('02:76'));
