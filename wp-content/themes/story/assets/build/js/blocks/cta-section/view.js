/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/js/blocks/cta-section/view.js ***!
  \*******************************************/
/**
 * File CTA view.js
 *
 */

(function ($) {
  'use strict';

  jQuery(document).ready(function ($) {
    $('.media-video__playbtn').on('click', function () {
      $('.video-popup').addClass('show-popup');
    });
    $('.close-popup-section').on('click', function () {
      $('.video-popup').removeClass('show-popup');
      $('.video-one').get(0).pause();
    });
  });
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map