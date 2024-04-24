/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./src/js/blocks/our-leadership/view.js ***!
  \**********************************************/
/**
 * File Our Leadership view.js
 *
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    // Add class on click
    $(document).on('click', '.leadership__author__box-item-inner', function () {
      $(this).closest('.leadership__author__box-item').find('.leadership__popup-model').addClass('open-popup');
    });

    // Remove class on click
    $(document).on('click', '.leadership__popup-model-header', function () {
      $(this).closest('.leadership__popup-model').removeClass('open-popup');
    });
  });
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map