<?php
/**
 * Register Post Types
 *
 * @package ana-enterprise
 */

namespace ANA_ENTERPRISE\Inc;

use ANA_ENTERPRISE\Inc\Traits\Singleton;

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
		add_action( 'init', array( $this, 'register_testimonial_post_type' ), 0 );

	}

	/**
	 * Register Custom Post Type Movie.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_movie_cpt() {

		$labels = array(
			'name'                  => _x( 'Movies', 'Post Type General Name', 'ana-enterprise' ),
			'singular_name'         => _x( 'Movie', 'Post Type Singular Name', 'ana-enterprise' ),
			'menu_name'             => _x( 'Movies', 'Admin Menu text', 'ana-enterprise' ),
			'name_admin_bar'        => _x( 'Movie', 'Add New on Toolbar', 'ana-enterprise' ),
			'archives'              => __( 'Movie Archives', 'ana-enterprise' ),
			'attributes'            => __( 'Movie Attributes', 'ana-enterprise' ),
			'parent_item_colon'     => __( 'Parent Movie:', 'ana-enterprise' ),
			'all_items'             => __( 'All Movies', 'ana-enterprise' ),
			'add_new_item'          => __( 'Add New Movie', 'ana-enterprise' ),
			'add_new'               => __( 'Add New', 'ana-enterprise' ),
			'new_item'              => __( 'New Movie', 'ana-enterprise' ),
			'edit_item'             => __( 'Edit Movie', 'ana-enterprise' ),
			'update_item'           => __( 'Update Movie', 'ana-enterprise' ),
			'view_item'             => __( 'View Movie', 'ana-enterprise' ),
			'view_items'            => __( 'View Movies', 'ana-enterprise' ),
			'search_items'          => __( 'Search Movie', 'ana-enterprise' ),
			'not_found'             => __( 'Not found', 'ana-enterprise' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'ana-enterprise' ),
			'featured_image'        => __( 'Featured Image', 'ana-enterprise' ),
			'set_featured_image'    => __( 'Set featured image', 'ana-enterprise' ),
			'remove_featured_image' => __( 'Remove featured image', 'ana-enterprise' ),
			'use_featured_image'    => __( 'Use as featured image', 'ana-enterprise' ),
			'insert_into_item'      => __( 'Insert into Movie', 'ana-enterprise' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Movie', 'ana-enterprise' ),
			'items_list'            => __( 'Movies list', 'ana-enterprise' ),
			'items_list_navigation' => __( 'Movies list navigation', 'ana-enterprise' ),
			'filter_items_list'     => __( 'Filter Movies list', 'ana-enterprise' ),
		);
		$args   = array(
			'label'               => __( 'Movie', 'ana-enterprise' ),
			'description'         => __( 'The movies', 'ana-enterprise' ),
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
	 * Register Testimonial custom post type.
	 */
	function register_testimonial_post_type() {
		$labels = array(
			'name'                  => _x( 'Testimonials', 'Post Type General Name', 'ana-enterprise' ),
			'singular_name'         => _x( 'Testimonial', 'Post Type Singular Name', 'ana-enterprise' ),
			'menu_name'             => __( 'Testimonials', 'ana-enterprise' ),
			'name_admin_bar'        => __( 'Testimonial', 'ana-enterprise' ),
			'archives'              => __( 'Testimonial Archives', 'ana-enterprise' ),
			'attributes'            => __( 'Testimonial Attributes', 'ana-enterprise' ),
			'parent_item_colon'     => __( 'Parent Testimonial:', 'ana-enterprise' ),
			'all_items'             => __( 'All Testimonials', 'ana-enterprise' ),
			'add_new_item'          => __( 'Add New Testimonial', 'ana-enterprise' ),
			'add_new'               => __( 'Add New', 'ana-enterprise' ),
			'new_item'              => __( 'New Testimonial', 'ana-enterprise' ),
			'edit_item'             => __( 'Edit Testimonial', 'ana-enterprise' ),
			'update_item'           => __( 'Update Testimonial', 'ana-enterprise' ),
			'view_item'             => __( 'View Testimonial', 'ana-enterprise' ),
			'view_items'            => __( 'View Testimonials', 'ana-enterprise' ),
			'search_items'          => __( 'Search Testimonial', 'ana-enterprise' ),
			'not_found'             => __( 'Not found', 'ana-enterprise' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'ana-enterprise' ),
			'featured_image'        => __( 'Featured Image', 'ana-enterprise' ),
			'set_featured_image'    => __( 'Set featured image', 'ana-enterprise' ),
			'remove_featured_image' => __( 'Remove featured image', 'ana-enterprise' ),
			'use_featured_image'    => __( 'Use as featured image', 'ana-enterprise' ),
			'insert_into_item'      => __( 'Insert into Testimonial', 'ana-enterprise' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Testimonial', 'ana-enterprise' ),
			'items_list'            => __( 'Testimonials list', 'ana-enterprise' ),
			'items_list_navigation' => __( 'Testimonials list navigation', 'ana-enterprise' ),
			'filter_items_list'     => __( 'Filter Testimonials list', 'ana-enterprise' ),
		);
		
		$args = array(
			'label'               => __( 'Testimonial', 'ana-enterprise' ),
			'description'         => __( 'Testimonial Description', 'ana-enterprise' ),
			'labels'              => $labels,
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
			'taxonomies'          => array( 'category', 'post_tag' ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => true,
			'exclude_from_search' => false,
			'show_in_rest'        => true,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
		);
		
		register_post_type( 'testimonial', $args );
	}

}
