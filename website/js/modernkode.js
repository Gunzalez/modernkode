// JavaScript Document
(function (window) {

    var modernkode = {};
    window.modernkode = modernkode;

    modernkode.utils = {

        isValidEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        stopRKey:function () {
            var evt = (evt) ? evt : ((event) ? event : null);
            var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
            if ((evt.keyCode === 13) && (node.type ==="text"))  {return false;}
        },

        postAjax: function postAjax(url, data, success) {
            var params = typeof data === 'string' ? data : Object.keys(data).map(
                function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
            ).join('&');

            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            xhr.open('POST', url);
            xhr.onreadystatechange = function() {
                if (xhr.readyState>3 && xhr.status===200) { success(xhr.responseText); }
            };
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
            return xhr;
        }
    };

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

            // stops ENTER/RETURN key from submitting form
            document.onkeypress = modernkode.utils.stopRKey;
        }
    };

    modernkode.contact = {

        els: {
            form: document.querySelector('#contact-form')
        },
        
        vals: {
            error: false,
            data: {}
        },

        init: function () {
            modernkode.contact.els.form.onsubmit = function(evt){

                evt.preventDefault();
                modernkode.contact.vals.error = false;

                // all field required
                modernkode.contact.vals.error = this['name'].value.length === 0 || this['email'].value.length === 0 || this['message'].value.length === 0;

                // valid email required
                modernkode.contact.vals.error = !modernkode.utils.isValidEmail(this['email'].value);

                // if no errors submit form via ajax
                if(!modernkode.contact.vals.error){
                    modernkode.contact.els.form.querySelectorAll('.fields')[0].classList.add('display-none');
                    modernkode.contact.els.form.querySelectorAll('.thanks')[0].classList.remove('display-none');

                    modernkode.contact.vals.data = Object.assign({}, {
                        name: this['name'].value,
                        email: this['email'].value,
                        message: this['message'].value,
                        kode: this['kode'].value
                    });
                    //
                    // console.log(this.action);
                    // console.log(modernkode.contact.vals.data);


                    // example request
                    //modernkode.utils.postAjax('http://foo.bar/', 'p1=1&p2=Hello+World', function(data){ console.log(data); });

                    // example request with data object
                    // modernkode.utils.postAjax('http://foo.bar/', { p1: 1, p2: 'Hello World' }, function(data){ console.log(data); });



                    modernkode.utils.postAjax(this.action, JSON.stringify(modernkode.contact.vals.data), function(data){
                        console.log(data);
                    });
                }
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