//  check if user is logged >
const cookies = Object.fromEntries(document.cookie.split('; ').map(x => x.split('=')));

if(cookies.logged === 'true') {  
  window.location.assign("/home.html");
}