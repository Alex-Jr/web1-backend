//  check if user is logged >
if(Object.fromEntries(document.cookie.split('; ').map(x => x.split('='))).logged === 'false') {  
    window.location.assign("/login.html");
}

function logout() {
  document.cookie = 'logged=false';
  document.cookie = 'user=false';
  window.location.assign("/login.html");
} 