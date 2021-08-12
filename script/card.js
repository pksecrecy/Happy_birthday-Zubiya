(function() {
    function $(id) {
        return document.getElementById(id);
    }

    var card = $('card'),
        hbd = $('hbd'),
        openB = $('open'),
        closeB = $('close'),
        timer = null;
    openB.addEventListener('click', function() {
        card.setAttribute('class', 'open-half');
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
            card.setAttribute('class', 'open-fully');
            hbd.setAttribute('class', 'display');
            timer = null;
        }, 1000);
    });

    closeB.addEventListener('click', function() {
        card.setAttribute('class', 'close-half');
        if (timer) clearTimerout(timer);
        timer = setTimeout(function() {
            card.setAttribute('class', '');
            hbd.setAttribute('class', '');
            timer = null;
        }, 1000);
    });

}());