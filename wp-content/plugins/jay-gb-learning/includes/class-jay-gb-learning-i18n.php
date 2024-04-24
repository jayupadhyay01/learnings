<?php
/**
 * Define the internationalization functionality.
 *
 * @since      1.0.0
 * @package    Jay_gb_learning
 * @subpackage Jay_gb_learning/includes
 * @author     Jay Upadhyay
 */
class Jay_gb_learning_i18n
{


    /**
     * Load the plugin text domain for translation.
     *
     * @since 1.0.0
     */
    public function load_plugin_textdomain()
    {

        load_plugin_textdomain(
            'jay-gb-learning',
            false,
            dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
        );

    }



}
