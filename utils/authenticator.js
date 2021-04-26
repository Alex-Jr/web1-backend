const selectSessao = require("../database/queries/selectSessao")
const { AuthorizationError } = require("../utils/errors");

module.exports = async (token) => {
  if(!token) throw new AuthorizationError('Missing token');
  try {
    const now = new Date();
      
    const sessao = await selectSessao(token);
  
    const expiry = new Date(sessao.expires);

    if(now.getTime() > expiry.getTime()) throw new AuthorizationError('Token expirado');   
  } catch (err) {
    throw new AuthorizationError(err.message);
  }
}

