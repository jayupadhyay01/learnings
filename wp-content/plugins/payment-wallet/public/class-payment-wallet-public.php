<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://https://profiles.wordpress.org/jayupadhyay01/
 * @since      1.0.0
 *
 * @package    Payment_Wallet
 * @subpackage Payment_Wallet/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Payment_Wallet
 * @subpackage Payment_Wallet/public
 * @author     Jay Upadhyay <jay.upadhyay@multidots.com>
 */
class Payment_Wallet_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of the plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Payment_Wallet_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Payment_Wallet_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/payment-wallet-public.css', array(), $this->version, 'all' );
		wp_enqueue_style( 'bootp-css', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.3/css/bootstrap.min.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Payment_Wallet_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Payment_Wallet_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_script( 'jquery-js', plugin_dir_url( __FILE__ ) . 'js/jquery.min.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( 'bootstrap-script', plugin_dir_url( __FILE__ ) . 'js/bootstrap.min.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( 'stripe-script', 'https://js.stripe.com/v3/', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/payment-wallet-public.js', array( 'jquery' ), $this->version, false );
		$wallet_success_url = wc_get_endpoint_url( 'wallet', 'success' );
		$wallet_error_url   = wc_get_endpoint_url( 'wallet', 'error' );
		wp_localize_script(
			$this->plugin_name,
			'myAjax',
			array(
				'ajax_url'         => admin_url( 'admin-ajax.php' ),
				'ajax_nonce'       => wp_create_nonce( 'fetch_nonce' ),
				'walletSuccessUrl' => $wallet_success_url,
				'walletErrorUrl'   => $wallet_error_url,
			)
		);
	}

	public function submit_wallet_payment() {

		require_once __DIR__ . '/../stripe-php-master/init.php';

		$recharge_amount = ! empty( $_POST['amount'] ) ? sanitize_text_field( $_POST['amount'] ) : '';
		$user_id         = ! empty( $_POST['user_id'] ) ? sanitize_text_field( $_POST['user_id'] ) : '';
		$response_array  = array();
		$stripe_secret   = get_option( 'secret_key' );
		if ( isset( $_POST['recharge_wallet_form_submit_field'] ) || wp_verify_nonce( sanitize_key( $_POST['recharge_wallet_form_submit_field'] ), 'recharge_wallet_form_submit' ) ) {
			$stripe = new \Stripe\StripeClient( $stripe_secret );
			ob_start();
			?>
				<form id="payment-form">
					<div id="payment-authentication"></div>
					<div id="payment-element">
						<!--Stripe.js injects the Payment Element-->
					</div>
					<button id="submit" class="form-button button"><span id="button-text">Pay now</span></button>
				</form>
			<?php
			$response_array['response']     = ob_get_contents();
			$response_array['clientSecret'] = create_payment_intent( $stripe, $recharge_amount );
			$response_array['userid']       = $user_id;
			ob_end_clean();
		}
		echo wp_json_encode( $response_array );
		die();
	}
}
