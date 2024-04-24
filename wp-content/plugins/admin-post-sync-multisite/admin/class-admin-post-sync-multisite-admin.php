<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://https://profiles.wordpress.org/jayupadhyay01/
 * @since      1.0.0
 *
 * @package    Admin_Post_Sync_Multisite
 * @subpackage Admin_Post_Sync_Multisite/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Admin_Post_Sync_Multisite
 * @subpackage Admin_Post_Sync_Multisite/admin
 * @author     Jay Upadhyay <jay.upadhyay@multidots.com>
 */
class Admin_Post_Sync_Multisite_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
		add_action( 'add_meta_boxes', array( $this, 'admin_post_sync_multisite_post_register_meta_box' ) );
		add_action( 'save_post', array( $this, 'admin_post_sync_multisite_post_to_all_sites' ), 20, 2 );
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Admin_Post_Sync_Multisite_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Admin_Post_Sync_Multisite_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_style( 'admin-post-sync-multisite-select2', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css', array(), 'all' );
		// wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/select2.min.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/admin-post-sync-multisite-admin.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Admin_Post_Sync_Multisite_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Admin_Post_Sync_Multisite_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		wp_enqueue_script( 'admin-post-sync-multisite-select2', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js', array(), '1.0', false );
		// wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/select2.min.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/admin-post-sync-multisite-admin.js', array( 'jquery' ), $this->version, false );
		wp_localize_script(
			$this->plugin_name,
			'ajaxObject',
			array(
				'ajax_url'   => admin_url( 'admin-ajax.php' ),
				'ajax_nonce' => wp_create_nonce( 'multisite_post_nonce' ),
			)
		);
	}

	/**
	 * Register Metabox.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function admin_post_sync_multisite_post_register_meta_box() {
		add_meta_box( 'meta_subsites', 'Subsites', array( $this, 'admin_post_sync_multisite_subsites_meta_box' ), 'post', 'normal', 'high' );
		add_meta_box( 'meta_post_cats', 'Categories', array( $this, 'admin_post_sync_multisite_metabox_categories_callback' ), 'post', 'normal' );
		add_meta_box( 'meta_post_tags', 'Tags', array( $this, 'admin_post_sync_multisite_metabox_tags_callback' ), 'post', 'normal' );
	}

	/**
	 * Callback function for subsites Metabox.
	 *
	 * @param object $post post.
	 * @return void
	 * @since 1.0.0
	 */
	public function admin_post_sync_multisite_subsites_meta_box( $post ) {
		wp_nonce_field( 'subsites_meta_box_nonce', 'meta_box_ss_nonce' );
		$subsites           = get_sites();
		$meta_element_class = get_post_meta( $post->ID, '_meta_subsite', true );
		?>
		<label for="meta_subsite">
		<?php echo esc_html__( 'Select Multisite: ', 'admin-post-sync-multisite' ); ?>
		</label>

		<select class="meta_subsites" name="meta_subsites" id="meta_subsites">
			<option value=" "><?php echo esc_html( 'Select' ); ?></option>
			<?php
			foreach ( $subsites as $subsite ) {
				$subsite_id   = get_object_vars( $subsite )['blog_id'];
				$subsite_name = get_blog_details( $subsite_id )->blogname;
				if ( $subsite_id > 1 ) {
					?>
						<option value="<?php echo esc_attr( $subsite_id ); ?>" <?php echo selected( $meta_element_class, $subsite_id ); ?>><?php echo esc_html( $subsite_name ); ?></option>
						<?php
				}
			}
			?>
		</select>
		<?php
	}

	/**
	 * Callback function for categories Metabox.
	 *
	 * @param object $post post.
	 * @return void
	 * @since 1.0.0
	 */
	public function admin_post_sync_multisite_metabox_categories_callback( $post ) {
		wp_nonce_field( 'categories_meta_box_nonce', 'meta_box_cat_nonce' );
		?>
		<label for="meta_categories">
			<?php echo esc_html__( 'Select Categories: ', 'admin-post-sync-multisite' ); ?>
		</label>
		<select class="meta_categories" name="meta_categories[]" id="meta_categories" multiple>
		</select>
		<?php
	}

	/**
	 * Callback function for tags Metabox.
	 *
	 * @param object $post post.
	 * @return void
	 * @since 1.0.0
	 */
	public function admin_post_sync_multisite_metabox_tags_callback( $post ) {
		wp_nonce_field( 'tags_meta_box_nonce', 'meta_box_tag_nonce' );
		?>
		<label for="meta_tags">
			<?php echo esc_html__( 'Select Tags: ', 'admin-post-sync-multisite' ); ?>
		</label>
		<select class="meta_tags" name="meta_tags[]" id="meta_tags" multiple>
		</select>
		<?php
	}

	/**
	 * Function for saving posts meta.
	 *
	 * @param int    $original_post_id post id.
	 * @param object $original_post original_post.
	 * @since 1.0.0
	 */
	public function admin_post_sync_multisite_post_to_all_sites( $original_post_id, $original_post ) {
		if ( ! isset( $_POST['meta_box_ss_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['meta_box_ss_nonce'] ), 'subsites_meta_box_nonce' ) ) {
			return;
		}
		if ( isset( $_POST['meta_subsites'] ) ) {
			$meta_subsite = sanitize_text_field( $_POST['meta_subsites'] );
			update_post_meta( $original_post_id, '_meta_subsite', $meta_subsite );
		}

		$selected_categories = filter_input( INPUT_POST, 'meta_categories', FILTER_SANITIZE_NUMBER_INT, FILTER_REQUIRE_ARRAY );

		if ( isset( $selected_categories ) && is_array( $selected_categories ) ) {
			// Get the ID of the default "Uncategorized" category
			$uncategorized_id = get_option( 'default_category' );

			// Remove default "Uncategorized" if it's not selected
			if ( ! in_array( $uncategorized_id, $selected_categories, true ) ) {
				$selected_categories = array_diff( $selected_categories, array( $uncategorized_id ) );
			}
			update_post_meta(
				$original_post_id,
				'_meta_selected_categories',
				$selected_categories
			);

			// Remove the default category from the post if it's not selected
			if ( ! in_array( $uncategorized_id, $selected_categories, true ) ) {
				$current_categories = wp_get_post_categories( $original_post_id );
				if ( false !== ( $key = array_search( $uncategorized_id, $current_categories ) ) ) {
					unset( $current_categories[ $key ] );
					wp_set_post_categories( $original_post_id, $current_categories );
				}
			}
		} else {
			update_post_meta(
				$original_post_id,
				'_meta_selected_categories',
				array()
			);
			// Remove the default category from the post
			wp_remove_object_terms( $original_post_id, $uncategorized_id, 'category' );
		}

		$selected_tags = filter_input( INPUT_POST, 'meta_tags', FILTER_SANITIZE_STRING, FILTER_REQUIRE_ARRAY );

		if ( isset( $selected_tags ) && is_array( $selected_tags ) ) {
			// Update post meta with selected tags
			update_post_meta(
				$original_post_id,
				'_meta_selected_tags',
				$selected_tags
			);
		} else {
			// If no tags are selected, update post meta with an empty array
			update_post_meta(
				$original_post_id,
				'_meta_selected_tags',
				array()
			);
		}

		// do not publish revisions
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $original_post_id;
		}

		// actually we need only "publish" status
		if ( 'publish' !== get_post_status( $original_post ) ) {
			return $original_post_id;
		}

		// prevent "Fatal error: Maximum function nesting level reached"
		remove_action( 'save_post', __FUNCTION__ );

		// here you have to specify blog IDs where you would like to publish the posts
		$blog_id = get_post_meta( $original_post_id, '_meta_subsite', true );

		// let's get this post data as an array
		$post_data = array(
			'post_author'   => $original_post->post_author,
			'post_date'     => $original_post->post_date,
			'post_modified' => $original_post->post_modified,
			'post_content'  => $original_post->post_content,
			'post_title'    => $original_post->post_title,
			'post_excerpt'  => $original_post->post_excerpt,
			'post_status'   => 'publish',
			'post_name'     => $original_post->post_name,
			'post_type'     => $original_post->post_type,
		);

		$thumbnail_url = get_the_post_thumbnail_url( $original_post_id, 'post' );
		// Check if a featured image is selected on the main site post
		$has_featured_image = ! empty( $thumbnail_url );
		$img_files          = array();
		$content            = $original_post->post_content;
		$regex              = '/src="([^"]*)"/';
		preg_match_all( $regex, $content, $matches );

		foreach ( $matches[1] as $file ) {
			$img_files[] = $file;
		}

		if ( $thumbnail_url ) {
			$img_files[] = $thumbnail_url;
		}
		$post_cats          = wp_get_object_terms( $original_post_id, 'category', array( 'fields' => 'names' ) );
		$post_tags          = wp_get_object_terms( $original_post_id, 'post_tag', array( 'fields' => 'names' ) );
		$subsite_cats_array = get_post_meta( $original_post_id, '_meta_selected_categories', true );
		$subsite_tags_array = get_post_meta( $original_post_id, '_meta_selected_tags', true );

		switch_to_blog( $blog_id );

		// if post with the same slug exists, do nothing
		if ( get_posts(
			array(
				'name'        => $post_data['post_name'],
				'post_type'   => $post_data['post_type'],
				'post_status' => 'publish',
			)
		) ) {
			restore_current_blog();
			return true;
		}

		$inserted_post_id = wp_insert_post( $post_data );

		foreach ( $img_files as $file ) {
			$this->admin_post_sync_multisite_img_to_subsite( $file, $inserted_post_id );
		}

		if ( ! empty( $subsite_cats_array ) ) {
			foreach ( $subsite_cats_array as $subsite_cat ) {
				wp_set_object_terms( $inserted_post_id, intval( $subsite_cat ), 'category', true );
			}
		} else {
			wp_set_object_terms( $inserted_post_id, $post_cats, 'category', false );
		}

		if ( ! empty( $subsite_tags_array ) ) {
			foreach ( $subsite_tags_array as $subsite_tag ) {
				wp_set_object_terms( $inserted_post_id, intval( $subsite_tag ), 'post_tag', true );
			}
		} else {
			wp_set_object_terms( $inserted_post_id, $post_tags, 'post_tag', false );
		}

		// If a featured image is selected, proceed to set it for the subsite post
		if ( $has_featured_image ) {
			// Set post thumbnail to new post on the subsite
			$thumbnail_name = pathinfo( basename( $thumbnail_url ), PATHINFO_FILENAME );
			$attachment     = get_posts(
				array(
					'name'        => $thumbnail_name,
					'post_type'   => 'attachment',
					'post_parent' => 'post',
				)
			);
			$attachment_id  = $attachment[0]->ID;
			set_post_thumbnail( $inserted_post_id, $attachment_id );
		}

		$attachment_id = $attachment[0]->ID;
		set_post_thumbnail( $inserted_post_id, $attachment_id );

		$new_created_post = get_post( $inserted_post_id );
		$new_post_content = $new_created_post->post_content;
		$regex            = '/src="([^"]*)"/';
		preg_match_all( $regex, $new_post_content, $img_array );
		$uploads_dir = wp_upload_dir();

		foreach ( $img_array['1'] as $image ) {
			$filename         = basename( $image );
			$new_file_url     = $uploads_dir['url'] . "/$filename";
			$new_post_content = str_replace( $image, $new_file_url, $new_post_content );
		}

		$main_url        = network_site_url();
		$subsite_url     = get_site_url();
		$updated_content = str_replace( $main_url, $subsite_url . '/', $new_post_content );

		if ( ! empty( $new_post_content ) ) {
			wp_update_post(
				array(
					'ID'           => $inserted_post_id,
					'post_content' => $new_post_content,
				)
			);
		}

		restore_current_blog();
	}

	/**
	 * Function for adding images to subsite and setting featured image.
	 *
	 * @param string $file File path of the image.
	 * @param int    $post_id Post ID to set the featured image for.
	 * @return int|bool The ID of the inserted attachment or false if failed.
	 * @since 1.0.0
	 */
	public function admin_post_sync_multisite_img_to_subsite( $file, $post_id ) {
		// Get the uploads directory
		$uploads = wp_upload_dir();

		// Generate a unique filename
		$filename = wp_unique_filename( $uploads['path'], basename( $file ) );

		// Define the paths for the original and new files
		$original_file = $file;
		$new_file      = $uploads['path'] . "/$filename";

		// Attempt to copy the media file to the new location
		$copy_success = copy( $original_file, $new_file );

		// Check if the copy operation was successful
		if ( ! $copy_success ) {
			// If copying failed, return false
			return false;
		}

		// Generate the URL for the new file
		$new_file_url = $uploads['url'] . "/$filename";

		// Insert the media file into the media gallery
		$inserted_attachment_id = wp_insert_attachment(
			array(
				'guid'           => $new_file_url,
				'post_mime_type' => mime_content_type( $new_file ),
				'post_title'     => preg_replace( '/\.[^.]+$/', '', $filename ),
				'post_content'   => '',
				'post_status'    => 'inherit',
			),
			$new_file
		);

		// Update the attachment metadata
		require_once ABSPATH . 'wp-admin/includes/image.php';
		wp_update_attachment_metadata(
			$inserted_attachment_id,
			wp_generate_attachment_metadata( $inserted_attachment_id, $new_file )
		);

		// Set the inserted attachment as the featured image for the post
		if ( $post_id && $inserted_attachment_id ) {
			set_post_thumbnail( $post_id, $inserted_attachment_id );
		}

		// Return the ID of the inserted attachment
		return $inserted_attachment_id;
	}



	/**
	 * Function for adding images to subsite.
	 *
	 * @since 1.0.0
	 */
	public function admin_post_sync_multisite_subsites_data_callback() {
		if ( ! isset( $_GET['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_GET['nonce'] ), 'multisite_post_nonce' ) ) {
			return;
		}
		$sub_site     = isset( $_GET['sub_site'] ) ? sanitize_text_field( $_GET['sub_site'] ) : '';
		$result_array = array();
		switch_to_blog( intval( $sub_site ) );
		$cat_args             = array(
			'hide_empty' => false,
		);
		$categories           = get_categories( $cat_args );
		$tag_args             = array(
			'hide_empty' => false,
		);
		$tags                 = get_tags( $tag_args );
		$result_array['cats'] = $categories;
		$result_array['tags'] = $tags;
		echo wp_json_encode( $result_array );
		restore_current_blog();
		die();
	}
}
