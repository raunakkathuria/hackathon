const createError = require('../error').createError;
const redisClient = require('../redis-helper');

const validatePost = (postInfo) => {
    if (!(postInfo.title.trim())) {
        return createError('The title field is missing and it is required.');
    }
};

const createPost = (postInfo) => {
    const error = validatePost(postInfo);
    if (error) {
        return error;
    }

    return redisClient.push(postInfo);
};

module.exports = {
    createPost,
};
