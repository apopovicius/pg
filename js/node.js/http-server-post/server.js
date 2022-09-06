const http = require('http');
const fs = require('fs');
const { getPostData } = require('./utils');

const PORT = process.env.PORT || 5000;
const server = http.createServer();

function renderIndex(res) {
    const html = './views/todo.html';
    fs.readFile('./views/todo.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(data);
        }
        res.end();
    });
}

server.on('request', (req, res) => {
    renderIndex(res);
});

server.on('request', (req, res) => {
    if (req.method === 'POST') {
        console.log('FORM SEND DATA');
        let myData = '';
        req.on('data', (chunk) => {
            myData += chunk;
        });
        req.on('end', () => {
            console.log(myData.toString());
            renderIndex(res);
        });
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
