const EventEmitter = require('events');

const customEmmitter = new EventEmitter();

// on - listen for an event
// emit - emit an event

customEmmitter.on('response', (name, id) => {
    console.log(`data recieved user: ${name} with id: ${id}`);
});

customEmmitter.on('response', () => {
    console.log('some other logic');
});

customEmmitter.on('response', () => {
    console.log('option 3');
});

customEmmitter.emit('response', 'jhon', 34);

// modules that use under the hood events
// http extends eventEmitter
const server = require('http').createServer();
server.on('request', (req, res) => {
    res.end('Welcome');
});

server.listen(5000);
