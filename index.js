require('dotenv').config()
const http = require('http');
const path = require('path');
const { parse } = require('querystring');

const sendFile = require('./utils/sendFile');
const mimeTypes = require('./utils/mimeTypes');
const foldersByExt = require('./utils/foldersByExt');

const postRoutes = require('./routes/post');
const database = require('./database/setup');

const server = http.createServer((req, res) => {
  console.log('Requested: ', req.url);

  if(req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on('end', () => {
      body = parse(body);
    
      // crasha o app se a rota não existir
      postRoutes[req.url.slice(1)](req, res, body);
    });

  } else if(req.method === 'GET') {
    const extname = String(path.extname(req.url)).toLowerCase();

    const filePath = `public/${foldersByExt[extname]}${req.url}`
  
    const contentType = mimeTypes[extname] || 'application/octet-stream';
  
    sendFile(req, res, filePath, contentType);
  }
  
  
});

server.listen(8080, 'localhost', () => {
  database.connect();
  console.log('Server running at http://localhost:8080');
})
