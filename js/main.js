'use strict';

(function ($) {

    /* Smooth Scroll */

    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex', '-1');
                            $target.focus();
                        };
                    });
                }
            }
        });

    /* Scrollspy */

    $(function () {
        var lastId,
            topMenu = $(".nav"),
            topMenuHeight = topMenu.outerHeight() + 15,
            menuItems = topMenu.find("a"),
            scrollItems = menuItems.map(function () {
                var id = $(this).attr("href");
                var item = $(id);
                if (item.length) { return item; }
            });

        menuItems.click(function (e) {
            var href = $(this).attr("href"),
                offsetTop = (href === "#") ? 0 : $(href).offset().top - topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });

        $(window).scroll(function () {
            var fromTop = $(this).scrollTop() + topMenuHeight;

            var cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                menuItems
                    .parent().removeClass("nav__item--active")
                    .end().filter("[href='#" + id + "']").parent().addClass("nav__item--active");
            }
        });
    })

    /* Menu filling */

    $(window).scroll(function () {
        if ($(window).scrollTop() > $(window).height()) {
            $(".menu").toggleClass('menu--bg');
        }
    })

    /* Header slyder */
    $('.slider').slick({
        dots: true,
        arrows: false,
        speed: 400,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false
    });

    /* News slyder */
    $('.news__slider').slick({
        infinite: false,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        variableWidth: true,
        dots: true,
        dotsClass: 'news__dots',
        prevArrow: '.news__prev',
        nextArrow: '.news__next',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                slidesToShow: 1
              }
            }
          ]
    });

    /* Addidng shadow to article on hover */
    $('.article').hover(
        function () {
            $(this).css('box-shadow', '0px 0px 74px 2px rgba(255,255,255,0.75)')
        },
        function () {
            $(this).css('box-shadow', 'none')
        }
    );

    /* Adding mask to gallery item on hover */
    $('.gallery__item').hover(
        function () {
            $(this).find('.gallery__mask')
                .css({
                    'opacity': '.5',
                    'transition': 'all 0.5s ease'
                })
        },
        function () {
            $(this).find('.gallery__mask')
                .css({
                    'opacity': '0',
                    'transition': 'all 0.5s ease'
                })
        }
    );

    /* Adding MASONRY blocks */
    $('.gallery__wrapper').masonry({
        // options
        itemSelector: '.gallery__item',
        columnWidth: 1,
        gutter: 10
    });

    /* Google MAP */
    $(document).ready(function () {
        var map;
        var opt = {
            center: { lat: 40.671641, lng: -73.901750 },
            zoom: 14,
            disableDefaultUI: true,
            scrollwheel: false,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }]
                }, {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#bdbdbd"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#eeeeee"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e5e5e5"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#c9c9c9"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "visibility": "off"
                    }, {
                        "weight": 2.5
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#dadada"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                }, {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#bfbfbf"
                    }, {
                        "weight": 2.5
                    }]
                }, {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#ffffff"
                    }, {
                        "weight": 4
                    }]
                }, {
                    "featureType": "road.local",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                }, {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e5e5e5"
                    }]
                }, {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#eeeeee"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#c9c9c9"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                }
            ]
        }
        map = new google.maps.Map($('#map')[0], opt);

        var marker = new google.maps.Marker({
            position: { lat: 40.679525, lng: -73.902050 },
            map: map,
            icon: './img/Pin.svg'
        });

    });


    /* Modal Window */
    var wrap = $('.modal__cover'),
        btn = $('.contact__button'),
        modal = $('.modal__cover, .modal__window'); 

    btn.on('click', function () {
        modal.fadeIn();
    });

    //close modal
    $('.modal__cover').click(function () {
        var select = $('.modal__content');
        if ($(event.target).closest(select).length)
            return;
        modal.fadeOut();
    });
})(jQuery);