<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://https://profiles.wordpress.org/jayupadhyay01/
 * @since      1.0.0
 *
 * @package    Payment_Wallet
 * @subpackage Payment_Wallet/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Payment_Wallet
 * @subpackage Payment_Wallet/admin
 * @author     Jay Upadhyay <jay.upadhyay@multidots.com>
 */
class Payment_Wallet_Admin {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		add_action( 'plugins_loaded', array( $this, 'pw_custom_wc_wallet_init' ), 0 );

		//Stripe settings admin menu
		add_action( 'admin_menu', array( $this, 'pw_stripe_setting' ) );

		//Stripe settings fields
		add_action( 'admin_init', array( $this, 'pw_stripe_settings_fields' ) );

		//On Key Setting Save, Notice
		add_action( 'admin_notices', array( $this, 'pw_success_notice' ) );
		
		//Plugin Settings Custom Link Filer
		add_filter( 'plugin_action_links_' . plugin_basename( 'payment-wallet/payment-wallet.php' ), array( $this, 'pw_custom_wc_wallet_action_links' ) );

	}

	/**
	 * Plugin Settings Custom Link Filer
	 *
	 * @since    1.0.0
	 */
	function pw_custom_wc_wallet_action_links( $links ) {
		$plugin_links = array(
			'<a href="' . admin_url( 'admin.php?page=wc-settings&tab=checkout' ) . '">' . __( 'Settings', 'payment-wallet' ) . '</a>',
		);
		return array_merge( $plugin_links, $links );
	}

	/**
	 * Register the stylesheets for the admin area.
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

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/payment-wallet-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/payment-wallet-admin.js', array( 'jquery' ), $this->version, false );

	}

	public function pw_add_user_field( $user ) {
		$wallet_bal = get_user_meta( $user->ID, 'wps_wallet', true );
		?>
		<h2>
		<?php
		esc_html_e( 'Wallet Balance: ', 'payment-wallet' );
		echo wp_kses_post( wc_price( $wallet_bal ) );
		?>
		</h2>
		<table class="form-table">
			<tr>
			<th><label for="wps_wallet"><?php esc_html_e( 'Amount: ', 'payment-wallet' ); ?></label></th>
			<td>
				<input type="number" step="0.01" name="wps_wallet" id="wps_wallet">
				<span class="description"><?php esc_html_e( 'Add/deduct money to/from wallet', 'payment-wallet' ); ?></span>
				<p class="error" ></p>
			</td>
			</tr>
			<tr>
			<th>
				<label for="wps_wallet">		
					<?php esc_html_e( 'Action: ', 'payment-wallet' ); ?>
				</label>
			</th>
			<td>
				<select name="wps_edit_wallet_action" id="wps_edit_wallet_action">
				<option><?php esc_html_e( 'Select any', 'payment-wallet' ); ?></option>
				<option value="credit"><?php esc_html_e( 'Credit', 'payment-wallet' ); ?></option>
				<option value="debit"><?php esc_html_e( 'Debit', 'payment-wallet' ); ?></option>
				</select>
				<span class="description"><?php esc_html_e( 'Whether want to add amount or deduct it from wallet', 'payment-wallet' ); ?></span>
			</td>
			</tr>
		</table>
		<?php
	}

	public function pw_save_user_field( $user_id ) {
		if ( current_user_can( 'edit_user', $user_id ) ) {
			$update = true;
			if ( empty( $_POST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ), 'update-user_' . $user_id ) ) {
				return;
			}

			$wallet_amount = ( isset( $_POST['wps_wallet'] ) ) ? sanitize_text_field( wp_unslash( $_POST['wps_wallet'] ) ) : '';
			$action        = ( isset( $_POST['wps_edit_wallet_action'] ) ) ? sanitize_text_field( wp_unslash( $_POST['wps_edit_wallet_action'] ) ) : '';
			if ( empty( $action ) || 'Select any' === $action || empty( $wallet_amount ) ) {
				$update = false;
			}
			if ( $update ) {
				$wps_wallet = get_user_meta( $user_id, 'wps_wallet', true );
				$wps_wallet = ( ! empty( $wps_wallet ) ) ? $wps_wallet : 0;
				if ( 'credit' === $action ) {
					$wps_wallet = floatval( $wps_wallet ) + floatval( $wallet_amount );
				} elseif ( 'debit' === $action ) {
					if ( $wps_wallet < $wallet_amount ) {
						$wps_wallet = 0;
					} else {
						$wps_wallet = floatval( $wps_wallet ) - floatval( $wallet_amount );
					}
				}
				update_user_meta( $user_id, 'wps_wallet', abs( $wps_wallet ) );
			}
		}
	}

	public function pw_custom_wc_wallet_init() {
		if ( ! class_exists( 'WC_Payment_Gateway' ) ) {
			return;
		}
		require_once plugin_dir_path( __FILE__ ) . ( '../woo-wallet.php' );
		// class add it too WooCommerce
		if ( is_user_logged_in() ) {
			add_filter( 'woocommerce_payment_gateways', 'pw_custom_wc_wallet_gateway' );
			function pw_custom_wc_wallet_gateway( $methods ) {
				$methods[] = 'custom_WC_Wallet';
				return $methods;
			}
		}
	}


	public function pw_stripe_setting() {

		add_menu_page(
			'Stripe Keys',
			'Wallet Settings',
			'manage_options',
			'stripe_keys',
			array( $this, 'pw_stripe_keys_page_callback' ),
			'dashicons-admin-generic',
			65
		);
	}

	public function pw_stripe_keys_page_callback() {
		?>
			<div class="wrap">
				<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
				<form method="post" action="options.php">
					<?php
						settings_fields( 'stripe_key_settings' );
						do_settings_sections( 'stripe_keys' );
						submit_button();
					?>
				</form>
			</div>
		<?php
	}

	public function pw_stripe_settings_fields() {

		$page_slug    = 'stripe_keys';
		$option_group = 'stripe_key_settings';
	
		add_settings_section(
			'key_section_id',
			'',
			'',
			$page_slug
		);
	
		register_setting( $option_group, 'secret_key', '' );
		register_setting( $option_group, 'publishable_key', '' );
	
		add_settings_field(
			'publishable_key',
			'Publishable Key',
			array( $this, 'pw_publishable_key_callback' ),
			$page_slug,
			'key_section_id',
			array(
				'label_for' => 'publishable_key',
				'name'      => 'publishable_key',
			)
		);
	
		add_settings_field(
			'secret_key',
			'Secret Key',
			array( $this, 'pw_secret_key_callback' ),
			$page_slug,
			'key_section_id',
			array(
				'label_for' => 'secret_key',
				'name'      => 'secret_key',
			)
		);
	}

	public function pw_publishable_key_callback( $args ) {
		printf(
			'<input type="text" id="%s" name="%s" value="%s" size="80" required />',
			esc_attr( $args['name'] ),
			esc_attr( $args['name'] ),
			esc_attr( get_option( $args['name'], '' ) )
		);
	}

	public function pw_secret_key_callback( $args ) {
		printf(
			'<input type="password" id="%s" name="%s" value="%s" size="80" required />',
			esc_attr( $args['name'] ),
			esc_attr( $args['name'] ),
			esc_attr( get_option( $args['name'], '' ) )
		);
	}

	public function pw_success_notice() {
		if (
			isset( $_GET['page'] ) && 'stripe_keys' === $_GET['page'] && isset( $_GET['settings-updated'] ) && 'true' === $_GET['settings-updated']
		) {
			?>
		
				<div class="notice notice-success is-dismissible">
					<p>
						<strong><?php echo esc_html( __( 'Key settings saved.', 'payment-wallet' )); ?></strong>
					</p>
				</div>
			<?php
		}
	}
}
