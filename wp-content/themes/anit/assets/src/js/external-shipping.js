jQuery( document ).ready( function ( $ ) {
	// Show address fields when checkbox is checked
	$( '.input-checkbox' ).change( function () {
		const isChecked = $( this ).is( ':checked' );
		if ( isChecked ) {
			$( this )
				.closest( '.external-shipping-fields' )
				.find( '.form-row-wide' )
				.removeClass( 'hidden' ); // Show the address fields
		} else {
			$( this )
				.closest( '.external-shipping-fields' )
				.find( '.form-row-wide:not(.external-shipping-checkbox)' )
				.addClass( 'hidden' ); // Show the address fields
		}
	} );
} );

// Checkout Page Dynamic Address
jQuery( document ).ready( function ( $ ) {
	$( document ).on(
		'change',
		'.external-shipping-fields .external-shipping-country select',
		function () {
			const country = $( this ).val();
			const stateWrapper = $( this )
				.closest( '.external-shipping-fields' )
				.find( '.external-shipping-state' );
			const stateInput = stateWrapper.find( 'select' );

			if ( country === '' ) {
				stateWrapper.hide();
			} else {
				const countries = JSON.parse(
					wc_country_select_params.countries
				);
				const states = countries[ country ];

				if ( states && ! $.isEmptyObject( states ) ) {
					let options =
						'<option value="">' +
						wc_country_select_params.i18n_select_state_text +
						'</option>';
					$.each( states, function ( key, value ) {
						options +=
							'<option value="' +
							key +
							'">' +
							value +
							'</option>';
					} );
					stateInput.html( options );
					stateWrapper.show();
				} else {
					stateInput.val( '' );
					stateWrapper.hide();
				}
			}
		}
	);
} );
