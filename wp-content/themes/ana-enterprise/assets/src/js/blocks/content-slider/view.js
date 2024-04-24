/**
 * Content Slider
 */
(function ($) {
    "use strict";
  
    function initSlick() {
      jQuery.noConflict();
      jQuery(document).ready(function ($) {
        const autoplay = jQuery(".content-slider-main").attr("data-slide-autoplay"),
          arrows = jQuery(".content-slider-main").attr("data-slide-arrows"),
          dots = jQuery(".content-slider-main").attr("data-slide-dots"),
          slideInfinite = jQuery(".content-slider-main").attr("data-slide-infinite");
  
        const sliderObj = $(".content-slider-main")
          .not(".slick-initialized")
          .slick({
            autoplay: "true" === autoplay ? true : false,
            arrows: "true" === arrows ? true : false,
            dots: "true" === dots ? true : false,
            touchMove: true,
            centerMode: true,
            slideInfinite: "true" === slideInfinite ? true : false,
            slideSlidesToShow: 1,
            slideSlidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ],
          });
      });
    }
  
    initSlick();
  })(jQuery);
  