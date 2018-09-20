// JavaScript Document
(function (window) {

    let modernkode = {};

    modernkode.properties = {
        windowWidth: '',
        isMobile: false
    };

    modernkode.utils = {
        //
    };

    modernkode.environment = {

        resize: function(){
            //
        },

        init: function (){
            modernkode['ribbon'] = document.getElementById('ribbon');
            modernkode['sticky'] = modernkode['ribbon'].offsetTop;
        }
    };

    modernkode.init = function () {

        // all init here
        modernkode.environment.init();

        // // resize triggers
        // $(window).on('resize', function () {
        //
        //     var newWidth = $(window).width(),
        //         oldWidth = modernkode.properties.windowWidth;
        //
        //     if (oldWidth !== newWidth) {
        //         modernkode.properties.windowWidth = newWidth;
        //         modernkode.resize();
        //     }
        // });
        //
        // // trigger initial resize, just to be sure
        // modernkode.resize();
        // $(window).trigger('resize');
    };

    // main resize
    modernkode.resize = function () {
        modernkode.environment.resize();
    };

    modernkode.scrollEvents = function(){

        var ribbon = modernkode['ribbon'],
            header = ribbon.parentNode;

        if (window.pageYOffset > modernkode['sticky']) {
            header.classList.add("off-screen");
        } else {
            header.classList.remove("off-screen");
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