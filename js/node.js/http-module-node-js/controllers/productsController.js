const Product = require('../models/productsModel');
const { getPostData } = require('../utils');

// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        //res.write(JSON.stringify(products));
        //res.end();
        res.end(JSON.stringify(products));
    } catch (error) {
        console.error(error);
    }
}

// @desc Gets Single  Products
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        }
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(product));
    } catch (error) {
        console.error(error);
    }
}

// @desc Create a Product
// @route POST /api/products
async function createProduct(req, res) {
    try {
        // const product = {
        //     title: 'Test Product',
        //     description: 'This is my product',
        //     price: 100,
        // };
        // const newProduct = await Product.create(product);
        // res.writeHead(201, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify(newProduct));

        const body = await getPostData(req);
        const { title, description, price } = JSON.parse(body);
        const product = {
            title,
            description,
            price,
        };

        const newProduct = await Product.create(product);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
};
