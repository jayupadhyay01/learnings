<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://https://profiles.wordpress.org/jayupadhyay01/
 * @since      1.0.0
 *
 * @package    Admin_Post_Sync_Multisite
 * @subpackage Admin_Post_Sync_Multisite/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Admin_Post_Sync_Multisite
 * @subpackage Admin_Post_Sync_Multisite/includes
 * @author     Jay Upadhyay <jay.upadhyay@multidots.com>
 */
class Admin_Post_Sync_Multisite_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'admin-post-sync-multisite',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
