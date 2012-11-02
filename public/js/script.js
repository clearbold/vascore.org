$(window).load(function() {
    $('.slideshowwrapper .row > div').orbit(
    {
        fluid: '16x6',
        timer: false
    });
});

jQuery(document).ready(function($){

    var activeSlide = $('#intro');
    $.Window = $(window);
    $.Slides = $('.section');

    var slideheight = 1280;

    var eq = 0;

    /*alert('#intro: ' + $('#intro').height() + '\n' +
            '#about: ' + $('#about').height() + '\n' +
            '#expertise: ' + $('#expertise').height() + '\n' +
            '#services: ' + $('#expertise').height() + '\n' +
            '#clients: ' + $('#expertise').height() + '\n' +
            '#publications: ' + $('#expertise').height() + '\n' +
            '#contact: ' + $('#expertise').height());*/

    var destinations = [];
    destinations[0] = 0;
    destinations[1] = slideheight; // #intro
    destinations[2] = 4280; // #about
    destinations[3] = 5560; // #expertise
    destinations[4] = destinations[3] + 1680; // #services
    destinations[5] = destinations[4] + 1680; // #clients
    destinations[6] = destinations[5] + slideheight; // #publications
    destinations[7] = destinations[6] + slideheight; // #contact

    var leftover = $.Window.height() - 0;

    var bodyheight = destinations[6] + slideheight;

    var destinationslength = destinations.length;

    $.Body = $('body');
    $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;

    $('#scrolltotop').click(function(e){
        e.preventDefault();
        $.Scroll.stop().animate({scrollTop: '0px'});
    });

    if ($(this).width() < 1025) {
        if (window.location.href.indexOf('#') > 0)
            $.Scroll.stop().animate({scrollTop: $( window.location.href.slice(-1*(window.location.href.length - window.location.href.indexOf('#'))) ).position().top+'px'});
        $('div[role=navigation] a').click(function(e){
            //e.preventDefault();
            $.Scroll.stop().animate({scrollTop: $( $(this).attr('href') ).position().top+'px'});
        });
        return;
    }
    else
    {
        enhancePage();
        $( ".accordion" ).accordion({
            event: "click",
            animated: "bounceslide",
            collapsible: true,
            active: 10,
            autoHeight: false
        });
    }

    function enhancePage() {
        $.Body.height(bodyheight);
        if ( window.location.href.indexOf('#') > 0 )
        {
            requestedpage = window.location.href.slice(-1*(window.location.href.length - window.location.href.indexOf('#')));
            pageindex = $('div[role=navigation] a').index( $('div[role=navigation] a[href='+requestedpage+']') );
            $.Scroll.stop().animate({scrollTop: (destinations[pageindex+1])+'px'});
        }

        $.Window.bind('scroll', function(e) {
            pageScroll(e);
        });
        $('.logo a').click(function(e){
            $.Scroll.stop().animate({scrollTop: (destinations[0])+'px'});
        });
        $('div[role=navigation] a').click(function(e){
            linkindex = $('div[role=navigation] a').index($(this));
            $.Scroll.stop().animate({scrollTop: (destinations[linkindex+1])+'px'});
        });
    }

    function pageScroll(e) {

        var scrollTop = $(this).scrollTop();

        for (var x = -1; x < destinationslength; ++x)
        {
            if (scrollTop >= (destinations[x]+1) && scrollTop <= destinations[(x+1)])
            {
                eq = x;
                activeSlide = $.Slides.eq(x);

                break;
            }
        }

        //console.log(scrollTop);
        //console.log($(activeSlide).attr('id'));

        $(activeSlide).stop().css({
            'margin-top' : (-scrollTop + destinations[eq]) + 'px'
        });

        $.Slides.eq(eq+1).css({
            'margin-top' : '0'
        });

        //console.log($.Slides.eq(eq+1).attr('id'));

        $.Slides.slice(0,eq).each(function(i){
            $(this).css('margin-top', -(destinations[i+1]-destinations[i])+'px');
        });

        //console.log($.Slides.eq(eq+1).css('margin-top'));

        var height = $(activeSlide).height();
        var margintop = $(activeSlide).css('marginTop').replace('px', '');

        if (height - Math.abs(margintop) < (slideheight/2)){inView = eq+1;}

        $.Slides.slice(eq+1, 7).hide();
        $.Slides.eq(eq+1).show();
    }
});