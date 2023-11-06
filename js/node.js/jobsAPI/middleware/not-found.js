const { StatusCodes } = require('http-status-codes');
const notFound = (req, res) =>
    res.status(StatusCodes.NOT_FOUND).send('<h1>Route does not exist</h1>');

module.exports = notFound;
