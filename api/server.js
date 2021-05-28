const http        = require('http');
const config      = require('./config');
const createError = require('./error').createError;

const port = process.env.PORT || config.SERVER.PORT;

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { method, url } = req;
    const { pathname } = url.parse(req.url);

    let response;
    const routeConfig = config.SERVER.ROUTE_METHODS[pathname];
    if (!routeConfig?.methods.includes(method)) {
        res.statusCode = 400;
        response = createError(`The path ${pathname} does not accept the method ${method}.`);
    } else {
        response = await routeConfig.handler(JSON.parse(req.data));
        res.statusCode = response.error ? 400: 200;
    }

    res.end(JSON.stringify(response));
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
