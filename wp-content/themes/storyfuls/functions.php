<?php
/**
 * Theme Functions.
 *
 * @package storyful
 */

if ( ! defined( 'STORYFUL_THEME_VERSION' ) ) {
	define( 'STORYFUL_THEME_VERSION', '1.0' );
}

if ( ! defined( 'STORYFUL_THEME_PATH' ) ) {
	define( 'STORYFUL_THEME_PATH', __DIR__ );
}

if ( ! defined( 'STORYFUL_THEME_URL' ) ) {
	define( 'STORYFUL_THEME_URL', get_template_directory_uri() );
}

if ( ! defined( 'STORYFUL_BUILD_URI' ) ) {
	define( 'STORYFUL_BUILD_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/build' );
}

if ( ! defined( 'STORYFUL_BUILD_PATH' ) ) {
	define( 'STORYFUL_BUILD_PATH', untrailingslashit( get_template_directory() ) . '/assets/build' );
}

if ( ! defined( 'STORYFUL_SRC_BLOCK_DIR_PATH' ) ) {
	define( 'STORYFUL_SRC_BLOCK_DIR_PATH', get_template_directory() . '/assets/build/js/blocks' );
}

if ( ! defined( 'STORYFUL_BUILD_LIBRARY_URI' ) ) {
	define( 'STORYFUL_BUILD_LIBRARY_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/library' );
}

if ( ! defined( 'STORYFUL_BUILD_LIBRARY_DIR_PATH' ) ) {
	define( 'STORYFUL_BUILD_LIBRARY_DIR_PATH', untrailingslashit( get_template_directory() ) . '/assets/library' );
}

/**
 * Load up the class autoloader.
 */
require_once STORYFUL_THEME_PATH . '/inc/helpers/autoloader.php';

/**
 * Theme Init
 *
 * Sets up the theme.
 *
 * @return void
 * @since 1.0.0
 */
function storyful_get_theme_instance() {
	\STORYFUL\Inc\Storyful::get_instance();
}

storyful_get_theme_instance();
