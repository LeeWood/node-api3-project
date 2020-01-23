const express = require('express');
const userRouter = require('./users/userRouter');

const server = express();

server.use('/api/users', userRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//CUSTOM MIDDLEWARE

function logger(req, res, next) {}

module.exports = server;
