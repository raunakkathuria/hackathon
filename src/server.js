const http   = require('http');
const config = require('./config');

const port = process.env.PORT || config.SERVER_PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({}))
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
