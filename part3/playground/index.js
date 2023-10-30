const http = require('http')

// The code uses the createServer method of the http module to create a new web server. An event handler is registered to the server that is called every time an HTTP request is made to the server's address http://localhost:3001.
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
// bind the http server assigned to the app variable, to listen to HTTP requests sent to port 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)