/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./src/js/blocks/timeline/view.js ***!
  \****************************************/
/**
 * Timeline Slider
 *
 * @param $
 */
(function ($) {
  'use strict';

  function initSlick() {
    $(document).ready(function () {
      $('.timeline-slider').slick({
        autoplay: false,
        arrows: false,
        dots: false,
        touchMove: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        centerMode: false
      });
      $('.timeline-slide-1-wrap').on('click', function () {
        $('.timeline-slider').slick('slickNext');
      });
      $('.timeline-slide-2-wrap').on('click', function () {
        $('.timeline-slider').slick('slickPrev');
      });
    });
  }
  initSlick();
})(jQuery);
document.addEventListener('DOMContentLoaded', function () {
  const timelineLineInner = document.querySelector('.wp-block-anitian-timeline .timeline-content-inner .timeline-line-inner');
  window.addEventListener('scroll', function () {
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight - viewportHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = scrollTop / scrollHeight;
    const newHeight = viewportHeight * 3.2 * scrollPercentage;
    timelineLineInner.style.height = newHeight + 'px';
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map