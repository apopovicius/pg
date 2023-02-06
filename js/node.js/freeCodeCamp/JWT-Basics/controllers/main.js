// check user & passwrodm from post(login)
// if exists create new JWT
// send back to front-end

const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors/index');

// setup auth so only the request with JWT can access the dashboard

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    // mongoose vvalidation OR
    // Joi pkg - for validation OR
    // check in the controller OR

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const id = new Date().getDate();
    const token = jwt.sign(
        {
            id,
            username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );

    res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your auth data, your lucky number is ${luckyNumber}`,
    });
};

module.exports = { login, dashboard };
