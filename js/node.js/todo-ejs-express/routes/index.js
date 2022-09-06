const router = require('express').Router();
const { createTable, obtainTaskList } = require('../models/todo');

// routes here
router.get('/', async (req, res) => {
    try {
        const ok = connect();
        const created = await createTable();
        console.log(created);
        const allTodos = await obtainTaskList();
        console.log(`Obtained: ${allTodos}`);
        res.render('index', { todo: allTodos });
    } catch (e) {
        console.log(`Exception ocurred: ${e}`);
    }
});

module.exports = router;
