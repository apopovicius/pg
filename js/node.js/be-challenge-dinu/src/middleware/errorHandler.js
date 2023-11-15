const { CustomError } = require("./customError");

const errorHandler = (err, req, res, next) => {
  console.log("first");
  console.error(err);

  // handle specific types of errors and send appropiate message
  if (err instanceof CustomError) {
    console.log("we got here");
    return res.status(err.statusCode).json({ error: err.message });
  }

  // handle sequelize validation console.error
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  // handle other errors
  return res.status(400).json({ error: "Internal Server Error" });
};
module.exports = errorHandler;
