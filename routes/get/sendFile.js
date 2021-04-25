const fs = require('fs');

function handlerError(error) {

}
 
function sendFile(req, res) {
  filePath = req.filePath;
  contentType = req.contentType;

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
}

module.exports = sendFile;