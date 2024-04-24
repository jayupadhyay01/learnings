<?php
/**
 * Theme Functions.
 *
 * @package ana-enterprise
 */

if ( ! defined( 'ANA_ENTERPRISE_THEME_VERSION' ) ) {
	define( 'ANA_ENTERPRISE_THEME_VERSION', '1.0' );
}

if ( ! defined( 'ANA_ENTERPRISE_THEME_PATH' ) ) {
	define( 'ANA_ENTERPRISE_THEME_PATH', __DIR__ );
}

if ( ! defined( 'ANA_ENTERPRISE_THEME_URL' ) ) {
	define( 'ANA_ENTERPRISE_THEME_URL', get_template_directory_uri() );
}

if ( ! defined( 'ANA_ENTERPRISE_BUILD_URI' ) ) {
	define( 'ANA_ENTERPRISE_BUILD_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/build' );
}

if ( ! defined( 'ANA_ENTERPRISE_BUILD_PATH' ) ) {
	define( 'ANA_ENTERPRISE_BUILD_PATH', untrailingslashit( get_template_directory() ) . '/assets/build' );
}

if ( ! defined( 'ANA_ENTERPRISE_SRC_BLOCK_DIR_PATH' ) ) {
	define( 'ANA_ENTERPRISE_SRC_BLOCK_DIR_PATH', get_template_directory() . '/assets/build/js/blocks' );
}

if ( ! defined( 'ANA_ENTERPRISE_BUILD_LIBRARY_URI' ) ) {
	define( 'ANA_ENTERPRISE_BUILD_LIBRARY_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/library' );
}

if ( ! defined( 'ANA_ENTERPRISE_BUILD_LIBRARY_DIR_PATH' ) ) {
	define( 'ANA_ENTERPRISE_BUILD_LIBRARY_DIR_PATH', untrailingslashit( get_template_directory() ) . '/assets/library' );
}

/**
 * Load up the class autoloader.
 */
require_once ANA_ENTERPRISE_THEME_PATH . '/inc/helpers/autoloader.php';

/**
 * Theme Init
 *
 * Sets up the theme.
 *
 * @return void
 * @since 1.0.0
 */
function ana_enterprise_get_theme_instance() {
	\ANA_ENTERPRISE\Inc\Ana_Enterprise::get_instance();
}

ana_enterprise_get_theme_instance();
