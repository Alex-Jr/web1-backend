//  check if user is logged >
if(Object.fromEntries(document.cookie.split('; ').map(x => x.split('='))).logged === 'true') {  
    window.location.assign("/home.html");
}
