// JavaScript Document
(function (window) {

    var modernkode = {};
    window.modernkode = modernkode;

    modernkode.environment = {
        init: function (){

            // sticky code
            modernkode.ribbon = document.querySelector('#ribbon');
            modernkode.sticky = modernkode.ribbon.offsetTop;

            // desktop colour/bw fun
            modernkode.desktopTrigger = document.querySelector('#control');
            modernkode.desktopTrigger.onclick = function () {
                modernkode.desktopTrigger.parentNode['classList'].toggle('off');
                document.querySelector('#controlled').classList.toggle('off');
            }

            // apps border fun

        }
    };

    // main init
    modernkode.init = function () { // all init here
        modernkode.environment.init();
    };

    // main scroll
    modernkode.scrollEvents = function(){ // all scroll here
        if (window.pageYOffset > modernkode.sticky) {
            modernkode.ribbon.parentNode['classList'].add("off-screen");
        } else {
            modernkode.ribbon.parentNode['classList'].remove("off-screen");
        }
    };

    // main init
    DomReady.ready(function() {
        modernkode.init();
        window.onscroll = function() {
            modernkode.scrollEvents()
        };
    });

}(window));