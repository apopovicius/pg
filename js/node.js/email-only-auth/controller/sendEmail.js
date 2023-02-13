const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMagicLinkEmail = async ({ email, token }) => {
    return sgMail.send({
        to: email,
        from: `ViciuS from <${email}>`,
        subject: 'Finish your login',
        html: `<a href="http://localhost:3000/verify?token=${token}">Log In</a>`,
    });
};

module.exports = sendMagicLinkEmail;
