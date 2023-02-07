require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//error handler
const notFoundMW = require('./middleware/not-found');
const errorHandlerMW = require('./middleware/error-handler');

// routers
const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');

// DB
const connectDB = require('./db/connect');

app.use(express.json());

//extra packages

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', jobsRoute);

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
