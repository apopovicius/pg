const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
    username,
    email,
    verificationToken,
    origin,
}) => {
    const verifyEmailUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
    const message = `<p>Please confirm the email by clicking on the following link: <a href=${verifyEmailUrl}>Verify email!</a></p>`;
    return sendEmail({
        to: email,
        subject: 'Email confirmation 🗸',
        html: `<h4>Hello ${username},</h4>
        ${message}
        `,
    });
};

module.exports = sendVerificationEmail;
