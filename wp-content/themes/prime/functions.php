<?php
/**
 * Theme Functions.
 *
 * @package md-prime
 */

if (! defined('MD_PRIME_THEME_VERSION') ) {
    define('MD_PRIME_THEME_VERSION', '1.0');
}

if (! defined('MD_PRIME_THEME_PATH') ) {
    define('MD_PRIME_THEME_PATH', __DIR__);
}

if (! defined('MD_PRIME_THEME_URL') ) {
    define('MD_PRIME_THEME_URL', get_template_directory_uri());
}

if (! defined('MD_PRIME_BUILD_URI') ) {
    define('MD_PRIME_BUILD_URI', untrailingslashit(get_template_directory_uri()) . '/assets/build');
}

if (! defined('MD_PRIME_BUILD_PATH') ) {
    define('MD_PRIME_BUILD_PATH', untrailingslashit(get_template_directory()) . '/assets/build');
}

if (! defined('MD_PRIME_BUILD_CSS_URI') ) {
    define('MD_PRIME_BUILD_CSS_URI', untrailingslashit(get_template_directory_uri()) . '/assets/build/css');
}

if (! defined('MD_PRIME_BUILD_CSS_DIR_PATH') ) {
    define('MD_PRIME_BUILD_CSS_DIR_PATH', untrailingslashit(get_template_directory()) . '/assets/build/css');
}

if (! defined('MD_PRIME_BUILD_JS_URI') ) {
    define('MD_PRIME_BUILD_JS_URI', untrailingslashit(get_template_directory_uri()) . '/assets/build/js');
}

if (! defined('MD_PRIME_BUILD_JS_DIR_PATH') ) {
    define('MD_PRIME_BUILD_JS_DIR_PATH', untrailingslashit(get_template_directory()) . '/assets/build/js');
}

/**
 * Load up the class autoloader.
 */
require_once MD_PRIME_THEME_PATH . '/inc/helpers/autoloader.php';
require_once MD_PRIME_THEME_PATH . '/custom-cli-command.php';

/**
 * Theme Init
 *
 * Sets up the theme.
 *
 * @return void
 * @since  1.0.0
 */
function md_prime_get_theme_instance()
{
    \MD_PRIME\Inc\Md_Prime::get_instance();
}

md_prime_get_theme_instance();


//Empty Cart Functionality Added
add_action('template_redirect', 'empty_cart_button_handler');
function empty_cart_button_handler()
{
    if(isset($_POST['empty_cart']) && $_SERVER['REQUEST_METHOD'] == "POST" ) {
        WC()->cart->empty_cart(true);
    }
}

//Rename Additional information on product page
add_filter('woocommerce_product_tabs', 'woo_rename_tabs', 98);

function woo_rename_tabs( $tabs )
{
    $tabs['additional_information']['title'] = __('Product Data');
    return $tabs;

}

//Added a new custom product tab
add_filter('woocommerce_product_tabs', 'ql_new_custom_product_tab');

function ql_new_custom_product_tab( $tabs )
{
    $tabs['custom_tab'] = array(
    'title' => __('Custom Product Tab', 'woocommerce'),
    'priority' => 50,
    'callback' => 'ql_custom_product_tab_content'
    );
    return $tabs;
}

// Added content to a custom product tab
function ql_custom_product_tab_content()
{
    // The custom tab content
    echo '<h2>Custom Product Tab Content</h2>';
    echo '<p>This is the Custom tab and Description with Image.</p>';
    echo '<img src="http://training-jayu.md-staging.com/wp-content/uploads/2023/03/other-small.jpg" width="300" height="400" align="center">';
}