// JavaScript Document
(function (window) {

    var modernkode = {};
    window['modernkode'] = modernkode;

    modernkode.utils = {
        //
    };

    modernkode.environment = {
        init: function (){
            modernkode['ribbon'] = document.getElementById('ribbon');
            modernkode['sticky'] = modernkode['ribbon'].offsetTop;
        }
    };

    // main init
    modernkode.init = function () { // all init here
        modernkode.environment.init();
    };

    // main resize
    modernkode.resize = function () { // all resize here
        modernkode.environment.resize();
    };

    // main scroll
    modernkode.scrollEvents = function(){ // all scroll here
        if (window.pageYOffset > modernkode['sticky']) {
            modernkode['ribbon'].parentNode.classList.add("off-screen");
        } else {
            modernkode['ribbon'].parentNode.classList.remove("off-screen");
        }
    };

    // main init
    DomReady.ready(function() {
        modernkode.init();
        window['onscroll'] = function() {
            modernkode.scrollEvents();
        };
    });

}(window));