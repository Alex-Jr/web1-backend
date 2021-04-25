/**
 * 
 * @param {String} cookies 
 * @returns 
 */
module.exports = (cookies) => {
  // user={"id":1,"nome":"alex","email":"alex@gmail.com","senha":"123456","fone":"123456789","data_nasc":"2021-04-15T07:00:00.000Z","cpf":"98884025796"}; logged=true
  
  if(!cookies) return {};

  const cookiesArray = cookies.split('; ')
  const parsedCookies = {};
  
  if(cookiesArray.length > 0) {
    cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.split('=')
        parsedCookies[key] = value;
    });
  }
      
  return parsedCookies;
}