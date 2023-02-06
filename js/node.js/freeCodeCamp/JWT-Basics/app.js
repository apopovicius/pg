require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main');
const notFoundMW = require('./middleware/not-found');
const errorHandlerMW = require('./middleware/error-handler');

//  middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/', mainRouter);

app.use(notFoundMW);
app.use(errorHandlerMW);

const startServer = async () => {
    try {
        const port = process.env.PORT || 3000;
        app.listen(
            port,
            console.log(`>>> Sever is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
