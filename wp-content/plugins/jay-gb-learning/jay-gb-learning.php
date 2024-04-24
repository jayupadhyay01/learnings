<?php

/**
 *
 * @since   1.0.0
 * @package Jay_gb_learning
 *
 * @wordpress-plugin
 * Plugin Name:       Jay GB Learning
 * Plugin URI:        jay-gb-learning
 * Description:       This is my(jay's) GB learning exercise for the Hybrid GB Block.
 * Author:            Jay Upadhyay
 * Version:           1.0.0
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages
 * Text Domain:       jay-gb-learning
 */

// If this file is called directly, abort.
if (! defined('WPINC') ) {
    die;
}

/**
 * Currently plugin version.
 */
define('JAY_GB_LEARNING_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 */
function activate_jay_gb_learning()
{
    include_once plugin_dir_path(__FILE__) . 'includes/class-jay-gb-learning-activator.php';
    Jay_gb_learning_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_jay_gb_learning()
{
    include_once plugin_dir_path(__FILE__) . 'includes/class-jay-gb-learning-deactivator.php';
    Jay_gb_learning_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_jay_gb_learning');
register_deactivation_hook(__FILE__, 'deactivate_jay_gb_learning');

/**
 * Main Class
 */
require plugin_dir_path(__FILE__) . 'includes/class-jay-gb-learning.php';

/**
 * Begins execution of the plugin.
 */
function run_jay_gb_learning()
{

    $plugin = new Jay_gb_learning();
    $plugin->run();

}
run_jay_gb_learning();