// @codekit-prepend "jquery-1.8.2.js", jquery-ui-1.9.1.custom.js, plugins.js";

$(window).load(function() {
    var $publicationslidenumber = $('#publicationslideshow').find('.slide').length;
    var $publicationsslidecurrentlabel = $("#publication-currentslide");
    var $publicationslidetotallabel = $("#publication-totalslides");
    $publicationslidetotallabel.html($publicationslidenumber);
    $('#publicationslideshow').find('.slides').orbit(
    {
        fluid: '16x6',
        timer: false,
        afterSlideChange: function() {
            var totalSlides = this.$slides.length;
            var currentSlide = this.activeSlide + 1;
            $publicationsslidecurrentlabel.html(currentSlide);
            $publicationslidetotallabel.html(totalSlides);
        }
    });
});

$(document).ready(function() {

    var $modaldiv = $('<div>').addClass('reveal-modal').addClass('xlarge').appendTo('body');

    /* Adding in Ajax functionality for Zurb Reveal */
    $('a.reveal').click(function(event) {
      event.preventDefault();
      var $this = $(this);
      $.get($this.attr('href'), function(data) {
        return $modaldiv.empty().html(data).append('<a class="close-reveal-modal">&#215;</a>').reveal();
      });
    });

    /* Code for in-modal links calling content into the same modal */
    $(document).on("click", ".in-reveal", function() {
        var $this = $(this);
        $.get($this.attr('href'), function(data) {
            $modaldiv.find(".modalinner").fadeTo(400, .01, function() {
                $(this).empty().html(data).fadeTo(400, 1);
            });
        });
        return false;
    })

    var activeSlide = $('#intro');
    $.Window = $(window);
    $.Slides = $('.section');
    var tooNarrow = 0;
    var howwide;

    function testWidth() {
        howwide = $.Window.width();
        if(howwide < 1025){
            tooNarrow = 1;
        } else {
            tooNarrow = 0;
        }
    }

    testWidth();

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
    //destinations[7] = destinations[6] + slideheight; // #contact
    destinations[7] = destinations[6] + slideheight;

    var leftover = $.Window.height() - 0;

    var bodyheight = destinations[6] + slideheight - 140;

    var destinationslength = destinations.length;

    var $scrolltotop = $("#scrolltotop"),
        $scrollformore = $("#scrollformore"),
        $logolink = $('.logo').find('a'),
        $navlink = $('div[role=navigation]').find('a');



    $.Body = $('body');
    $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;

    if ($(this).width() < 1025) {
        if (window.location.href.indexOf('#') > 0)
            $.Scroll.stop().animate({scrollTop: $( window.location.href.slice(-1*(window.location.href.length - window.location.href.indexOf('#'))) ).position().top+'px'});
        $navlink.click(function(e){
            //e.preventDefault();
            $.Scroll.stop().animate({scrollTop: $( $(this).attr('href') ).position().top+'px'});
        });
    };

    function testPage() {
        testWidth();
        if (tooNarrow) {
            resetPage();
            return;
        } else {
            $( ".accordion" ).accordion({
                event: "click",
                animated: true,
                collapsible: true,
                active: 10,
                autoHeight: false
            });
            enhancePage();
        }
    }

    function resetPage() {
        $.Slides.attr("style", "");
        $.Body.attr("style", "");
        $.Window.unbind('scroll');
        $logolink.unbind('click');
        $navlink.unbind('click');
        $scrolltotop.unbind('click');
        $scrollformore.unbind('click');
    }

    function enhancePage() {
        $.Body.height(bodyheight);
        if ( window.location.href.indexOf('#') > 0 )
        {
            requestedpage = window.location.href.slice(-1*(window.location.href.length - window.location.href.indexOf('#')));
            pageindex = $navlink.index( $('div[role=navigation] a[href='+requestedpage+']') );
            $.Scroll.stop().animate({scrollTop: (destinations[pageindex+1])+'px'});
        }
        $scrolltotop.click(function(e){
            e.preventDefault();
            $.Scroll.stop().animate({scrollTop: '0px'});
        });

        $scrollformore.click(function(e){
            e.preventDefault();
            $.Scroll.stop().animate({scrollTop: (destinations[1])+'px'});
        });

        $.Window.bind('scroll', function(e) {
            pageScroll(e);
        });
        $logolink.click(function(e){
            $.Scroll.stop().animate({scrollTop: (destinations[0])+'px'});
        });
        $navlink.click(function(e){
            linkindex = $navlink.index($(this));
            $.Scroll.stop().animate({scrollTop: (destinations[linkindex+1])+'px'});
        });
    }

    testPage();

    $.Window.bind('debouncedresize', function(){
        testPage();
    });

    function pageScroll(e) {

        if(tooNarrow){
            return;
        } // Don't do this if it's too narrow.

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