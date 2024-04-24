/**
 * File Case-Study view.js
 * 
 */
import "slick-carousel/slick/slick";

jQuery(function () {
  var $carousel = jQuery(".slider-for");

  $carousel.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    adaptiveHeight: true,
    asNavFor: ".slider-nav",
  });

  jQuery(".slider-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    variableWidth: false,
    arrows: false,
  });
});