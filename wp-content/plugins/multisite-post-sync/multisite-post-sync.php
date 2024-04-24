<?php
/*
Plugin Name: Multisite Post Sync
Description: Custom WP-CLI command to sync posts between multisites.
Version: 1.0
Author: Jay Upadhyay
*/

if ( defined( 'WP_CLI' ) && WP_CLI ) {
    class Multisite_Post_Sync_Command {

        /**
         * Sync posts from one multisite to another multisite.
         *
         * @param array $args       Positional arguments.
         * @param array $assoc_args Associative arguments.
         */
        public function sync( $args, $assoc_args ) {
            $source_site_id = $assoc_args['site-from'];
            $destination_site_id = $assoc_args['site-to'];
        
            // Check if source and destination sites are different
            if ( $source_site_id === $destination_site_id ) {
                WP_CLI::error( 'Source and destination sites cannot be the same.' );
                return;
            }
        
            WP_CLI::line( "Source Site ID: $source_site_id" );
            WP_CLI::line( "Destination Site ID: $destination_site_id" );
        
        
            if ( ! $source_site_id || ! $destination_site_id ) {
                WP_CLI::error( 'Invalid source or destination site.' );
                return;
            }
        
            switch_to_blog( $source_site_id );
        
            $posts_query = new WP_Query( array(
                'post_type' => 'post',
                'posts_per_page' => -1,
                'post_status' => 'publish',
                'fields' => 'ids',
            ) );

            if ( $posts_query->have_posts() ) {
                $i = 0;
                $batch_count = 0; 
                foreach ( $posts_query->posts as $post_id ) {
                    $post = get_post( $post_id );
                    $post_meta = get_post_meta( $post_id );
                    $post_categories = wp_get_post_categories( $post_id );
        
                    // Create a copy of the post on the destination site
                    switch_to_blog( $destination_site_id );
        
                    // Check if the post already exists on the destination site
                    $existing_post = get_page_by_title( $post->post_title, OBJECT, 'post' );
        
                    $post_data = array(
                        'post_title' => $post->post_title,
                        'post_content' => $post->post_content,
                        'post_status' => $post->post_status,
                        'post_author' => $post->post_author,
                        'post_type' => $post->post_type,
                        'post_date' => $post->post_date,
                        'post_date_gmt' => $post->post_date_gmt,
                    );
        
                    if ( $existing_post ) {
                        // Post exists, update content and meta
                        $post_data['ID'] = $existing_post->ID;
                        $update_result = wp_update_post( $post_data );
                        if ( is_wp_error( $update_result ) ) {
                            WP_CLI::warning( 'Error updating post: ' . $update_result->get_error_message() );
                        } else {
                            WP_CLI::line( "Post updated: {$existing_post->ID}" );
                        }
        
                        $meta_update_errors = false;
                        foreach ( $post_meta as $meta_key => $meta_values ) {
                            foreach ( $meta_values as $meta_value ) {
                                $meta_update_result = update_post_meta( $existing_post->ID, $meta_key, $meta_value );
                                if ( ! $meta_update_result ) {
                                    $meta_update_errors = true;
                                }
                            }
                        }
                        // Warning message for meta update
                        if ( $meta_update_errors ) {
                            WP_CLI::warning( 'Error updating meta for post ' . $existing_post->ID );
                        }
        
                        //Post categories
                        $assigned_categories = array();
                        foreach ( $post_categories as $category_id ) {
                            $category = get_category( $category_id );
                            $existing_category = get_category_by_slug( $category->slug );
                            if ( ! $existing_category ) {
                                $new_category_id = wp_create_category( $category->name );
                                if ( is_wp_error( $new_category_id ) ) {
                                    WP_CLI::warning( 'Error creating new category: ' . $new_category_id->get_error_message() );
                                } else {
                                    $assigned_categories[] = $new_category_id;
                                }
                            } else {
                                $assigned_categories[] = $existing_category->term_id;
                            }
                        }
                        $category_assignment_result = wp_set_post_categories( $existing_post->ID, $assigned_categories );
                        if ( is_wp_error( $category_assignment_result ) ) {
                            WP_CLI::warning( 'Error assigning categories to post ' . $existing_post->ID . ': ' . $category_assignment_result->get_error_message() );
                        }
                    } else {
                        // New post
                        $new_post_id = wp_insert_post( $post_data );
        
                        if ( is_wp_error( $new_post_id ) ) {
                            WP_CLI::warning( 'Error inserting new post: ' . $new_post_id->get_error_message() );
                        } else {
                            WP_CLI::line( "New post inserted: $new_post_id" );
        
                            foreach ( $post_meta as $meta_key => $meta_values ) {
                                foreach ( $meta_values as $meta_value ) {
                                    $meta_insert_result = add_post_meta( $new_post_id, $meta_key, $meta_value );
                                    if ( ! $meta_insert_result ) {
                                        WP_CLI::warning( 'Error adding meta for post ' . $new_post_id );
                                    }
                                }
                            }
        
                            // Assign post categories
                            $assigned_categories = array();
                            foreach ( $post_categories as $category_id ) {
                                $category = get_category( $category_id );
                                $existing_category = get_category_by_slug( $category->slug );
                                if ( ! $existing_category ) {
                                    $new_category_id = wp_create_category( $category->name );
                                    if ( is_wp_error( $new_category_id ) ) {
                                        WP_CLI::warning( 'Error creating new category: ' . $new_category_id->get_error_message() );
                                    } else {
                                        $assigned_categories[] = $new_category_id;
                                    }
                                } else {
                                    $assigned_categories[] = $existing_category->term_id;
                                }
                            }
                            $category_assignment_result = wp_set_post_categories( $new_post_id, $assigned_categories );
                            if ( is_wp_error( $category_assignment_result ) ) {
                                WP_CLI::warning( 'Error assigning categories to post ' . $new_post_id . ': ' . $category_assignment_result->get_error_message() );
                            }
                        }
                    }
                    $i++;
                    if ($i === 3) {
                        WP_CLI::success( 'Batch of 3 success' );
                        $batch_count++;
                        $i = 0;
                        sleep(1);
                    }
                   
                    restore_current_blog();
                }
                if ($i > 0) { 
                    WP_CLI::success( "Batch of $i success" );
                    $batch_count++;
                }
                WP_CLI::success( "Total $batch_count batches synced successfully." );
            }
            
        }
    
    }

    WP_CLI::add_command( 'multisite-post-sync', 'Multisite_Post_Sync_Command' );
}
