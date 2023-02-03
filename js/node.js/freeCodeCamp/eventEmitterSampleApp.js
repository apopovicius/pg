const Logger = require('./eventEmitterLogger');
const logger = new Logger();

// register to check if event was logged
logger.on('messageLogged', (arg) => {
    console.log('Receiving feedback from logger', arg);
});

logger.log(2, 'This message has level 2');
logger.log(1, 'This message has level 1');
logger.log(0, 'This message has level 0');
logger.log(-1, 'This message has no level');
logger.log(99, 'This message has level 99');

// run this file to test eventEmitter
