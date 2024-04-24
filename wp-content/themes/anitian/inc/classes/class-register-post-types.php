<?php
/**
 * Register Post Types
 *
 * @package anitian
 */

namespace ANITIAN\Inc;

use ANITIAN\Inc\Traits\Singleton;

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
		add_action( 'init', array( $this, 'register_awards_post_type' ), 0 );
		add_action( 'init', array( $this, 'register_partners_post_type' ), 0 );
		
	}

	/**
	 * Register Custom Post Type Movie.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_movie_cpt() {

		$labels = array(
			'name'                  => _x( 'Movies', 'Post Type General Name', 'anitian' ),
			'singular_name'         => _x( 'Movie', 'Post Type Singular Name', 'anitian' ),
			'menu_name'             => _x( 'Movies', 'Admin Menu text', 'anitian' ),
			'name_admin_bar'        => _x( 'Movie', 'Add New on Toolbar', 'anitian' ),
			'archives'              => __( 'Movie Archives', 'anitian' ),
			'attributes'            => __( 'Movie Attributes', 'anitian' ),
			'parent_item_colon'     => __( 'Parent Movie:', 'anitian' ),
			'all_items'             => __( 'All Movies', 'anitian' ),
			'add_new_item'          => __( 'Add New Movie', 'anitian' ),
			'add_new'               => __( 'Add New', 'anitian' ),
			'new_item'              => __( 'New Movie', 'anitian' ),
			'edit_item'             => __( 'Edit Movie', 'anitian' ),
			'update_item'           => __( 'Update Movie', 'anitian' ),
			'view_item'             => __( 'View Movie', 'anitian' ),
			'view_items'            => __( 'View Movies', 'anitian' ),
			'search_items'          => __( 'Search Movie', 'anitian' ),
			'not_found'             => __( 'Not found', 'anitian' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'anitian' ),
			'featured_image'        => __( 'Featured Image', 'anitian' ),
			'set_featured_image'    => __( 'Set featured image', 'anitian' ),
			'remove_featured_image' => __( 'Remove featured image', 'anitian' ),
			'use_featured_image'    => __( 'Use as featured image', 'anitian' ),
			'insert_into_item'      => __( 'Insert into Movie', 'anitian' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Movie', 'anitian' ),
			'items_list'            => __( 'Movies list', 'anitian' ),
			'items_list_navigation' => __( 'Movies list navigation', 'anitian' ),
			'filter_items_list'     => __( 'Filter Movies list', 'anitian' ),
		);
		$args   = array(
			'label'               => __( 'Movie', 'anitian' ),
			'description'         => __( 'The movies', 'anitian' ),
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

	/**
	 * Register Awards custom post type.
	 */
	function register_awards_post_type() {
		$labels = array(
			'name'                  => _x( 'Awards', 'Post Type General Name', 'ana-enterprise' ),
			'singular_name'         => _x( 'Award', 'Post Type Singular Name', 'ana-enterprise' ),
			'menu_name'             => __( 'Awards', 'ana-enterprise' ),
			'name_admin_bar'        => __( 'Award', 'ana-enterprise' ),
			'archives'              => __( 'Award Archives', 'ana-enterprise' ),
			'attributes'            => __( 'Award Attributes', 'ana-enterprise' ),
			'parent_item_colon'     => __( 'Parent Award:', 'ana-enterprise' ),
			'all_items'             => __( 'All Awards', 'ana-enterprise' ),
			'add_new_item'          => __( 'Add New Award', 'ana-enterprise' ),
			'add_new'               => __( 'Add New', 'ana-enterprise' ),
			'new_item'              => __( 'New Award', 'ana-enterprise' ),
			'edit_item'             => __( 'Edit Award', 'ana-enterprise' ),
			'update_item'           => __( 'Update Award', 'ana-enterprise' ),
			'view_item'             => __( 'View Award', 'ana-enterprise' ),
			'view_items'            => __( 'View Awards', 'ana-enterprise' ),
			'search_items'          => __( 'Search Award', 'ana-enterprise' ),
			'not_found'             => __( 'Not found', 'ana-enterprise' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'ana-enterprise' ),
			'featured_image'        => __( 'Featured Image', 'ana-enterprise' ),
			'set_featured_image'    => __( 'Set featured image', 'ana-enterprise' ),
			'remove_featured_image' => __( 'Remove featured image', 'ana-enterprise' ),
			'use_featured_image'    => __( 'Use as featured image', 'ana-enterprise' ),
			'insert_into_item'      => __( 'Insert into Award', 'ana-enterprise' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Award', 'ana-enterprise' ),
			'items_list'            => __( 'Awards list', 'ana-enterprise' ),
			'items_list_navigation' => __( 'Awards list navigation', 'ana-enterprise' ),
			'filter_items_list'     => __( 'Filter Awards list', 'ana-enterprise' ),
		);
		
		$args = array(
			'label'               => __( 'Award', 'ana-enterprise' ),
			'description'         => __( 'Award Description', 'ana-enterprise' ),
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
		
		register_post_type( 'awards', $args );
	}

	/**
	 * Register Partners custom post type.
	 */
	function register_partners_post_type() {
		$labels = array(
			'name'                  => _x( 'Partners', 'Post Type General Name', 'ana-enterprise' ),
			'singular_name'         => _x( 'Partner', 'Post Type Singular Name', 'ana-enterprise' ),
			'menu_name'             => __( 'Partners', 'ana-enterprise' ),
			'name_admin_bar'        => __( 'Partner', 'ana-enterprise' ),
			'archives'              => __( 'Partner Archives', 'ana-enterprise' ),
			'attributes'            => __( 'Partner Attributes', 'ana-enterprise' ),
			'parent_item_colon'     => __( 'Parent Partner:', 'ana-enterprise' ),
			'all_items'             => __( 'All Partners', 'ana-enterprise' ),
			'add_new_item'          => __( 'Add New Partner', 'ana-enterprise' ),
			'add_new'               => __( 'Add New', 'ana-enterprise' ),
			'new_item'              => __( 'New Partner', 'ana-enterprise' ),
			'edit_item'             => __( 'Edit Partner', 'ana-enterprise' ),
			'update_item'           => __( 'Update Partner', 'ana-enterprise' ),
			'view_item'             => __( 'View Partner', 'ana-enterprise' ),
			'view_items'            => __( 'View Partners', 'ana-enterprise' ),
			'search_items'          => __( 'Search Partner', 'ana-enterprise' ),
			'not_found'             => __( 'Not found', 'ana-enterprise' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'ana-enterprise' ),
			'featured_image'        => __( 'Featured Image', 'ana-enterprise' ),
			'set_featured_image'    => __( 'Set featured image', 'ana-enterprise' ),
			'remove_featured_image' => __( 'Remove featured image', 'ana-enterprise' ),
			'use_featured_image'    => __( 'Use as featured image', 'ana-enterprise' ),
			'insert_into_item'      => __( 'Insert into Partner', 'ana-enterprise' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Partner', 'ana-enterprise' ),
			'items_list'            => __( 'Partners list', 'ana-enterprise' ),
			'items_list_navigation' => __( 'Partners list navigation', 'ana-enterprise' ),
			'filter_items_list'     => __( 'Filter Partners list', 'ana-enterprise' ),
		);
		
		$args = array(
			'label'               => __( 'Partner', 'ana-enterprise' ),
			'description'         => __( 'Partner Description', 'ana-enterprise' ),
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
		
		register_post_type( 'partners', $args );
	}
}
