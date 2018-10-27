console.log("Mockup of a REST API server based on the 'json-server' package. ARCH 6502 / 8833, Fall'18");

const jsonServer = require('json-server')
const server = jsonServer.create()

const router = jsonServer.router('myDatabase.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use(router)
server.listen(8000, () => {
  console.log('JSON Server running at http://localhost:8000')
})