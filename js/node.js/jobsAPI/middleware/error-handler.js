const { StatusCodes } = require('http-status-codes');

const errorHandlerMW = (err, req, res, next) => {
    let customError = {
        //set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later...',
    };

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please chose an other value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMW;
