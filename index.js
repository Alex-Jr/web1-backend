require('dotenv').config()
const mysql = require('mysql');
const http = require('http');
const path = require('path');

const sendFile = require('./utils/sendFile');
const mimeTypes = require('./utils/mimeTypes');
const foldersByExt = require('./utils/foldersByExt');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'web1'
});

const server = http.createServer((req, res) => {
  console.log('Requested: ', req.url);

  const extname = String(path.extname(req.url)).toLowerCase();

  const filePath = `public/${foldersByExt[extname]}${req.url}`

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  sendFile(req, res, filePath, contentType);
});

server.listen(8080, 'localhost', () => {
  db.connect();
  console.log('Server running at http://localhost:8080');
})