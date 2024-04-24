/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************************!*\
  !*** ./src/js/blocks/counter/view.js ***!
  \***************************************/
/**
 * File backstory.js.
 */
(function ($) {
  "use strict";

  var $window = $(window);
  function check_if_in_view() {
    $(".wp-block-storyful-counter .counter_num").each(function () {
      if ($(this).hasClass("start")) {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          $(this).removeClass("start");
          $(".counter_num").text();
          var myNumbers = $(this).text();
          if (myNumbers == Math.floor(myNumbers)) {
            $(this).animate({
              Counter: $(this).text()
            }, {
              duration: 2800,
              easing: "swing",
              step: function (now) {
                $(this).text(Math.ceil(now));
              }
            });
          } else {
            if (isNaN(Math.floor(myNumbers))) {} else {
              $(this).animate({
                Counter: $(this).text()
              }, {
                duration: 2800,
                easing: "swing",
                step: function (now) {
                  $(this).text(now.toFixed(1));
                }
              });
            }
          }
        }
      }
    });
  }
  $window.on("scroll", check_if_in_view);
  $window.on("load", check_if_in_view);
})(jQuery);
/******/ })()
;
//# sourceMappingURL=view.js.map