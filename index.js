require('dotenv').config()
const http = require('http');
const path = require('path');
const { parse } = require('querystring');

const sendFile = require('./utils/sendFile');
const mimeTypes = require('./utils/mimeTypes');
const foldersByExt = require('./utils/foldersByExt');

const postRoutes = require('./routes/post');
const getRoutes = require('./routes/get');
const deleteRoutes = require('./routes/delete');

const database = require('./database/setup');
const parseCookie = require('./utils/parseCookie');

const server = http.createServer((req, res) => {
  req.headers.cookie = parseCookie(req.headers.cookie);

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

    if(extname) {
      const filePath = `public/${foldersByExt[extname]}${req.url}`
    
      const contentType = mimeTypes[extname] || 'application/octet-stream';
    
      sendFile(req, res, filePath, contentType);

    } else {
      // /usuarios?nome=123
      // usuarios?nome=123
      // ['usuarios', ['nome=123', 'a=2']]

      const [url, ...params] = req.url.slice(1).split('?');

      const parsedParams = {};  
      
      if(params.length > 0) {
        params.forEach(param => {
          // 'nome=123'
          // [nome, 123]

          const [key, value] = param.split('=')

          // parsedParams.nome = 123  
          parsedParams[key] = value;
        });
      }

      getRoutes[url](req, res, parsedParams);
    }

  } else if (req.method === 'DELETE' ) {
    deleteRoutes[req.url.slice(1)](req, res);
  }

});

server.listen(8080, 'localhost', () => {
  database.connect();
  console.log('Server running at http://localhost:8080');
})
