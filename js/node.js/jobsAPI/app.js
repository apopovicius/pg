require('dotenv').config();
require('express-async-errors');

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml');

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

app.use(express.json());

//extra packages
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 100 /*15 min*/, max: 100 }));

app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get('/', (req, res) =>
    res.send(`<h1>Jobs API</h1><a href="/api-docs">Documentation</a>`)
);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', authenticationMW, jobsRoute);

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
