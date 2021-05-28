const http   = require('http');
const config = require('./config');

const port = process.env.PORT || config.SERVER.PORT;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { method, url } = req;
    const { pathname } = url.parse(req.url);

    let response;
    const routeConfig = config.SERVER.ROUTE_METHODS[pathname];
    if (!routeConfig?.methods.includes(method)) {
        res.statusCode = 400;
        response = {
            error: {
                message: `The path ${pathname} does not accept the method ${method}.`,
            },
        };
    } else {
        res.statusCode = 200;
        response = routeConfig.handler(req);
    }

    res.end(JSON.stringify(response));
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
