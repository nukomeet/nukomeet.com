// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');

// When DOM is fully loaded
jQuery(document).ready(function($) {

    /* ---------------------------------------------------------------------- */
    /*  Custom Functions
    /* ---------------------------------------------------------------------- */

    // Fixed scrollHorz effect
    $.fn.cycle.transitions.fixedScrollHorz = function($cont, $slides, opts) {

        $('.image-gallery-slider-nav a').on('click', function(e) {
            $cont.data('dir', '')
            if( e.target.className.indexOf('prev') > -1 ) $cont.data('dir', 'prev');
        });

        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = 0-w;

        if( $cont.data('dir') === 'prev' ) {
            opts.cssBefore.left = -w;
            opts.animOut.left = w;
        }

    };

    // Slide effects for #portfolio-items-filter
    $.fn.slideHorzShow = function( speed, easing, callback ) { this.animate( { marginLeft : 'show', marginRight : 'show', paddingLeft : 'show', paddingRight : 'show', width : 'show' }, speed, easing, callback ); };
    $.fn.slideHorzHide = function( speed, easing, callback ) { this.animate( { marginLeft : 'hide', marginRight : 'hide', paddingLeft : 'hide', paddingRight : 'hide', width : 'hide' }, speed, easing, callback ); };

    /* end Custom Functions */

    /* ---------------------------------------------------------------------- */
    /*  Detect touch device
    /* ---------------------------------------------------------------------- */

    (function() {

        if( Modernizr.touch )
            $('body').addClass('touch-device');

    })();

    /* end Detect touch device */

    /* ---------------------------------------------------------------------- */
    /*  Main Navigation
    /* ---------------------------------------------------------------------- */

    (function() {

        var $mainNav    = $('#main-nav').children('ul'),
            optionsList = '<option value="" selected>Navigate...</option>';

        // Regular nav
        $mainNav.on('mouseenter', 'li', function() {
            var $this    = $(this),
                $subMenu = $this.children('ul');
            if( $subMenu.length ) $this.addClass('hover');
            $subMenu.hide().stop(true, true).fadeIn(200);
        }).on('mouseleave', 'li', function() {
            $(this).removeClass('hover').children('ul').stop(true, true).fadeOut(50);
        });

        // Responsive nav
        $mainNav.find('li').each(function() {
            var $this   = $(this),
                $anchor = $this.children('a'),
                depth   = $this.parents('ul').length - 1,
                anchorHref = $anchor.attr('href'),
                indent  = '';

            if( depth ) {
                while( depth > 0 ) {
                    indent += ' - ';
                    depth--;
                }
            }

            if (anchorHref) {
              optionsList += '<option value="' + anchorHref + '">' + indent + ' ' + $anchor.text() + '</option>';
            }
        }).end()
          .after('<select class="responsive-nav">' + optionsList + '</select>');

        $('.responsive-nav').on('change', function() {
            window.location = $(this).val();
        });

    })();

    /* end Main Navigation */

    /* ---------------------------------------------------------------------- */
    /*  Min-height
    /* ---------------------------------------------------------------------- */

    (function() {

        // Set minimum height so footer will stay at the bottom of the window, even if there isn't enough content
        function setMinHeight() {

            $('#content').css('min-height',
                $(window).outerHeight(true)
                - ( $('body').outerHeight(true)
                - $('body').height() )
                - $('#header').outerHeight(true)
                - ( $('#content').outerHeight(true) - $('#content').height() )
                + ( $('.page-title').length ? Math.abs( parseInt( $('.page-title').css('margin-top') ) ) : 0 )
                - $('#footer').outerHeight(true)
                - $('#footer-bottom').outerHeight(true)
            );

        }

        // Init
        setMinHeight();

        // Window resize
        $(window).on('resize', function() {

            var timer = window.setTimeout( function() {
                window.clearTimeout( timer );
                setMinHeight();
            }, 30 );

        });

    })();

    /* end Min-height */

    /* ---------------------------------------------------------------------- */
    /*  Image Gallery Slider
    /* ---------------------------------------------------------------------- */

    (function() {

        var $slider = $('.image-gallery-slider > ul');

        if( $slider.length ) {

            // Run slider when all images are fully loaded
            $(window).load(function() {

                $slider.each(function(i) {
                    var $this = $(this);

                    $this.css('height', $this.children('li:first').height() )
                         .after('<div class="image-gallery-slider-nav"> <a class="prev image-gallery-slider-nav-prev-' + i + '">Prev</a> <a class="next image-gallery-slider-nav-next-' + i + '">Next</a> </div>')
                         .cycle({
                             before: function(curr, next, opts) {
                                 var $this = $(this);
                                 // set the container's height to that of the current slide
                                 $this.parent().stop().animate({ height: $this.height() }, opts.speed);
                             },
                             containerResize : false,
                             easing          : 'easeInOutExpo',
                             fx              : 'fixedScrollHorz',
                             fit             : true,
                             next            : '.image-gallery-slider-nav-next-' + i,
                             pause           : true,
                             prev            : '.image-gallery-slider-nav-prev-' + i,
                             slideExpr       : 'li',
                             slideResize     : true,
                             speed           : 600,
                             timeout         : 0,
                             width           : '100%'
                         })
                         .data( 'slideCount', $slider.children('li').length );

                });

                // Position nav
                var $arrowNav = $('.image-gallery-slider-nav a');
                $arrowNav.css('margin-top', - $arrowNav.height() / 2 );

                // Pause on nav hover
                $('.image-gallery-slider-nav a').on('mouseenter', function() {
                    $(this).parent().prev().cycle('pause');
                }).on('mouseleave', function() {
                    $(this).parent().prev().cycle('resume');
                })

                // Hide navigation if only a single slide
                if( $slider.data('slideCount') <= 1 )
                    $slider.next('.image-gallery-slider-nav').hide();

            });

            // Resize
            $(window).on('resize', function() {

                $slider.each(function() {

                    var $this = $(this);

                    $this.css('height', $this.children('li:visible').height() );

                });

            });

            // Detect swipe gestures support
            if( Modernizr.touch ) {

                function swipeFunc( e, dir ) {

                    var $slider = $( e.currentTarget );

                    // Enable swipes if more than one slide
                    if( $slider.data('slideCount') > 1 ) {

                        $slider.data('dir', '');

                        if( dir === 'left' )
                            $slider.cycle('next');

                        if( dir === 'right' ) {
                            $slider.data('dir', 'prev')
                            $slider.cycle('prev');
                        }

                    }

                }

                $slider.swipe({
                    swipeLeft       : swipeFunc,
                    swipeRight      : swipeFunc,
                    allowPageScroll : 'auto'
                });

            }

        }

    })();

    /* end Image Gallery Slider */

    /* ---------------------------------------------------------------------- */
    /*  Portfolio Filter
    /* ---------------------------------------------------------------------- */

    (function() {

        var $container = $('#portfolio-items');

        if( $container.length ) {

            var $itemsFilter = $('#portfolio-items-filter'),
                mouseOver;

            // Copy categories to item classes
            $('article', $container).each(function(i) {
                var $this = $(this);
                $this.addClass( $this.attr('data-categories') );
            });

            // Run Isotope when all images are fully loaded
            $(window).on('load', function() {

                $container.isotope({
                    itemSelector : 'article',
                    layoutMode   : 'fitRows'
                });

            });

            // Filter projects
            $itemsFilter.on('click', 'a', function(e) {
                var $this         = $(this),
                    currentOption = $this.attr('data-categories');

                $itemsFilter.find('a').removeClass('active');
                $this.addClass('active');

                if( currentOption ) {
                    if( currentOption !== '*' ) currentOption = currentOption.replace(currentOption, '.' + currentOption)
                    $container.isotope({ filter : currentOption });
                }

                e.preventDefault();
            });

            $itemsFilter.find('a').first().addClass('active');
            $itemsFilter.find('a').not('.active').hide();

            // On mouseover (hover)
            $itemsFilter.on('mouseenter', function() {
                var $this = $(this);

                clearTimeout( mouseOver );

                // Wait 100ms before animating to prevent unnecessary flickering
                mouseOver = setTimeout( function() {
                    if( $(window).width() >= 960 )
                        $this.find('li a').stop(true, true).slideHorzShow(300);
                }, 100);
            }).on('mouseleave', function() {
                clearTimeout( mouseOver );

                if( $(window).width() >= 960 )
                    $(this).find('li a').not('.active').stop(true, true).slideHorzHide(150);
            });

        }

    })();

    /* end Portfolio Filter */

    /* ---------------------------------------------------------------------- */
    /*  UItoTop (Back to Top)
    /* ---------------------------------------------------------------------- */

    (function() {

        var settings = {
                button      : '#back-to-top',
                text        : 'Back to Top',
                min         : 200,
                fadeIn      : 400,
                fadeOut     : 400,
                scrollSpeed : 800,
                easingType  : 'easeInOutExpo'
            },
            oldiOS     = false,
            oldAndroid = false;

        // Detect if older iOS device, which doesn't support fixed position
        if( /(iPhone|iPod|iPad)\sOS\s[0-4][_\d]+/i.test(navigator.userAgent) )
            oldiOS = true;

        // Detect if older Android device, which doesn't support fixed position
        if( /Android\s+([0-2][\.\d]+)/i.test(navigator.userAgent) )
            oldAndroid = true;

        $('body').append('<a href="#" id="' + settings.button.substring(1) + '" title="' + settings.text + '">' + settings.text + '</a>');

        $( settings.button ).click(function( e ){
                $('html, body').animate({ scrollTop : 0 }, settings.scrollSpeed, settings.easingType );

                e.preventDefault();
            });

        $(window).scroll(function() {
            var position = $(window).scrollTop();

            if( oldiOS || oldAndroid ) {
                $( settings.button ).css({
                    'position' : 'absolute',
                    'top'      : position + $(window).height()
                });
            }

            if ( position > settings.min )
                $( settings.button ).fadeIn( settings.fadeIn );
            else
                $( settings.button ).fadeOut( settings.fadeOut );
        });

    })();

    /* end UItoTop (Back to Top) */

});