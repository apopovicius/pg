const errorHandlerMW = (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ msg: err.message });
};

module.exports = errorHandlerMW;
