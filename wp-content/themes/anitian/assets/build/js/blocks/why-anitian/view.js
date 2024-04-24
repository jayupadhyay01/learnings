/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/js/blocks/why-anitian/view.js ***!
  \*******************************************/
jQuery(document).ready(function ($) {
  jQuery('.why-anitian-box-title-wrapper').click(function () {
    jQuery(this).parent().find('.why-anitian-box-para').slideToggle();
    jQuery(this).toggleClass('open');
    jQuery(this).find('i.arrow').text(function (_, text) {
      return text === '▼' ? '▲' : '▼';
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map