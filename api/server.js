const bodyParser  = require('body-parser');
const express     = require('express');
const config      = require('./config');
const createError = require('./error').createError;
const createPost  = require('./post/index').createPost;

const port = process.env.PORT || config.SERVER.PORT;

const app = express();

app.use(bodyParser.json());

app.post('/post', async (req, res) => {
    response = await createPost(req.body);
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

/*
curl --header "Content-Type: application/json" --request POST --data '{"title":"test"}' http://localhost:3000/post
*/
