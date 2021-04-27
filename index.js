require('dotenv').config();

const http = require('http');
const { parse } = require('querystring');

const database = require('./database/setup');

const parseCookie = require('./utils/parseCookie');

const router = require('./routes/router');

const server = http.createServer((req, res) => {
  req.url = decodeURIComponent(req.url);

  req.headers.cookie = parseCookie(req.headers.cookie);

  // body parser
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
      body = parse(body);
  
      req.body = body;
      router(req, res);
  });
});

server.listen(8080, 'localhost', () => {
  database.connect();
  console.log('Server running at http://localhost:8080');
})