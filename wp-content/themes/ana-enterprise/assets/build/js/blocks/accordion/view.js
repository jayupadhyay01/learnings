/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************!*\
  !*** ./src/js/blocks/accordion/view.js ***!
  \*****************************************/
/**
 * Accordion JS
 */
jQuery(document).ready(function ($) {
  $('.accordion-description').show();
  $('.accordion-title').click(function () {
    $(this).next('.accordion-description').slideToggle();
    $(this).toggleClass('open');
  });
});

/**
 * Testimonial Slider
 */

(function ($) {
  "use strict";

  function initSlick() {
    const slideWrapper = $(".video-section .wrapper-video-section");
    jQuery.noConflict();
    jQuery(document).ready(function ($) {
      const autoplay = jQuery(".testimonial-section").attr("data-slide-autoplay"),
        arrows = jQuery(".testimonial-section").attr("data-slide-arrows"),
        dots = jQuery(".testimonial-section").attr("data-slide-dots"),
        slideInfinite = jQuery(".testimonial-section").attr("data-slide-infinite");
      const sliderObj = $(".testimonial-section").not(".slick-initialized").slick({
        autoplay: "true" === autoplay ? true : false,
        arrows: "true" === arrows ? true : false,
        dots: "true" === dots ? true : false,
        touchMove: false,
        centerMode: true,
        slideInfinite: "true" === slideInfinite ? true : false,
        slideSlidesToShow: 1,
        slideSlidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
    });
  }
  initSlick();
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map