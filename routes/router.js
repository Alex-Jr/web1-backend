const { extname } = require('path');

const getRoutes = require('./get');
const postRoutes = require('./post');
const deleteRoutes = require('./delete');

function handlePost(req, res) {
  const path = req.url.slice(1);

  return postRoutes[path];
}

function handleGet(req, res) {
  const ext = String(extname(req.url)).toLowerCase();

  if(ext) {
    return getRoutes['files'];
  } else {
    // /usuarios?nome=123
    // usuarios?nome=123
    // ['usuarios', ['nome=123', 'a=2']]

    const [path, ...params] = req.url.slice(1).split('?');

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

    req.params = parsedParams; 

    return getRoutes[path];
  }
}

function handleDelete(req, res) {
  const path = req.url.slice(1);

  return deleteRoutes[path];
}

module.exports = (req, res) => {
  let selected;

  if(req.url === '/') req.url = '/home.html'; 

  switch(req.method) {
    case 'POST': 
      selected = handlePost(req, res); 
      break
    case 'GET':
      selected = handleGet(req, res);
      break;
    case 'DELETE':
      selected = handleDelete(req, res)
      break
    default:
      res.statusCode = 405;
      res.end('Method not Allowed');
      return;
  }

  console.log(`${req.method} ${req.url}`);

  if(!selected) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    selected(req, res);
  }
}