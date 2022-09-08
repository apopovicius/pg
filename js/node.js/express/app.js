const express = require('express');
const app = express();

// setup view
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // this is to access the body of request for post
app.use(express.json()); // json request, fetch from server to client

//app.use(logger);
// app.get('/', (req, res) => {
//     res.render('index', { user: 'John Doe' });
// });

// setup routes
const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(3000, () =>
    console.log('Server http://127.0.0.1:3000/ is running!')
);
