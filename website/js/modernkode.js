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

            // preload images
            var loadedImages = 0;
            document.querySelectorAll('.app').forEach(function (link) {
                // appImages.push(link.href);
                var img = new Image();
                img.src = link.href;
                img.onload = function(){
                    loadedImages++;
                    if (loadedImages >= document.querySelectorAll('.app').length) {
                        document.querySelectorAll('.switches').forEach(function (singleSwitch) {
                            singleSwitch.classList.remove('loading');
                        });
                    }
                };
            });

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

    modernkode.contact = {

        els: {
            form: document.querySelector('#contact-form'),
            error: false,
            data: ''
        },

        init: function () {
            modernkode.contact.els.form.onsubmit = function(evt){
                evt.preventDefault();
                if(this['name'].value.length === 0 || this['email'].value.length || this['message'].value.length){

                } else {

                }
                console.log(this['name'].value)

            };
        }
    };

    // main init
    modernkode.init = function () { // all init here
        modernkode.environment.init();
        modernkode.contact.init();
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