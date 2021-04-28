const fs = require('fs');
const { extname } = require('path');

const authenticator = require('../../utils/authenticator');
const foldersByExt = require('../../utils/foldersByExt');
const mimeTypes = require('../../utils/mimeTypes');

const protected = ['/home.html', '/perfil.html'];
const notProtected = ['/cadastro.html', '/login.html']

module.exports = async (req, res) => {
  if(protected.includes(req.url)) {
    try {
      await authenticator(req);
    } catch(err) {
      if(err.name = 'AuthenticatorError') {
        console.log('Não authorizado');
        req.url = `/login.html`;
      }
    }
  }

  if(notProtected.includes(req.url)) {
    try {
      await authenticator(req);

      // if this code runs it means the user has an active session;
      req.url = `/home.html`;
    } catch(err) {
      console.log('.....');
      // if authenticator throws error it means user is not logged;
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