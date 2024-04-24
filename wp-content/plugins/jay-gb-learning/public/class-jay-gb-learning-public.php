<?php

/**
 * The public functionality of the plugin.
 *
 * @since      1.0.0
 * @package    Jay_gb_learning
 * @subpackage Jay_gb_learning/public
 * @author     Jay Upadhyay
 */

class Jay_Gb_Learning_Public
{

    private $plugin_name;
    private $version;
    public function __construct( $plugin_name, $version )
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    /**
     * Stylesheets Registration for the public side of the site.
     */
    public function enqueue_styles()
    {

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/jay-gb-learning-public.css', array(), $this->version, 'all');

    }

}


