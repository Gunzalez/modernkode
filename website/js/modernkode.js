// JavaScript Document
(function (window) {

    let modernkode = {};

    window['modernkode'] = modernkode;
    console.log(window);

    modernkode.properties = {
        windowWidth: '',
        isMobile: false
    };

    modernkode.utils = {


    };

    modernkode.environment = {

        resize: function(){

        },

        init: function (){

        }
    };

    modernkode.init = function () {

        // all init here
        modernkode.environment.init();
        modernkode.navigation.init();

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

    // main init
    // $(document).ready(function () {
    //     modernkode.init();
    //     $(window).scroll(function (event) {
    //         //modernkode.scrollEvents();
    //     });
    // });

}(window));