const asyncWrapper = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch {
            next(error);
        }
    };
};

module.exports = asyncWrapper;
