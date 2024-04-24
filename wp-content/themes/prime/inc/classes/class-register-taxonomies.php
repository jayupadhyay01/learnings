<?php
/**
 * Register Custom Taxonomies
 *
 * @package md-prime
 */

namespace MD_PRIME\Inc;

use MD_PRIME\Inc\Traits\Singleton;

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
		add_action( 'init', array( $this, 'register_news_taxonomy' ) );

	}

	/**
	 * Register Taxonomy Year.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_year_taxonomy() {

		$labels = array(
			'name'              => _x( 'Years', 'taxonomy general name', 'md-prime' ),
			'singular_name'     => _x( 'Year', 'taxonomy singular name', 'md-prime' ),
			'search_items'      => __( 'Search Years', 'md-prime' ),
			'all_items'         => __( 'All Years', 'md-prime' ),
			'parent_item'       => __( 'Parent Year', 'md-prime' ),
			'parent_item_colon' => __( 'Parent Year:', 'md-prime' ),
			'edit_item'         => __( 'Edit Year', 'md-prime' ),
			'update_item'       => __( 'Update Year', 'md-prime' ),
			'add_new_item'      => __( 'Add New Year', 'md-prime' ),
			'new_item_name'     => __( 'New Year Name', 'md-prime' ),
			'menu_name'         => __( 'Year', 'md-prime' ),
		);
		$args   = array(
			'labels'             => $labels,
			'description'        => __( 'Movie Release Year', 'md-prime' ),
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
/**
	 * Register Taxonomy Year.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_news_taxonomy() {

		$labels = array(
			'name'                       => _x( 'News Categories', 'taxonomy general name', 'md-prime' ),
			'singular_name'              => _x( 'News Category', 'taxonomy singular name', 'md-prime' ),
			'search_items'               => __( 'Search News Category', 'md-prime' ),
			'popular_items'              => __( 'Popular News Category', 'md-prime' ),
			'all_items'                  => __( 'All News Category', 'md-prime' ),
			'parent_item'                => null,
			'parent_item_colon'          => null,
			'edit_item'                  => __( 'Edit News Category', 'md-prime' ),
			'update_item'                => __( 'Update News Category', 'md-prime' ),
			'add_new_item'               => __( 'Add New News Category', 'md-prime' ),
			'new_item_name'              => __( 'New News Category Name', 'md-prime' ),
			'separate_items_with_commas' => __( 'Separate News Category with commas', 'md-prime' ),
			'add_or_remove_items'        => __( 'Add or remove News Category', 'md-prime' ),
			'choose_from_most_used'      => __( 'Choose from the most used News Category', 'md-prime' ),
			'not_found'                  => __( 'No News Category found.', 'md-prime' ),
			'menu_name'                  => __( 'News Categories', 'md-prime' ),
		);
	 
		// register the taxonomy
		register_taxonomy('news_category',array('news'), array(
			'hierarchical' => true,
			'labels' => $labels,
			'show_ui' => true,
			'show_in_rest' => true,
			'show_admin_column' => true,
			'query_var' => true,
			'rewrite' => array( 'slug' => 'news_category' ),
		));
	}
}
