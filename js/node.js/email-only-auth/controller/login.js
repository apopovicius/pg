const User = require('../db/User');
const jwt = require('jsonwebtoken');
const sendMagicLinkEmail = require('./sendEmail');

const login = async (req, res) => {
    const userEmail = req.body.email;
    //check if user exists
    const user = User.find((u) => u.email === userEmail);
    if (user != null) {
        try {
            const token = jwt.sign(
                {
                    userId: user.id,
                    name: user.name,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '30m',
                }
            );
            await sendMagicLinkEmail({ email: userEmail, token });
        } catch (error) {
            res.send('Error logging in! Please try again!');
        }
    }
    res.send('Check your email to finish logging in');
};

const verify = async (req, res) => {
    const token = req.query.token;
    if (token == null) return res.sendStatus(401);

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        const user = User.find((u) => (u.id = decodedToken.userId));
        res.send(`Authenticated as ${user.name}`);
    } catch (error) {
        res.sendStatus(401);
    }
};

module.exports = { login, verify };
