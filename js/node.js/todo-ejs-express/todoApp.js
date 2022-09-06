const express = require('express');
const { connect } = require('./models/todo');
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// routes
app.use(require('./routes/index'));
app.use(require('./routes/addTodo'));

// server configs

app.listen(3000, () => console.log(`Server listening on port: 3000`));
