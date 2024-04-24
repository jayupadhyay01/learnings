<?php

add_filter( 'woocommerce_account_menu_items', 'wallet_page_link', 40 );
function wallet_page_link( $menu_links ) {

	$menu_links = array_slice( $menu_links, 0, 5, true )
	+ array( 'wallet' => 'Wallet' )
	+ array_slice( $menu_links, 5, null, true );

	return $menu_links;
}
// register permalink endpoint
add_action( 'init', 'wallet_add_endpoint' );
function wallet_add_endpoint() {

	add_rewrite_endpoint( 'wallet', EP_ROOT | EP_PAGES );
}

function create_payment_intent( $stripe, $recharge_amount ) {

	$paymentIntent = $stripe->paymentIntents->create(
		array(
			'amount'                    => $recharge_amount * 100,
			'currency'                  => 'inr',
			'automatic_payment_methods' => array(
				'enabled' => true,
			),
			'description'               => 'Transaction for Wallet Recharge',
		)
	);

	$result = '';
	$result = $paymentIntent->client_secret;
	return $result;
}
// Create an endpoint for the wallet
add_action( 'woocommerce_account_wallet_endpoint', 'wallet_endpoint_content' );
function wallet_endpoint_content() {
	global $current_user;
	$request_url        = ! empty( $_SERVER['REQUEST_URI'] ) ? esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';
	$current_url        = explode( '?', $request_url );
	$current_url        = get_site_url() . $current_url[0];
	$wallet_success_url = wc_get_endpoint_url( 'wallet', 'success' );

	$s_key = get_option( 'secret_key' );
	$p_key = get_option( 'publishable_key' );
	if ( $s_key !== '' && $p_key !== '' ) {
		require_once __DIR__ . '/stripe-php-master/init.php';
		$stripe = new \Stripe\StripeClient( $s_key );

		if ( $current_url === $wallet_success_url ) {
			$payment_intent_id = $stripe->paymentIntents->retrieve(
			$_GET['payment_intent'], // phpcs:ignore
				array()
			);
		  $intent = isset($_GET['payment_intent']) ? $_GET['payment_intent'] : '';// phpcs:ignore
			$intent_meta       = get_user_meta( $current_user->ID, 'intent_id', true );
			if ( $payment_intent_id->status === 'succeeded' && $intent_meta !== $intent ) {
					$order_amount = $payment_intent_id->amount / 100;
					$old_balance  = get_user_meta( $current_user->ID, 'wps_wallet', true );
					$old_balance  = $old_balance ? $old_balance : 0;
					$new_bal      = $old_balance + $order_amount;
					update_user_meta( $current_user->ID, 'wps_wallet', $new_bal );
					update_user_meta( $current_user->ID, 'intent_id', $intent );

					wc_print_notice( __( 'Wallet Recharge Successful!', 'woocommerce' ), 'success' );
			} else {
				wc_print_notice( __( 'Your recharge has been already done!', 'woocommerce' ), 'error' );
			}
		}

		$balance = get_user_meta( $current_user->ID, 'wps_wallet', true );

		$balance = $balance ? $balance : '0';

		?>
	<h2><?php echo esc_html( __( 'Wallet Balance: ', 'payment-wallet' )); echo wp_kses_post( wc_price( $balance ) ); ?></h2>
	<div id="myModal" class="modal fade" tabindex="-1">
		<div class="modal-content">
		<span class="close">&times;</span>
		<div class="card-form"></div>
		</div>
	</div>
	<form id="balance-form" name="balance-form" method="post" action="" class="balance-form">
	</br></br>
		<strong><?php echo esc_html( __( 'Enter Amount:', 'payment-wallet' )); ?></strong>
		<input type="number" name="amount" class="input-box" id="amount">
		<input type="hidden" name="user_id" value="<?php echo esc_attr( $current_user->ID ); ?>">
	</br></br>
		<input type="hidden" name="publish_key" id="publish_key" value="<?php echo esc_attr( $p_key ); ?>">

		<?php wp_nonce_field( 'recharge_wallet_form_submit', 'recharge_wallet_form_submit_field' ); ?>
		<button id="payButton"><?php echo esc_html( __( 'Add Money to Wallet', 'payment-wallet' )); ?></button>
	</form>
		<?php
	} else {
		echo '<h3>Please Enter API Credentials</h3>';
	}
}

class custom_WC_Wallet extends WC_Payment_Gateway {
	public function __construct() {
		global $current_user;
		$balance                  = get_user_meta( $current_user->ID, 'wps_wallet', true );
		$balance                  = $balance ? $balance : '0';
		$manage_link              = '<p><a href="' . home_url( '/my-account/wallet/' ) . '">Account</a></p>';
		$stripe_key_link          = '<p><a href="' . home_url( 'wp-admin/admin.php?page=stripe_keys' ) . '">Stripe Setting</a><p>';
		$this->id                 = 'wallet';
		$this->icon               = '';
		$this->has_fields         = false;
		$this->method_title       = __( 'Wallet', 'payment-wallet' );
		$this->title              = __( 'Wallet', 'payment-wallet' );
		$this->method_description = __( '<p>Have your customers pay with Wallet.</p>' . esc_url( $manage_link ) . esc_url( $stripe_key_link ) );
		$this->description       .= '<b>Available wallet balance is ' . wp_kses_post( wc_price( $balance ) ) . '</b><br/><br/>';
		$this->description       .= $this->get_option( 'description' );
		// Load the settings
		$this->init_form_fields();
		$this->init_settings();
		// Define user set variables
		$this->enabled = $this->get_option( 'enabled' );
		$this->title   = $this->get_option( 'title' );

		// Hooks
		add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
	}

	/**
	 * Check if the payment gateway is available.
	 */
	public function is_available() {
		// Check if the payment method is enabled
		if ( $this->enabled === 'yes' ) {
			// You can add more conditions here if needed
			return true;
		}

		return false;
	}

	/**
	 * Initialize Gateway Settings Form Fields
	 */
	public function init_form_fields() {
		$this->form_fields = array(
			'enabled'     => array(
				'title'   => __( 'Enable/Disable', 'payment-wallet' ),
				'type'    => 'checkbox',
				'label'   => __( 'Enable Wallet Payment', 'payment-wallet' ),
				'default' => 'yes',
			),
			'title'       => array(
				'title'       => __( 'Title', 'payment-wallet' ),
				'type'        => 'text',
				'description' => __( 'This controls the title which the user sees during checkout.', 'woocommerce' ),
				'default'     => __( 'Wallet', 'woocommerce' ),
				'desc_tip'    => true,
			),
			'description' => array(
				'title'       => __( 'Description', 'payment-wallet' ),
				'type'        => 'textarea',
				'description' => 'Your amount is deducted from your wallet.',
				'default'     => __( 'Your amount is deducted from your wallet.', 'wallet-system-for-woocommerce' ),
				'desc_tip'    => true,
			),
		);
	}
	public function process_payment( $order_id ) {
		global $woocommerce;
		$order         = new WC_Order( $order_id );
		$userid        = $order->get_user_id();
		$currnetamount = get_user_meta( $userid, 'wps_wallet', true );
		$ordertotal    = $order->get_total();
		if ( $ordertotal <= $currnetamount ) {
			$updatedamt = $currnetamount - $ordertotal;
			update_user_meta( $userid, 'wps_wallet', abs( $updatedamt ) );
			$order->update_status( 'completed', __( 'Paid by Wallet', 'woocommerce' ) );

			// Remove cart
			$woocommerce->cart->empty_cart();

			return array(
				'result'   => 'success',
				'redirect' => $this->get_return_url( $order ),
			);
		} else {
			throw new Exception( esc_html( __( 'Insufficient balance in Wallet. Please add money or try using another method!', 'payment-wallet' ) ) );
		}
	}
}
