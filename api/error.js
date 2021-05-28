const createError = (errorMessage, errorCode) => ({
    error: {
        message: errorMessage,
    },
});

module.exports = {
    createError,
};
