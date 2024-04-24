/**
 * AWS Partners Slider
 *
 */

( function ( $ ) {
	'use strict';

	function initSlick() {
		jQuery.noConflict();
		jQuery( document ).ready( function ( $ ) {
			const autoplay = jQuery( '.aws-partners__slider-main' ).attr(
					'data-slide-autoplay'
				),
				arrows = jQuery( '.aws-partners__slider-main' ).attr(
					'data-slide-arrows'
				),
				dots = jQuery( '.aws-partners__slider-main' ).attr(
					'data-slide-dots'
				),
				slideInfinite = jQuery( '.aws-partners__slider-main' ).attr(
					'data-slide-infinite'
				);

			const sliderObj = jQuery( '.aws-partners__slider-main' )
				.not( '.slick-initialized' )
				.slick( {
					autoplay: 'true' === autoplay ? true : false,
					arrows: 'true' === arrows ? true : false,
					dots: 'true' === dots ? true : false,
					touchMove: false,
					centerMode: false,
					infinite: 'true' === slideInfinite ? true : false,
					slidesToShow: 4,
					slidesToScroll: 1,
				} );
		} );
	}

	initSlick();
} )( jQuery );
