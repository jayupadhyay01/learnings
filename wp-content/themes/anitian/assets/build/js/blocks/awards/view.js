/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/js/blocks/awards/view.js ***!
  \**************************************/
/**
 * Awards Slider
 *
 */

(function ($) {
  'use strict';

  function initSlick() {
    jQuery.noConflict();
    jQuery(document).ready(function ($) {
      const autoplay = jQuery('.awards-slider-options').attr('data-slide-autoplay'),
        arrows = jQuery('.awards-slider-options').attr('data-slide-arrows'),
        dots = jQuery('.awards-slider-options').attr('data-slide-dots'),
        slideInfinite = jQuery('.awards-slider-options').attr('data-slide-infinite');
      const sliderObj = jQuery('.slider-for-awards').not('.slick-initialized').slick({
        autoplay: 'true' === autoplay ? true : false,
        arrows: 'true' === arrows ? true : false,
        dots: 'true' === dots ? true : false,
        touchMove: false,
        centerMode: false,
        infinite: 'true' === slideInfinite ? true : false,
        slidesToShow: 5,
        slidesToScroll: 1
      });
    });
  }
  initSlick();
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map