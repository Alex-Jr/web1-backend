module.exports = (req, res, body) => {
    console.log('Rota post cadastro chamada')
    console.log(body);
    res.end('ok');
}