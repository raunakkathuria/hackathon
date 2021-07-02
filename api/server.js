const bodyParser              = require('body-parser');
const express                 = require('express');
const config                  = require('./config');
const createError             = require('./error').createError;
const { createPost, getPost } = require('./post/index');

const port = process.env.PORT || config.SERVER.PORT;

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.route('/post')
.post(async (req, res) => {
    response = await createPost(req.body);
    res.json(response);
})
.get(async (req, res) => {
    response = await getPost(req.body.postId);
    res.json(response);
})
.all((req, res, next) => {
    res.json(createError('There was an error processing your request', err));
});

// Error handler
app.use((err, req, res, next) => {
    if (err) {
        res.json(createError('There was an error processing your request', err));
    }
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

/*
curl --header "Content-Type: application/json" --request POST --data '{"title":"test"}' http://localhost:3000/post
*/
