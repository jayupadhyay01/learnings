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
function pw_activate_payment_wallet() {
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
function pw_deactivate_payment_wallet() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-payment-wallet-deactivator.php';
	Payment_Wallet_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'pw_activate_payment_wallet' );
register_deactivation_hook( __FILE__, 'pw_deactivate_payment_wallet' );

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
function pw_run_payment_wallet() {

	$plugin = new Payment_Wallet();
	$plugin->run();
}
pw_run_payment_wallet();