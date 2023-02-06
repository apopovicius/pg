const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controllers/main');

const authMW = require('../middleware/auth');

router.route('/dashboard').get(authMW, dashboard);
router.route('/login').post(login);

module.exports = router;
