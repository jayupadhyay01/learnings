<?php
/**
 * Register Post Types
 *
 * @package md-prime
 */

namespace MD_PRIME\Inc;

use MD_PRIME\Inc\Traits\Singleton;

/**
 * Class for register post types.
 */
class Register_Post_Types {
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
		add_action( 'init', array( $this, 'register_movie_cpt' ), 0 );
		add_action( 'init', array( $this, 'register_News_cpt' ), 0 );

	}

	/**
	 * Register Custom Post Type Movie.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_movie_cpt() {

		$labels = array(
			'name'                  => _x( 'Movies', 'Post Type General Name', 'md-prime' ),
			'singular_name'         => _x( 'Movie', 'Post Type Singular Name', 'md-prime' ),
			'menu_name'             => _x( 'Movies', 'Admin Menu text', 'md-prime' ),
			'name_admin_bar'        => _x( 'Movie', 'Add New on Toolbar', 'md-prime' ),
			'archives'              => __( 'Movie Archives', 'md-prime' ),
			'attributes'            => __( 'Movie Attributes', 'md-prime' ),
			'parent_item_colon'     => __( 'Parent Movie:', 'md-prime' ),
			'all_items'             => __( 'All Movies', 'md-prime' ),
			'add_new_item'          => __( 'Add New Movie', 'md-prime' ),
			'add_new'               => __( 'Add New', 'md-prime' ),
			'new_item'              => __( 'New Movie', 'md-prime' ),
			'edit_item'             => __( 'Edit Movie', 'md-prime' ),
			'update_item'           => __( 'Update Movie', 'md-prime' ),
			'view_item'             => __( 'View Movie', 'md-prime' ),
			'view_items'            => __( 'View Movies', 'md-prime' ),
			'search_items'          => __( 'Search Movie', 'md-prime' ),
			'not_found'             => __( 'Not found', 'md-prime' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'md-prime' ),
			'featured_image'        => __( 'Featured Image', 'md-prime' ),
			'set_featured_image'    => __( 'Set featured image', 'md-prime' ),
			'remove_featured_image' => __( 'Remove featured image', 'md-prime' ),
			'use_featured_image'    => __( 'Use as featured image', 'md-prime' ),
			'insert_into_item'      => __( 'Insert into Movie', 'md-prime' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Movie', 'md-prime' ),
			'items_list'            => __( 'Movies list', 'md-prime' ),
			'items_list_navigation' => __( 'Movies list navigation', 'md-prime' ),
			'filter_items_list'     => __( 'Filter Movies list', 'md-prime' ),
		);
		$args   = array(
			'label'               => __( 'Movie', 'md-prime' ),
			'description'         => __( 'The movies', 'md-prime' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-admin-post',
			'supports'            => array(
				'title',
				'editor',
				'excerpt',
				'thumbnail',
				'revisions',
				'author',
				'comments',
				'trackbacks',
				'page-attributes',
				'custom-fields',
			),
			'taxonomies'          => array(),
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,
			'hierarchical'        => false,
			'exclude_from_search' => false,
			'show_in_rest'        => true,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
		);

		register_post_type( 'movies', $args );

	}

	/**
	 * Register Custom Post Type News.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_News_cpt() {

		$labels = array(
			'name'                  => _x( 'News', 'Post Type General Name', 'md-prime' ),
			'singular_name'         => _x( 'News', 'Post Type Singular Name', 'md-prime' ),
			'menu_name'             => _x( 'News', 'Admin Menu text', 'md-prime' ),
			'name_admin_bar'        => _x( 'News', 'Add New on Toolbar', 'md-prime' ),
			'archives'              => __( 'News Archives', 'md-prime' ),
			'attributes'            => __( 'News Attributes', 'md-prime' ),
			'parent_item_colon'     => __( 'Parent News:', 'md-prime' ),
			'all_items'             => __( 'All News', 'md-prime' ),
			'add_new_item'          => __( 'Add New News', 'md-prime' ),
			'add_new'               => __( 'Add New', 'md-prime' ),
			'new_item'              => __( 'New News', 'md-prime' ),
			'edit_item'             => __( 'Edit News', 'md-prime' ),
			'update_item'           => __( 'Update News', 'md-prime' ),
			'view_item'             => __( 'View News', 'md-prime' ),
			'view_items'            => __( 'View News', 'md-prime' ),
			'search_items'          => __( 'Search News', 'md-prime' ),
			'not_found'             => __( 'Not found', 'md-prime' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'md-prime' ),
			'featured_image'        => __( 'Featured Image', 'md-prime' ),
			'set_featured_image'    => __( 'Set featured image', 'md-prime' ),
			'remove_featured_image' => __( 'Remove featured image', 'md-prime' ),
			'use_featured_image'    => __( 'Use as featured image', 'md-prime' ),
			'insert_into_item'      => __( 'Insert into News', 'md-prime' ),
			'uploaded_to_this_item' => __( 'Uploaded to this News', 'md-prime' ),
			'items_list'            => __( 'News list', 'md-prime' ),
			'items_list_navigation' => __( 'News list navigation', 'md-prime' ),
			'filter_items_list'     => __( 'Filter News list', 'md-prime' ),
		);
		$args   = array(
			'label'               => __( 'News', 'md-prime' ),
			'taxonomies'          => array( 'news_category'),
			'description'         => __( 'The news', 'md-prime' ),
			'labels'              => $labels,
			'menu_icon'           => 'dashicons-admin-post',
			'supports'            => array(
				'title',
				'editor',
				'excerpt',
				'thumbnail',
				'revisions',
				'author',
				'comments',
				'trackbacks',
				'page-attributes',
				'custom-fields',
			),
			'taxonomies'          => array(),
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => false,
			'hierarchical'        => false,
			'exclude_from_search' => false,
			'show_in_rest'        => true,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
		);

		register_post_type( 'news', $args );

	}


}
