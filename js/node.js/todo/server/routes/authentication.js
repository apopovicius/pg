const e = require('express');
const express = require('express');
const router = express.Router();
const users = require('../controller/usersController');

router.post('/enter', checkUser, (req, res) => {
    console.log(
        `Name: ${req.user.name} password: ${req.user.pass} and id: ${req.user.id}`
    );
    res.send(
        `Name: ${req.user.name} password: ${req.user.pass} and id: ${req.user.id}`
    );
});

async function checkUser(req, res, next) {
    const { name, password } = req.body;
    const user = await users.retrieveOrCreateUser(name, password);
    if (user != '') {
        req.user = user;
        next();
    } else {
        console.log('No user returned');
    }
}

module.exports = router;
