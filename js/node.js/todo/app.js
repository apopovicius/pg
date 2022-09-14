const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

//MW
app.use(express.json()); // parse json bodies in the request object

// logs
app.use(morgan('tiny'));

// parse request to body parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');
// if there is no views folder(default get by ejs) -> app.set('views', '')

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'public/css')));
app.use('/img', express.static(path.resolve(__dirname, 'public/img')));
app.use('/js', express.static(path.resolve(__dirname, 'public/js')));

//Global error handler. IMP function params MUST start with err
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: 'Ups... Something went wrong!',
    });
});

// load routers
const todosRouter = require('./server/routes/todos');
app.use('/todos', todosRouter);

app.get('/', (req, res) => {
    res.render('index');
});

//listen on part
dotenv.config('.env');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'http:://localhost';
app.listen(PORT, () => console.log(`Server running on ${HOST}:${PORT}`));
