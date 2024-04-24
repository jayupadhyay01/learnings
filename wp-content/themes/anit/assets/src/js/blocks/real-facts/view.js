/**
 * Real Fact Click Slider
 *
 * @param $
 */

( function ( $ ) {
	'use strict';

	function initSlick() {
		$( document ).ready( function () {
			$( '.click_slider' ).slick( {
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: false,
				arrows: false,
				dots: false,
				touchMove: false,
				adaptiveHeight: true,
				centerMode: false,
			} );

			$( '.slider-1-col .real-facts-slide-2-wrap' ).on(
				'click',
				function () {
					$( this )
						.closest( '.slider-1-col' )
						.find( '.click_slider' )
						.slick( 'slickPrev' );
				}
			);
			$( '.slider-1-col .real-facts-slide-1-wrap' ).on(
				'click',
				function () {
					$( this )
						.closest( '.slider-1-col' )
						.find( '.click_slider' )
						.slick( 'slickNext' );
				}
			);

			$( document ).ready( function () {
				$( '.click_slider' ).on(
					'click',
					'.real-facts-slide-2',
					function () {
						const slickSlider =
							$( this ).closest( '.click_slider' );
						slickSlider.slick( 'slickPrev' );
					}
				);

				$( '.click_slider' ).on(
					'click',
					'.real-facts-slide-1',
					function () {
						const slickSlider =
							$( this ).closest( '.click_slider' );
						slickSlider.slick( 'slickNext' );
					}
				);
			} );
		} );
	}
	initSlick();
} )( jQuery );

/**
 * Real Fact Block Display JS
 */
jQuery( document ).ready( function ( $ ) {
	$( '.real-facts.btn-main' ).on( 'click', function () {
		const container = $( this ).closest( '.real-facts-content-inner' );
		const itemContent = container.find( '.real-facts-item-content' );
		itemContent.toggleClass( 'active' );
		$( '.click_slider' ).slick( 'refresh' );
		$( '.main-slider-wrap' ).slick( 'refresh' );
	} );
} );

/**
 * Real Fact Main Slider
 *
 * @param $
 */
( function ( $ ) {
	'use strict';

	function initSlick() {
		jQuery.noConflict();
		jQuery( document ).ready( function ( $ ) {
			const autoplay = jQuery( '.real-facts-slider-attr' ).attr(
					'data-slide-autoplay'
				),
				arrows = jQuery( '.real-facts-slider-attr' ).attr(
					'data-slide-arrows'
				),
				dots = jQuery( '.real-facts-slider-attr' ).attr(
					'data-slide-dots'
				),
				infinite = jQuery( '.real-facts-slider-attr' ).attr(
					'data-slide-infinite'
				);

			const sliderObj = $( '.main-slider-wrap' )
				.not( '.slick-initialized' )
				.slick( {
					autoplay: 'true' === autoplay ? true : false,
					arrows: 'true' === arrows ? true : false,
					dots: 'true' === dots ? true : false,
					touchMove: true,
					centerMode: false,
					infinite: 'true' === infinite ? true : false,
					slidesToShow: 1,
					slidesToScroll: 1,
				} );
		} );
	}

	initSlick();
} )( jQuery );

/**
 * Video Play Modal JS
 */
jQuery( document ).ready( function ( $ ) {
	$( '.real-facts__video-img img, .video-text' ).on( 'click', function () {
		const $modal = $( this )
			.closest( '.real-facts__video' )
			.find( '.real-facts__video-modal' );
		const $iframe = $modal.find( 'iframe' );
		$iframe.attr( 'src', $iframe.data( 'src' ) );
		const player = new Vimeo.Player( $iframe[ 0 ] );
		$modal.addClass( 'active' );
		player.play();
	} );

	$( '.close-modal' ).on( 'click', function () {
		const $modal = $( this ).closest( '.real-facts__video-modal' );
		const $iframe = $modal.find( 'iframe' );
		const player = new Vimeo.Player( $iframe[ 0 ] );
		player.unload();
		$modal.removeClass( 'active' );
	} );
} );
