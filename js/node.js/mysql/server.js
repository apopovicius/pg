require('dotenv').config();

const express = require('express');
const app = express();

//MW
app.use(express.json()); // allow  json to be parsed in req bodies

// redirect request to endpoint starting with /posts to postRoutes.js
app.use('/todos', require('./routes/todoRoutes'));

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    res.status(500).json({ message: 'Ups... Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server http://127.0.0.1:${PORT} is running`);
});
