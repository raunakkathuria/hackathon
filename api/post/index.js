const redisClient = require('../redis-helper');

const validatePost = (req) => {

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
