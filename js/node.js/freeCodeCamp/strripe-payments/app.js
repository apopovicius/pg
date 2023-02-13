require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const stripeController = require('./controllers/stripe');
const notFoundMW = require('./middleware/not-found');
const errorHandlerHW = require('./middleware/error-handler');

app.use(express.json());
app.use(express.static('./public'));

app.post('/stripe', stripeController);

app.use(notFoundMW);
app.use(errorHandlerHW);

app.listen(3000, console.log('Server is stated and listening on port 3000...'));
