<?php

/**
 * The plugin class.
 *
 * @since      1.0.0
 * @package    Jay_gb_learning
 * @subpackage Jay_gb_learning/includes
 * @author     Jay Upadhyay
 */
class Jay_gb_learning
{

    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since  1.0.0
     * @access protected
     * @var    string    $plugin_name    The string used to uniquely identify this plugin.
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since  1.0.0
     * @access protected
     * @var    string    $version    The current version of the plugin.
     */
    protected $version;

    /**
     * Functionality of the plugin.
     */
    public function __construct()
    {
        if (defined('JAY_GB_LEARNING_VERSION') ) {
            $this->version = JAY_GB_LEARNING_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'jay-gb-learning';

        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();

    }

    /**
     * Load the required dependencies for this plugin.
     *
     * @access private
     */
    private function load_dependencies()
    {


        include_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-jay-gb-learning-loader.php';

        include_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-jay-gb-learning-i18n.php';

        include_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-jay-gb-learning-admin.php';

        /**
         * The public class file .
         */
        include_once plugin_dir_path(dirname(__FILE__)) . 'public/class-jay-gb-learning-public.php';

        $this->loader = new Jay_gb_learning_Loader();

    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * @access private
     */
    private function set_locale()
    {

        $plugin_i18n = new Jay_gb_learning_i18n();

        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');

    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     * 
     * Custom Rest API call back added here
     * 
     * @access private
     */
    private function define_admin_hooks()
    {

        $plugin_admin = new Jay_gb_learning_Admin($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
        $this->loader->add_action('rest_api_init', $plugin_admin, 'rest_api_callback');

    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @access private
     */
    private function define_public_hooks()
    {

        $plugin_public = new Jay_Gb_Learning_Public($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
        
    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     */
    public function run()
    {
        $this->loader->run();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @return string    The name of the plugin.
     */
    public function get_plugin_name()
    {
        return $this->plugin_name;
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @return Jay_gb_learning_Loader    Orchestrates the hooks of the plugin.
     */
    public function get_loader()
    {
        return $this->loader;
    }

    /**
     * Retrieve the version number of the plugin.
     */
    public function get_version()
    {
        return $this->version;
    }

}
