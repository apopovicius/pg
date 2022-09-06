const http = require('http');
const fs = require('fs');
const path = require('path');

function parseMail(parts) {
    const emailWithTag = parts.split('&')[0];
    email = decodeURIComponent(emailWithTag.split('=')[1]);
    return email;
}
function parseQuery(query) {
    const data = query.split('?');
    return parseMail(data[1]);
}
// form with no method has set GET as default
// get - Appends the form-data to the URL in name/value pairs: URL?name=value&name=value
// eg. /register?email=test%40test.com&password=TTTT
// post - Sends the form-data as an HTTP post transaction
// you need to parse the request on chunk data

http.createServer(function (req, res) {
    if (req.url.match('/register')) {
        console.log(req.method);
        if (req.method === 'GET') {
            console.log(req.url);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>User:${parseQuery(req.url)} register!</h1>`);
        } else if (req.method === 'POST' || req.method === 'PUT') {
            // data from form is in body
            let myData = '';
            req.on('data', (chunk) => {
                myData += chunk;
            });
            req.on('end', () => {
                console.log(myData.toString());
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<h1>User:${parseMail(myData)} register!</h1>`);
            });
        } else {
            res.writeHead(504, { 'Content-Type': 'text/html' });
            res.end('No Page Found');
        }
    } else if (req.url === '/') {
        fs.readFile('./public/forms.html', 'UTF-8', function (err, html) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    } else if (req.url.match('.css$')) {
        var cssPath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(cssPath, 'UTF-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fileStream.pipe(res);
    } else if (req.url.match('.jpg$')) {
        var imagePath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        fileStream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('No Page Found');
    }
}).listen(3000);
