<?php
/**
 * Register Custom Taxonomies
 *
 * @package ana-enterprise
 */

namespace ANA_ENTERPRISE\Inc;

use ANA_ENTERPRISE\Inc\Traits\Singleton;

/**
 * Class for register taxonomies.
 */
class Register_Taxonomies {
	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		// load class.
		$this->setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_action( 'init', array( $this, 'register_year_taxonomy' ) );

	}

	/**
	 * Register Taxonomy Year.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_year_taxonomy() {

		$labels = array(
			'name'              => _x( 'Years', 'taxonomy general name', 'ana-enterprise' ),
			'singular_name'     => _x( 'Year', 'taxonomy singular name', 'ana-enterprise' ),
			'search_items'      => __( 'Search Years', 'ana-enterprise' ),
			'all_items'         => __( 'All Years', 'ana-enterprise' ),
			'parent_item'       => __( 'Parent Year', 'ana-enterprise' ),
			'parent_item_colon' => __( 'Parent Year:', 'ana-enterprise' ),
			'edit_item'         => __( 'Edit Year', 'ana-enterprise' ),
			'update_item'       => __( 'Update Year', 'ana-enterprise' ),
			'add_new_item'      => __( 'Add New Year', 'ana-enterprise' ),
			'new_item_name'     => __( 'New Year Name', 'ana-enterprise' ),
			'menu_name'         => __( 'Year', 'ana-enterprise' ),
		);
		$args   = array(
			'labels'             => $labels,
			'description'        => __( 'Movie Release Year', 'ana-enterprise' ),
			'hierarchical'       => false,
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_nav_menus'  => true,
			'show_tagcloud'      => true,
			'show_in_quick_edit' => true,
			'show_admin_column'  => true,
			'show_in_rest'       => true,
		);
		register_taxonomy( 'movie-year', array( 'movies' ), $args );

	}

}
