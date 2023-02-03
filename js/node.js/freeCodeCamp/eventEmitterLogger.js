const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(level, message) {
        let type = '';
        if (level === 0) {
            console.log(`> ${message}`);
            type = 'log';
        } else if (level === 1) {
            console.warn(`> ${message}`);
            type = 'warn';
        } else if (level === 2) {
            console.error(`> ${message}`);
            type = 'error';
        } else {
            console.info(`> ${message}`);
            type = 'info';
        }
        this.emit('messageLogged', { logLevel: type, message: message });
    }
}

module.exports = Logger;
