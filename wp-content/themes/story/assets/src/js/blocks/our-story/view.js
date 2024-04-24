/**
 * File Our-Story view.js
 *
 */

( function ( $ ) {
	'use strict';

	jQuery( document ).ready( function ( $ ) {
		$( '.media-video__playbtn' ).on( 'click', function () {
			$( '.video-popup' ).addClass( 'show-popup' );
		} );

		$( '.close-popup-section' ).on( 'click', function () {
			$( '.video-popup' ).removeClass( 'show-popup' );
			$( '.video-one' ).get( 0 ).pause();
		} );
	} );
} )( jQuery );
