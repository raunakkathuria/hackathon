const createError = (errorMessage, errorCode) => ({
    error: {
        message: errorMessage,
        ...(errorCode ? { code: errorCode } : {}),
    },
});

module.exports = {
    createError,
};
