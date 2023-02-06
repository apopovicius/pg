// this is to populate data from local disk to remote db
// we need a separate connection for this
require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/products');
const jsonProducts = require('./products-input-data.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Successful: You have new data your cloud DB!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
