const http = require('http')

const port = process.env.PORT

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      title: "Make a request with Node's http module"
    })
  )
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
