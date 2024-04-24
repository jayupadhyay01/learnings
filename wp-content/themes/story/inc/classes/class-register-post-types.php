<?php
/**
 * Register Post Types
 *
 * @package storyful
 */

namespace STORYFUL\Inc;

use STORYFUL\Inc\Traits\Singleton;

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
		add_action( 'init', array( $this, 'register_case_study_post_type' ), 0 );
		add_action( 'init', array( $this, 'register_testimonial_post_type' ), 0 );

	}


	/**
	 * Register Case Study custom post type.
	 */
	function register_case_study_post_type() {
		$labels = array(
			'name'                  => _x( 'Case Studies', 'Post Type General Name', 'storyful' ),
			'singular_name'         => _x( 'Case Study', 'Post Type Singular Name', 'storyful' ),
			'menu_name'             => __( 'Case Studies', 'storyful' ),
			'name_admin_bar'        => __( 'Case Study', 'storyful' ),
			'archives'              => __( 'Case Study Archives', 'storyful' ),
			'attributes'            => __( 'Case Study Attributes', 'storyful' ),
			'parent_item_colon'     => __( 'Parent Case Study:', 'storyful' ),
			'all_items'             => __( 'All Case Studies', 'storyful' ),
			'add_new_item'          => __( 'Add New Case Study', 'storyful' ),
			'add_new'               => __( 'Add New', 'storyful' ),
			'new_item'              => __( 'New Case Study', 'storyful' ),
			'edit_item'             => __( 'Edit Case Study', 'storyful' ),
			'update_item'           => __( 'Update Case Study', 'storyful' ),
			'view_item'             => __( 'View Case Study', 'storyful' ),
			'view_items'            => __( 'View Case Studies', 'storyful' ),
			'search_items'          => __( 'Search Case Study', 'storyful' ),
			'not_found'             => __( 'Not found', 'storyful' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'storyful' ),
			'featured_image'        => __( 'Featured Image', 'storyful' ),
			'set_featured_image'    => __( 'Set featured image', 'storyful' ),
			'remove_featured_image' => __( 'Remove featured image', 'storyful' ),
			'use_featured_image'    => __( 'Use as featured image', 'storyful' ),
			'insert_into_item'      => __( 'Insert into Case Study', 'storyful' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Case Study', 'storyful' ),
			'items_list'            => __( 'Case Studies list', 'storyful' ),
			'items_list_navigation' => __( 'Case Studies list navigation', 'storyful' ),
			'filter_items_list'     => __( 'Filter Case Studies list', 'storyful' ),
		);
		
		$args = array(
			'label'               => __( 'Case Study', 'storyful' ),
			'description'         => __( 'Case Study Description', 'storyful' ),
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
		
		register_post_type( 'case_study', $args );
	}

	/**
	 * Register Testimonial custom post type.
	 */
	function register_testimonial_post_type() {
		$labels = array(
			'name'                  => _x( 'Testimonials', 'Post Type General Name', 'storyful' ),
			'singular_name'         => _x( 'Testimonial', 'Post Type Singular Name', 'storyful' ),
			'menu_name'             => __( 'Testimonials', 'storyful' ),
			'name_admin_bar'        => __( 'Testimonial', 'storyful' ),
			'archives'              => __( 'Testimonial Archives', 'storyful' ),
			'attributes'            => __( 'Testimonial Attributes', 'storyful' ),
			'parent_item_colon'     => __( 'Parent Testimonial:', 'storyful' ),
			'all_items'             => __( 'All Testimonials', 'storyful' ),
			'add_new_item'          => __( 'Add New Testimonial', 'storyful' ),
			'add_new'               => __( 'Add New', 'storyful' ),
			'new_item'              => __( 'New Testimonial', 'storyful' ),
			'edit_item'             => __( 'Edit Testimonial', 'storyful' ),
			'update_item'           => __( 'Update Testimonial', 'storyful' ),
			'view_item'             => __( 'View Testimonial', 'storyful' ),
			'view_items'            => __( 'View Testimonials', 'storyful' ),
			'search_items'          => __( 'Search Testimonial', 'storyful' ),
			'not_found'             => __( 'Not found', 'storyful' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'storyful' ),
			'featured_image'        => __( 'Featured Image', 'storyful' ),
			'set_featured_image'    => __( 'Set featured image', 'storyful' ),
			'remove_featured_image' => __( 'Remove featured image', 'storyful' ),
			'use_featured_image'    => __( 'Use as featured image', 'storyful' ),
			'insert_into_item'      => __( 'Insert into Testimonial', 'storyful' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Testimonial', 'storyful' ),
			'items_list'            => __( 'Testimonials list', 'storyful' ),
			'items_list_navigation' => __( 'Testimonials list navigation', 'storyful' ),
			'filter_items_list'     => __( 'Filter Testimonials list', 'storyful' ),
		);
		
		$args = array(
			'label'               => __( 'Testimonial', 'storyful' ),
			'description'         => __( 'Testimonial Description', 'storyful' ),
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
