require('dotenv').config()
const mysql = require('mysql');
const http = require('http');
const fs = require('fs');
const path = require('path');

const routes = require('./routes');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'web1'
});

const server = http.createServer((req, res) => {
  const page =  routes[req.url];

  render(req, res, page);
});

function render(req, res, page) {
  const pagesPath = path.resolve(__dirname, '/pages');

  fs.readFile("./pages/home.html", (error, content) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
  
    if (error) {
      if(error.code == 'ENOENT'){
        res.statusCode = 404;
        res.end('Sorry, page not found');
      }
      else {
        res.statusCode = 500;
        res.end('Internal server error');
      }
    }
    else {
        res.end(content, 'utf-8');
    }
  })
};

server.listen(8080, 'localhost', () => {
  db.connect();
  console.log('Server running at http://localhost:8080');
})