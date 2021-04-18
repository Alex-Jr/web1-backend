//  check if user is logged >
const cookies = Object.fromEntries(document.cookie.split('; ').map(x => x.split('=')));

if(cookies.logged === 'false') {  
    window.location.assign("/login.html");
}

function logout() {
  document.cookie = 'logged=false';
  document.cookie = 'user=false';
  window.location.assign("/login.html");
} 