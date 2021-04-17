window.addEventListener('load', function () {
    const element = document.getElementById('conteudo');
    if (element.addEventListener) {
        element.addEventListener("submit", function(evt) {
            evt.preventDefault();
            window.history.back();
        }, true);
    }
    else {
        element.attachEvent('onsubmit', function(evt){
            evt.preventDefault();
            window.history.back();
        });
    }
})