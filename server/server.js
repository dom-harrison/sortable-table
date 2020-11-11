const express = require('express');
const path = require('path');
const api = require('./api');
const server = express();

server.use(express.static(path.join(__dirname, '..','public')));
server.use('/api', api);

module.exports = server;