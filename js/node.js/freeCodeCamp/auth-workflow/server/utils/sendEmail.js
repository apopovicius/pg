const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerconfig');

const sendEmail = async ({ to, subject, html }) => {
    let transporter = nodemailer.createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: '"ViciuS 👻" <vicius@gmail.com>',
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;
