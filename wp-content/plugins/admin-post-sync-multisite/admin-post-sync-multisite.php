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
 * @package           Admin_Post_Sync_Multisite
 *
 * @wordpress-plugin
 * Plugin Name:       Post Sync from Admin for Multisites
 * Plugin URI:        https://https://profiles.wordpress.org/jayupadhyay01/
 * Description:       Sync Post From Main Site to SubSite From Main Site Post Admin Area.
 * Version:           1.0.0
 * Author:            Jay Upadhyay
 * Author URI:        https://https://profiles.wordpress.org/jayupadhyay01//
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       admin-post-sync-multisite
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
define( 'ADMIN_POST_SYNC_MULTISITE_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-admin-post-sync-multisite-activator.php
 */
function activate_admin_post_sync_multisite() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-admin-post-sync-multisite-activator.php';
	Admin_Post_Sync_Multisite_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-admin-post-sync-multisite-deactivator.php
 */
function deactivate_admin_post_sync_multisite() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-admin-post-sync-multisite-deactivator.php';
	Admin_Post_Sync_Multisite_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_admin_post_sync_multisite' );
register_deactivation_hook( __FILE__, 'deactivate_admin_post_sync_multisite' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-admin-post-sync-multisite.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_admin_post_sync_multisite() {

	$plugin = new Admin_Post_Sync_Multisite();
	$plugin->run();

}
run_admin_post_sync_multisite();
