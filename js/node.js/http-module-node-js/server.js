const http = require('http');
const PORT = process.env.PORT || 5000;
const {
    getProducts,
    getProduct,
    createProduct,
} = require('./controllers/productsController');

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } else if (
        req.url.match(/\/api\/products\/([0-9]+)/) &&
        req.method === 'GET'
    ) {
        const id = req.url.split('/')[3]; // api/products/1
        getProduct(req, res, id);
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found!' }));
    }
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<body><h1>Hi there!</h1></body>');
    // res.end();
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
