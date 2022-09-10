let products = require('../data/products');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id);
        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product };
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(product);
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((prod) => prod.id === id);
        products[index] = { id, ...product };
        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((prod) => prod.id !== id);
        writeDataToFile('./data/products.json', products);
        resolve(products);
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
