<?php
/**
 * Theme Functions.
 *
 * @package anitian
 */

if ( ! defined( 'ANITIAN_THEME_VERSION' ) ) {
	define( 'ANITIAN_THEME_VERSION', '1.0' );
}

if ( ! defined( 'ANITIAN_THEME_PATH' ) ) {
	define( 'ANITIAN_THEME_PATH', __DIR__ );
}

if ( ! defined( 'ANITIAN_THEME_URL' ) ) {
	define( 'ANITIAN_THEME_URL', get_template_directory_uri() );
}

if ( ! defined( 'ANITIAN_BUILD_URI' ) ) {
	define( 'ANITIAN_BUILD_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/build' );
}

if ( ! defined( 'ANITIAN_BUILD_PATH' ) ) {
	define( 'ANITIAN_BUILD_PATH', untrailingslashit( get_template_directory() ) . '/assets/build' );
}

if ( ! defined( 'ANITIAN_SRC_BLOCK_DIR_PATH' ) ) {
	define( 'ANITIAN_SRC_BLOCK_DIR_PATH', get_template_directory() . '/assets/build/js/blocks' );
}

if ( ! defined( 'ANITIAN_BUILD_LIBRARY_URI' ) ) {
	define( 'ANITIAN_BUILD_LIBRARY_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/library' );
}

if ( ! defined( 'ANITIAN_BUILD_LIBRARY_DIR_PATH' ) ) {
	define( 'ANITIAN_BUILD_LIBRARY_DIR_PATH', untrailingslashit( get_template_directory() ) . '/assets/library' );
}

/**
 * Load up the class autoloader.
 */
require_once ANITIAN_THEME_PATH . '/inc/helpers/autoloader.php';

/**
 * Theme Init
 *
 * Sets up the theme.
 *
 * @return void
 * @since 1.0.0
 */
function anitian_get_theme_instance() {
	\ANITIAN\Inc\Anitian::get_instance();
}

anitian_get_theme_instance();
/**
 * WooCommerce First Order Functions
 */
require get_template_directory() . '/woo-coupon-first-order.php';

require get_template_directory() . '/woo-address.php';