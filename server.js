const express = require('express');
const userRouter = require('./users/userRouter');
const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//CUSTOM MIDDLEWARE

function logger(req, res, next) {
  console.log(
    `${req.method} request from ${req.url} at ${new Date().toISOString()}`,
    );
    next();
}


module.exports = server;
