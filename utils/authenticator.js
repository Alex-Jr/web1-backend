const selectSessao = require("../database/queries/selectSessao");
const { decrypt } = require('../utils/crypto');
const { AuthorizationError } = require("../utils/errors");

module.exports = async (req) => {
  if(!req.headers) throw new AuthorizationError('Missing header in request');
  if(!req.headers.cookie) throw new AuthorizationError('Missing cookies');
  if(!req.headers.cookie.user) throw new AuthorizationError('Missing user in cookies');

  const parsed = JSON.parse(req.headers.cookie.user);
  
  const {
    token,
    id
  } = parsed;

  if(!token) throw new AuthorizationError('Missing token in user cookies'); 
  if(!id) throw new AuthorizationError('Missing id in user cookies')

  try {
    const now = new Date();
      
    const sessao = await selectSessao(id);

    if(!sessao) throw new AuthorizationError('Acesso negado');
    if(decrypt(sessao.token) !== token) throw AuthorizationError('Acesso negado');
  
    const expiry = new Date(sessao.expires);

    if(now.getTime() > expiry.getTime()) throw new AuthorizationError('Token expirado');   
    return parsed;
  } catch (err) {
    throw new AuthorizationError(err.message);
  }
}

