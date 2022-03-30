
export default class GeneralUtils{

    //static URL = 'http://www.localhost:8080';
    static URL = 'https://goapaving.ca:8080';
    //static URL = 'http://66.29.154.15:8080';

    static DATE_FORMAT_CALENDAR = 'yy-mm-dd';
    static DATE_FORMAT_MOMENT = 'YYYY-MM-DD';

    static deleteSlash(url){
        let newUrl;
        let arr = url.split(':8');
        if (!GeneralUtils.isNullOrEmpty(arr) && arr.length >0){
            if(arr[0].charAt(arr[0].length-1) === '/'){
                newUrl = arr[0].substring(0,arr[0].length-2);
            }else{
                newUrl = url;
            }
            return newUrl;
        }
    }

    static changeDecimalSeperator (str,from,to) {
        return str.replace(from,to).replace(' ','');
    }
    static formatNumber(num) {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    static numberFormatter(number){
        if (!isNaN(number) && number != "NaN" && number != 0 && number != Infinity){
            return  this.changeDecimalSeperator(number.toString(),'.',',');
            //return  this.formatNumber(this.changeDecimalSeperator(number.toString(),'.',','));
        }
    }

    static isNullOrEmpty(value) {
        return (!value || value === undefined || value === "" || value.length === 0 || JSON.stringify(value) === JSON.stringify({}));
    }

    static deleteDot(str){
            return str.replace('.','')
    }

    static arrayBufferToBase64(data) {
        if (data) {
            return Buffer.from(data, 'base64');
        }
    }

    static reloadJQuery(){
        "use strict";
        var loader = jQuery( '.preloader, .preloader-white' );
        var bgpreloader = jQuery( '.bg-preloader, .bg-preloader-white' );
        // var navigation
        var menumobile = jQuery( '#main-menu' );
        var navdefault = jQuery( '.navbar-default-white' );
        var Navactive = jQuery( "nav a" );
        var subnav = jQuery( ".subnav" );

        // start function fadeOut preloader when condition window has been load
        loader.fadeOut( 'slow', function() {
            "use strict";
            // opening slideup
            bgpreloader.fadeOut( 1500 );
            // animated transition & scroll onStep
            onStep();
            // stick navbar
            //navdefault.sticky();
            // responsive part
            if ( jQuery( window )
                .width() < 1025 ) {}
            // mobile icon
            jQuery( ".navbar-toggle" )
                .on( "click", function() {
                    let has = menumobile.hasClass("menu-show");
                    if (!has){
                        menumobile.toggleClass( 'menu-show' );
                        navdefault.toggleClass( 'fullHeight' );
                    }
                } );
        } );
    }


    static reloadJQuerySticky(){
        "use strict";
        var loader = jQuery( '.preloader, .preloader-white' );
        var bgpreloader = jQuery( '.bg-preloader, .bg-preloader-white' );
        // var navigation
        var menumobile = jQuery( '#main-menu' );
        var navdefault = jQuery( '.navbar-default-white' );
        var Navactive = jQuery( "nav a" );
        var subnav = jQuery( ".subnav" );

        // start function fadeOut preloader when condition window has been load
        loader.fadeOut( 'slow', function() {
            "use strict";
            // opening slideup
            bgpreloader.fadeOut( 1500 );
            // animated transition & scroll onStep
            onStep();
            // stick navbar
            navdefault.sticky();
            // responsive part
            if ( jQuery( window )
                .width() < 1025 ) {}
            // mobile icon
            jQuery( ".navbar-toggle" )
                .on( "click", function() {
                    let has = menumobile.hasClass("menu-show");
                    if (!has){
                        menumobile.toggleClass( 'menu-show' );
                        navdefault.toggleClass( 'fullHeight' );
                    }else{
                        if (!has){
                            menumobile.toggleClass( 'menu-show' );
                            navdefault.toggleClass( 'fullHeight' );
                        }
                    }
                } );
        } );
    }

}