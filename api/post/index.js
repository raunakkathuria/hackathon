const createError = require('../error').createError;
const redisClient = require('../redis-helper');

const validatePost = (postInfo) => {
    if (!(postInfo.title.trim())) {
        return createError('The title field is missing and it is required.');
    }
};

const createPost = async (postInfo) => {
    const error = validatePost(postInfo);
    if (error) {
        return error;
    }

    const result = await redisClient.push(postInfo);
    return result;
};

module.exports = {
    createPost,
};
