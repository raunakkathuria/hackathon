const http        = require('http');
const config      = require('./config');
const createError = require('./error').createError;

const port = process.env.PORT || config.SERVER.PORT;

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { method, url } = req;

    let response;
    const routeConfig = config.SERVER.ROUTE_METHODS[url];
    if (!routeConfig?.methods.includes(method)) {
        res.statusCode = 400;
        response = createError(`The path ${url} does not accept the method ${method}.`);
    } else {
        response = await routeConfig.handler(JSON.parse(req.data)); // TODO: req.data is wrong!
        res.statusCode = response.error ? 400: 200;
    }

    res.end(JSON.stringify(response));
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

/*
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"test"}' \
  http://localhost:3000/post
*/
