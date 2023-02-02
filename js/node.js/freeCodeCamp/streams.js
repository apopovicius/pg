const { createReadStream, readFileSync } = require('fs');

const stream = createReadStream('EventLoopNodeJS.png');

// default 64kb
// last buffer - remainder
// to control size use highWaterMark
// const stream = createReadStream('EventLoopNodeJS.png', {highWaterMark: 9000});
// const stream = createReadStream('EventLoopNodeJS.png', {encoding: 'utf8'});

stream.on('data', (chunk) => {
    console.log(chunk);
});

stream.on('error', (err) => {
    console.log(err);
});

require('http')
    .createServer(function (req, res) {
        // this will send entire file once its read
        //const text = readFileSync('EventLoopNodeJS.png');
        //res.end(text);

        // how to send data once we read it in chunks
        // this is 3 times faster at least
        const fileStream = createReadStream('EventLoopNodeJS.png');
        fileStream.on('open', () => {
            fileStream.pipe(res);
        });
        fileStream.on('error', () => {
            res.end(err);
        });
    })
    .listen(5000);
