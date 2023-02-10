const express = require('express');
const router = express.Router();
const authenticationMW = require('../middleware/autentication');
const testUserMW = require('../middleware/testUser');

const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: 'Too many requets for this IP, please try again after 15 minutes',
    },
});

const { login, register, updateUser } = require('../controllers/auth');

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
router.patch('/updateUser', authenticationMW, testUserMW, updateUser);
module.exports = router;
