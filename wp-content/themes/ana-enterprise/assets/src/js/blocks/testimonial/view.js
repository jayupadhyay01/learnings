/**
 * File Testimonial view.js
 * 
 */

(function ($) {
  "use strict";

  function initSlick() {
    jQuery.noConflict();
    jQuery(document).ready(function ($) {
      const autoplay = jQuery(".testimonials-slider-options").attr("data-slide-autoplay"),
        arrows = jQuery(".testimonials-slider-options").attr("data-slide-arrows"),
        dots = jQuery(".testimonials-slider-options").attr("data-slide-dots"),
        slideInfinite = jQuery(".testimonials-slider-options").attr("data-slide-infinite");

      const sliderObj = $(".slider-for-testimonials")
        .not(".slick-initialized")
        .slick({
          autoplay: "true" === autoplay ? true : false,
          arrows: "true" === arrows ? true : false,
          dots: "true" === dots ? true : false,
          touchMove: false,
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