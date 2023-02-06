require('dotenv').config();
require('express-async-errors');

const express = require('express');
const notFoundMW = require('./middleware/not-found');
const errorMW = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productRoutes = require('./routes/products');
const app = express();

app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send(
        '<h1>Store API</h1> <a href="/ap1/v1/products">Products route</a>'
    );
});

// product route
app.use('/api/v1/products', productRoutes);

// error routes
app.use(notFoundMW);
app.use(errorMW);

const startServer = async () => {
    try {
        //connect db
        await connectDB(process.env.MONGO_URI);
        const port = process.env.PORT || 3000;
        app.listen(
            port,
            console.log(`>>> Server is listening on port ${port}...`)
        );
    } catch (err) {
        console.log(err);
    }
};

startServer();
