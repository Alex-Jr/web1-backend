const fs = require('fs');

function handlerError(error) {

}
 
function sendFile(req, res) {
    filePath = req.filePath;
    contentType = req.contentType;

    console.log('Sending file ', filePath);

    fs.readFile(filePath, (error, content) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);

        if (error) {
            if(error.code == 'ENOENT'){
                res.statusCode = 404;
                res.end('Sorry, file not found');
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

module.exports = sendFile;