/**
 * File Timeline view.js
 *
 * @param jQuery
 */
( function ( jQuery ) {
	'use strict';

	jQuery( document ).ready( function () {
		jQuery( '.wrapper' ).slick( {
			swipeToSlide: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: false,
			centerMode: true,
			asNavFor: '.year-nav',
			touchMove: false,
			infinite: false,
			variableWidth: false,
			swipe: false,
		} );
		jQuery( '.year-nav' ).slick( {
			swipeToSlide: false,
			slidesToShow: 6,
			slidesToScroll: 1,
			asNavFor: '.wrapper',
			dots: false,
			centerMode: true,
			focusOnSelect: true,
			touchMove: false,
			variableWidth: false,
			swipe: false,
		} );
	} );
} )( jQuery );
