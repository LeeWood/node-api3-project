const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//CUSTOM MIDDLEWARE

function logger(req, res, next) {}

module.exports = server;
