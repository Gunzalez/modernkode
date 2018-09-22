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
                modernkode.desktopTrigger.parentNode.classList.toggle('off');
                document.querySelector('#controlled').classList.toggle('off');
            };

            // apps border fun
            modernkode.interval = setInterval(function () {
                var apps = document.querySelectorAll('.apps');
                apps[ Math.floor(Math.random()*3) ].setAttribute('data-bg', Math.floor(Math.random()*2)+1 );
            }, 2000);

            // app image swapper
            var buttons = document.querySelectorAll('.app');
            buttons.forEach(function (button) {
                button.onclick = function (e) {
                    e.preventDefault();
                    if(!button.classList.contains('active')){

                        var links = button.parentNode.getElementsByTagName('a');
                        for(var x=0; x<links.length; x++){
                            links[x].classList.remove('active');
                        }
                        button.classList.add('active');
                        document.querySelector('#' + e.target.getAttribute('data-target')).src = e.target.href;
                    }
                };
            });
        }
    };

    // main init
    modernkode.init = function () { // all init here
        modernkode.environment.init();
    };

    // main scroll
    modernkode.scrollEvents = function(){ // all scroll here
        if (window.pageYOffset > modernkode.sticky) {
            modernkode.ribbon.parentNode.classList.add("off-screen");
        } else {
            modernkode.ribbon.parentNode.classList.remove("off-screen");
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