const post = require('./post/index');

const config = {
    SERVER: {
        PORT         : 3000,
        ROUTE_METHODS: {
            '/post': {
                methods: ['POST'],
                handler: post.createPost,
            },
        },
    },
};

module.exports = config;
