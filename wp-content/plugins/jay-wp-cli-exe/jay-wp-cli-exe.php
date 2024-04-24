<?php
/**
 * Plugin Name:     Jay WP CLI Exercise
 * Description:     This is an exercise for WP CLI custom command to Import bulk posts.
 * Author:          Jay Upadhyay
 * Author URI:      https://profiles.wordpress.org/jayupadhyay01/
 * Text Domain:     jay-upadhyay
 * Version:         1.0.0
 *
 * @package         Jay_WP_CLI
 */

/**
 * Exit if accessed directly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main file, contains the plugin metadata and activation processes
 *
 * @package    Jay_WP_CLI
 */
if ( ! defined( 'Jay_WP_CLI_VERSION' ) ) {
	/**
	 * The version of the plugin.
	 */
	define( 'Jay_WP_CLI_VERSION', '1.0.2' );
}

if ( ! defined( 'P_PATH' ) ) {
	/**
	 *  The server file system path to the plugin directory.
	 */
	define( 'P_PATH', plugin_dir_path( __FILE__ ) );
}

/**
 * Include files.
 */
$files = array(
	'app/admin/class-main-admin',
);

if ( ! empty( $files ) ) {

	foreach ( $files as $file ) {

		// Include functions file.
		require P_PATH . $file . '.php';

	}
}
