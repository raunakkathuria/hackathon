const http   = require('http');
const config = require('./config');

const port = process.env.PORT || config.SERVER.PORT;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { method, url } = req;

    if (!config.SERVER.ROUTE_METHODS[url].includes(method)) {
        res.statusCode = 400;
        res.end(JSON.stringify({
            error: {
                message: `The path ${url} does not accept the method ${method}.`,
            },
        }));
    } else {
        res.statusCode = 200;
        res.end(JSON.stringify());
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
