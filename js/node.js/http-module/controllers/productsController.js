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
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(product));
        }
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

// @desc Update a Product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            const body = await getPostData(req);
            const { title, description, price } = JSON.parse(body);
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price,
            };

            const updatedProduct = await Product.update(id, productData);
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(updatedProduct));
        }
    } catch (error) {
        console.error(error);
    }
}

// @desc Delete Product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found' }));
        } else {
            await Product.remove(id);
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({ message: `Product ${id} removed` }));
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
