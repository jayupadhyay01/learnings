<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://https://profiles.wordpress.org/jayupadhyay01/
 * @since             1.0.0
 * @package           Payment_Wallet
 *
 * @wordpress-plugin
 * Plugin Name:       Payment Wallet
 * Plugin URI:        https://https://profiles.wordpress.org/jayupadhyay01/
 * Description:       Payment Wallet with Stripe for woocommerce.
 * Version:           1.0.0
 * Author:            Jay Upadhyay
 * Author URI:        https://https://profiles.wordpress.org/jayupadhyay01//
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       payment-wallet
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PAYMENT_WALLET_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-payment-wallet-activator.php
 */
function activate_payment_wallet() {
	if ( ! is_plugin_active( 'woocommerce/woocommerce.php' ) and current_user_can( 'activate_plugins' ) ) {
		wp_die( 'Sorry, but this plugin requires the WooCommerce Plugin to be installed and active. <br><a href="' . esc_url( admin_url( 'plugins.php' ) ) . '">&laquo; Return to Plugins</a>' );
	} else {
		require_once plugin_dir_path( __FILE__ ) . 'includes/class-payment-wallet-activator.php';
		Payment_Wallet_Activator::activate();
	}
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-payment-wallet-deactivator.php
 */
function deactivate_payment_wallet() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-payment-wallet-deactivator.php';
	Payment_Wallet_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_payment_wallet' );
register_deactivation_hook( __FILE__, 'deactivate_payment_wallet' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-payment-wallet.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_payment_wallet() {

	$plugin = new Payment_Wallet();
	$plugin->run();
}
run_payment_wallet();
add_action( 'plugins_loaded', 'custom_wc_wallet_init', 0 );
function custom_wc_wallet_init() {
	if ( ! class_exists( 'WC_Payment_Gateway' ) ) {
		return;
	}
	require_once plugin_dir_path( __FILE__ ) . ( 'woo-wallet.php' );
	// class add it too WooCommerce
	if ( is_user_logged_in() ) {
		add_filter( 'woocommerce_payment_gateways', 'custom_wc_wallet_gateway' );
		function custom_wc_wallet_gateway( $methods ) {
			$methods[] = 'custom_WC_Wallet';
			return $methods;
		}
	}
}
// Add custom action links
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'custom_wc_wallet_action_links' );

function custom_wc_wallet_action_links( $links ) {
	$plugin_links = array(
		'<a href="' . admin_url( 'admin.php?page=wc-settings&tab=checkout' ) . '">' . __( 'Settings', 'payment-wallet' ) . '</a>',
	);
	return array_merge( $plugin_links, $links );
}

add_action( 'admin_menu', 'stripe_setting' );

function stripe_setting() {

	add_menu_page(
		'Stripe Keys',
		'Wallet Settings',
		'manage_options',
		'stripe_keys',
		'stripe_keys_page_callback',
		'dashicons-admin-generic',
		65
	);
}

function stripe_keys_page_callback() {
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

add_action( 'admin_init', 'stripe_settings_fields' );
function stripe_settings_fields() {

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
		'publishable_key_callback',
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
		'secret_key_callback',
		$page_slug,
		'key_section_id',
		array(
			'label_for' => 'secret_key',
			'name'      => 'secret_key',
		)
	);
}

function publishable_key_callback( $args ) {
	printf(
		'<input type="text" id="%s" name="%s" value="%s" size="80" required />',
		esc_attr( $args['name'] ),
		esc_attr( $args['name'] ),
		esc_attr( get_option( $args['name'], '' ) )
	);
}

function secret_key_callback( $args ) {
	printf(
		'<input type="password" id="%s" name="%s" value="%s" size="80" required />',
		esc_attr( $args['name'] ),
		esc_attr( $args['name'] ),
		esc_attr( get_option( $args['name'], '' ) )
	);
}

add_action( 'admin_notices', 'success_notice' );

function success_notice() {
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
