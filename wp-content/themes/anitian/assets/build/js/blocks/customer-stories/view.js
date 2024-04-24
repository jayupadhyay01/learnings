/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************************!*\
  !*** ./src/js/blocks/customer-stories/view.js ***!
  \************************************************/
/**
 * Customer Stories Slider
 *
 */

(function ($) {
  'use strict';

  function initSlick() {
    jQuery.noConflict();
    jQuery(document).ready(function ($) {
      const autoplay = jQuery('.testimonials-slider-options').attr('data-slide-autoplay'),
        arrows = jQuery('.testimonials-slider-options').attr('data-slide-arrows'),
        dots = jQuery('.testimonials-slider-options').attr('data-slide-dots'),
        slideInfinite = jQuery('.testimonials-slider-options').attr('data-slide-infinite');
      const sliderObj = jQuery('.slider-for-testimonials').not('.slick-initialized').slick({
        autoplay: 'true' === autoplay ? true : false,
        arrows: 'true' === arrows ? true : false,
        dots: 'true' === dots ? true : false,
        touchMove: false,
        centerMode: true,
        infinite: 'true' === slideInfinite ? true : false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
      jQuery('.customer__stories_bottom-arrow-next').on('click', function () {
        sliderObj.slick('slickNext');
      });
      jQuery('.customer__stories_bottom-arrow-prev').on('click', function () {
        sliderObj.slick('slickPrev');
      });
    });
  }
  initSlick();
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map