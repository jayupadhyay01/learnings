/**
 * Partners Logo Slider
 *
 */

( function ( $ ) {
	'use strict';

	function initSlick() {
		jQuery.noConflict();
		jQuery( document ).ready( function ( $ ) {
			const autoplay = jQuery( '.partners-slider-options' ).attr(
					'data-slide-autoplay'
				),
				arrows = jQuery( '.partners-slider-options' ).attr(
					'data-slide-arrows'
				),
				dots = jQuery( '.partners-slider-options' ).attr(
					'data-slide-dots'
				),
				slideInfinite = jQuery( '.partners-slider-options' ).attr(
					'data-slide-infinite'
				);

			const sliderObj = jQuery( '.slider-for-partners' )
				.not( '.slick-initialized' )
				.slick( {
					autoplay: 'true' === autoplay ? true : false,
					arrows: 'true' === arrows ? true : false,
					dots: 'true' === dots ? true : false,
					touchMove: false,
					centerMode: false,
					infinite: 'true' === slideInfinite ? true : false,
					slidesToShow: 6,
					slidesToScroll: 1,
				} );
		} );
	}

	initSlick();
} )( jQuery );
