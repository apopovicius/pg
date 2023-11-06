require('dotenv').config();
require('express-async-errors');
const path = require('path');

//extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');

const express = require('express');
const app = express();

//error handler
const notFoundMW = require('./middleware/not-found');
const errorHandlerMW = require('./middleware/error-handler');

// mw
const authenticationMW = require('./middleware/autentication');

// DB
const connectDB = require('./db/connect');

// routers
const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());

//extra packages
app.use(helmet());
app.use(xss());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', authenticationMW, jobsRoute);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMW);
app.use(errorHandlerMW);

const startServer = async () => {
    try {
        // DB
        await connectDB(process.env.MONGO_URI);
        const port = process.env.PORT || 3000;
        app.listen(
            port,
            console.log(`>>>Server is listening at port: ${port}...`)
        );
    } catch (error) {
        console(error);
    }
};

startServer();
