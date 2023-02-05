const { CustomApiError } = require('../errors/custom-error');

const errorHandlerMW = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res
        .status(500)
        .json({ msg: 'Something went wrong, please try again!' });
};

module.exports = errorHandlerMW;
