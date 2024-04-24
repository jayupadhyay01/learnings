/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************************!*\
  !*** ./src/js/blocks/anitian-resources/view.js ***!
  \*************************************************/
/**
 * Resources Slider
 *
 * @param $
 */
(function ($) {
  'use strict';

  function initSlick() {
    jQuery.noConflict();
    jQuery(document).ready(function ($) {
      const autoplay = jQuery('.anitian-resources-slider').attr('data-slide-autoplay'),
        arrows = jQuery('.anitian-resources-slider').attr('data-slide-arrows'),
        dots = jQuery('.anitian-resources-slider').attr('data-slide-dots'),
        slideInfinite = jQuery('.anitian-resources-slider').attr('data-slide-infinite');
      const sliderObj = $('.anitian-resources-slider').not('.slick-initialized').slick({
        autoplay: 'true' === autoplay ? true : false,
        arrows: 'true' === arrows ? true : false,
        dots: 'true' === dots ? true : false,
        touchMove: true,
        centerMode: false,
        infinite: 'true' === slideInfinite ? true : false,
        slidesToShow: 3,
        slidesToScroll: 1
      });
    });
  }
  initSlick();
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map