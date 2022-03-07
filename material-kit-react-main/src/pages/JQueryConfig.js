
export function JQueryConfig() {
// HTML document is loaded

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
                menumobile.toggleClass( 'menu-show' );
                navdefault.toggleClass( 'fullHeight' );
            } );
    } );
    // end function


// HTML document is loaded end
}