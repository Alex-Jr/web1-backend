//  check if user is logged >
const cookies = Object.fromEntries(document.cookie.split('; ').map(x => x.split('=')));

function logout() {
  document.cookie = 'user=false';
  window.location.assign("/login.html");
} 