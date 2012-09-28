jQuery(document).ready(function($){

    var activeSlide = $('#intro');
    $.Window = $(window);
    $.Slides = $('.section');

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
    destinations[1] = 1280; // #intro
    destinations[2] = 4280; // #about
    destinations[3] = 5560; // #expertise
    destinations[4] = destinations[3] + 2200; // #services
    destinations[5] = destinations[4] + 1280; // #clients
    destinations[6] = destinations[5] + 1280; // #publications
    destinations[7] = destinations[6] + 1280; // #contact

    var leftover = $.Window.height() - 0;

    var bodyheight = destinations[6] + leftover;

    $.Body = $('body');

    $.Body.height(bodyheight);

    $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;

    var destinationslength = destinations.length;

    $.Window.bind('scroll', function(e) {
        pageScroll(e);
    })

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

        if (height - Math.abs(margintop) < 500){inView = eq+1;}

        $.Slides.slice(eq+1, 7).hide();
        $.Slides.eq(eq+1).show();
    }
});