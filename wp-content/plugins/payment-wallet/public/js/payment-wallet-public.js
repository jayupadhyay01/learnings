jQuery(document).ready(function($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	$(document).on('click','#payButton', function(e) {
		e.preventDefault();
		var publish_key = $('#publish_key').val();
		var stripe = Stripe(publish_key); // test publishable API key

		var amount = $('#amount').val();
		
		if (amount == '' || amount < 1) {
			alert('Please enter valid number!');
			return false;
		}

		var formData = new FormData(document.getElementById("balance-form"));
		formData.append("action", 'submit_wallet_payment');
		
		$.ajax({
			type: 'post',
			url: myAjax.ajax_url,
			data: formData,
			contentType: false,
			processData: false,
			success: function (response) {
				var responseArray = JSON.parse(response);

				$('.card-form').addClass('form-show');
				$('.card-form').empty();
				$('.card-form').append(responseArray.response); // phpcs:ignore

				$('#myModal').modal({backdrop: 'static', keyboard: false},'show');

				const options = {
					clientSecret: responseArray.clientSecret,
				};
				
				const elements = stripe.elements(options);

				const linkAuthenticationElement = elements.create("linkAuthentication");
				linkAuthenticationElement.mount("#payment-authentication");

				const cardElement = elements.create('payment', { layout: 'tabs' });

				cardElement.mount('#payment-element');
				const form = document.getElementById('payment-form');

				form.addEventListener('submit', async (event) => {
					event.preventDefault();
					const { error } = await stripe.confirmPayment({
						elements,
						confirmParams: {
							return_url: myAjax.walletSuccessUrl,
						},
					});
				});
				
			}
		});
	});

	$(document).on('click','span.close', function(e) {
		$('#myModal').modal('hide');
	});

});
