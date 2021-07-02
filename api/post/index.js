const createError = require('../error').createError;
const redisHelper = require('../redis-helper');

const validatePost = (postInfo) => {
    if (!postInfo.title || !postInfo.title.trim()) {
        return createError('The title field is missing and it is required.');
    }
};

const createPost = async (postInfo) => {
    const error = validatePost(postInfo);
    if (error) {
        return error;
    }

    const result = await redisHelper.push(postInfo);
    return result;
};

const getPost = async (postId) => {
    const result = await redisHelper.get(postId);
    return result || {};
};

module.exports = {
    createPost,
    getPost,
};
