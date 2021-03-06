require('dotenv').config();

const crypto = require('crypto');

// se não tiver no env irá usar os valores hardcoded
const alg = process.env.CRYPTO_ALG || 'aes-256-cbc';
const pwd = Buffer.from(process.env.CRYPTO_PWD || 'ABCDEZHIKLMNOPQRSTVXZ012345');

function crypt(texto){
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(alg, pwd, iv);
  
  const encrypted =  cipher.update(texto);

  const buffer = Buffer.concat([encrypted, cipher.final()]);

  const hash = iv.toString('hex') + ':' + buffer.toString('hex');

  return hash;
}

function decrypt(hash){
  const splited = hash.split(':');

  const iv = Buffer.from(splited.shift(), 'hex');

  const encrypted = Buffer.from(splited.join(':'), 'hex');

  const decipher = crypto.createDecipheriv(alg, pwd, iv);

  const decrypted = decipher.update(encrypted);

  const text = Buffer.concat([decrypted, decipher.final()]).toString();

  return text;
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = {
  crypt,
  decrypt,
  generateToken,
}