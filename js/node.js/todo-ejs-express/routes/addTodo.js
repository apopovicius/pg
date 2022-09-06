const router = require('express').Router();
const { addTask } = require('../models/todo');

router.post('/add', async (req, res) => {
    //const todo = req.body.todo;
    const { todo } = req.body;
    console.log(todo);
    try {
        const add = await addTask(todo);
        console.log(add);
        res.redirect('/');
    } catch (e) {
        console.log(`Exception occured: ${e}`);
    }
});

module.exports = router;
