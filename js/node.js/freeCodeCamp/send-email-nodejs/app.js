require('dotenv').config();

const express = require('express');
const app = express();

const sendEmail = require('./controllers/sendEmail');

const notFoundMW = require('./middleware/not-found');
const errorHandlerHW = require('./middleware/error-handler');

app.get('/', (req, res) => {
    res.send('<h1>Email Project</h1><a href="/send">send email</a>');
});

app.get('/send', sendEmail);

app.use(notFoundMW);
app.use(errorHandlerHW);

app.listen(3000, console.log('Server is stated and listening on port 3000...'));
