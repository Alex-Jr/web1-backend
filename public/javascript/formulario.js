window.addEventListener('load', function () {
    const element = document.getElementById('formulario');
    if (element.addEventListener) {
        element.addEventListener("submit", function(evt) {
            evt.preventDefault();
            // window.history.back();
        }, true);
    }
    else {
        element.attachEvent('onsubmit', function(evt){
            evt.preventDefault();
            // window.history.back();
        });
    }
})

function resetar () {
    document.getElementById("formulario").reset(); 
}