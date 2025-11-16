const jsonServer =  require('json-server');
const path = require('path');  

const server = jsonServer.create();
const router = jsonServer.router('mock/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

//custom delay
server.use((req, res, next)=>{
setTimeout(()=> next(), 400);
});

// server.use(middlewares);
server.use(router);

const PORT = 5001; 
server.listen(PORT, ()=>{
    console.log('JSON Server is running with delay on port 5001');
});