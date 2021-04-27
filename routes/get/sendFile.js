const fs = require('fs');
const { extname } = require('path');

const authenticator = require('../../utils/authenticator');
const foldersByExt = require('../../utils/foldersByExt');
const mimeTypes = require('../../utils/mimeTypes');

const protected = ['/home.html', '/perfil.html'];

module.exports = async (req, res) => {
  if(protected.includes(req.url)) {
    try {
      await authenticator(req);
    } catch(err) {
      if(err.name = 'AuthenticatorError') {
        req.url = `/login.html`;
      }
    }
  }
  
  return new Promise((resolve, rejects) => {
    const ext = String(extname(req.url)).toLowerCase();

    filePath = `public/${foldersByExt[ext]}${req.url}`
    contentType = mimeTypes[ext] || 'text/plain';

    console.log('Sending file ', filePath);

    try {
      const content = fs.readFileSync(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(content, 'utf-8');
    } catch(error) {
      if(error.code == 'ENOENT'){
        res.statusCode = 404;
        res.end('Sorry, file not found');
      }
      else {
        res.statusCode = 500;
        res.end('Internal server error');
      }
    }
    resolve();
  });
}