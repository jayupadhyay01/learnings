<?php
/*
Plugin Name: Multisite Woo Product Sync
Description: Custom WPCLI command to sync WooCommerce products between sites in a multisite network.
Version: 1.0
Author: Jay Upadhyay
*/

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	class Sync_Products_Command extends WP_CLI_Command {

		/**
		 * Sync WooCommerce products between sites in a multisite network.
		 *
		 * ## OPTIONS
		 *
		 * [--site-from=<site-from>]
		 * : Source site to sync products from.
		 *
		 * [--site-to=<site-to>]
		 * : Destination site to sync products to.
		 *
		 * [--cat=<cat>]
		 * : Category slug for filtering products to sync.
		 *
		 * ## EXAMPLES
		 *
		 * wp sync-products --site-from=source-site --site-to=destination-site --cat=my-category
		 *
		 * @param array $args Command arguments.
		 * @param array $assoc_args Command associative arguments.
		 */
		public function sync( $args, $assoc_args ) {

			// Parse command arguments
			$site_from = isset( $assoc_args['site-from'] ) ? $assoc_args['site-from'] : '';
			$site_to   = isset( $assoc_args['site-to'] ) ? $assoc_args['site-to'] : '';
			$category  = isset( $assoc_args['cat'] ) ? $assoc_args['cat'] : '';

			// Check if sites exist
			$source_blog_id      = get_id_from_blogname( $site_from );
			$destination_blog_id = get_id_from_blogname( $site_to );

			if ( ! $source_blog_id ) {
				WP_CLI::error( "Source site '$site_from' does not exist." );
				return;
			}

			if ( ! $destination_blog_id ) {
				WP_CLI::error( "Destination site '$site_to' does not exist." );
				return;
			}

			// Get products from source site
			switch_to_blog( $source_blog_id );

			$args = array(
				'post_type'      => 'product',
				'posts_per_page' => -1,
				'product_cat'    => $category,
			);

			$products_query = new WP_Query( $args );
			$count = 0; 
			$batch_count = 1; 

			if ( $products_query->have_posts() ) {
				while ( $products_query->have_posts() ) {
					$products_query->the_post();
					$product_id = get_the_ID();
					$product    = wc_get_product( $product_id );

					// Prepare product data for insertion/update in destination site
					$product_data = array(
						'post_title'   => get_the_title(),
						'post_content' => get_the_content(),
						'post_excerpt' => get_the_excerpt(),
						'post_status'  => 'publish',
						'post_type'    => 'product',
					);

					// Add category information
					$categories = wp_get_post_terms( $product_id, 'product_cat', array( 'fields' => 'ids' ) );
					if ( ! empty( $categories ) ) {
						$product_data['product_cat'] = $categories;
						$category_slugs = array();
						foreach ( $categories as $cat_id ) {
							$cat = get_term( $cat_id, 'product_cat' );
							$category_slugs[] = $cat->slug;
						}
					} else {
						WP_CLI::line( 'No categories found for product ID: ' . $product_id );
					}

					// Get product meta
					$product_sku     = $product->get_sku();
					$product_price   = $product->get_price();
					$additional_meta = array(
						'_visibility'            => $product->get_catalog_visibility(),
						'_stock_status'          => $product->get_stock_status(),
						'total_sales'            => get_post_meta( $product_id, 'total_sales', true ),
						'_downloadable'          => $product->is_downloadable() ? 'yes' : 'no',
						'_virtual'               => $product->is_virtual() ? 'yes' : 'no',
						'_regular_price'         => $product->get_regular_price(),
						'_sale_price'            => $product->get_sale_price() ? $product->get_sale_price() : '',
						'_purchase_note'         => $product->get_purchase_note(),
						'_featured'              => $product->is_featured() ? 'yes' : 'no',
						'_weight'                => $product->get_weight(),
						'_length'                => $product->get_length(),
						'_width'                 => $product->get_width(),
						'_height'                => $product->get_height(),
						'_sku'                   => $product_sku,
						'_product_attributes'    => $product->get_attributes(),
						'_sale_price_dates_from' => $product->get_date_on_sale_from() ? strtotime( $product->get_date_on_sale_from() ) : '',
						'_sale_price_dates_to'   => $product->get_date_on_sale_to() ? strtotime( $product->get_date_on_sale_to() ) : '',
						'_price'                 => $product_price,
						'_sold_individually'     => $product->is_sold_individually() ? 'yes' : 'no',
						'_manage_stock'          => $product->managing_stock() ? 'yes' : 'no',
						'_backorders'            => $product->get_backorders(),
					);

					// Merge meta with product data
					$product_data = array_merge( $product_data, $additional_meta );

					// Product image
					$product_image_id = get_post_thumbnail_id( $product_id );
					if ( $product_image_id ) {
						$product_data['_thumbnail_id'] = $product_image_id;
					}

					switch_to_blog( $destination_blog_id );

					// If product already exists CHeck
					$existing_product = get_page_by_title( get_the_title(), OBJECT, 'product' );

					if ( $existing_product ) {
						// Product already exists, Update product meta
						foreach ( $product_data as $meta_key => $meta_value ) {
							update_post_meta( $existing_product->ID, $meta_key, $meta_value );
						}

                        // Update product type
                        $product_type = $product->get_type();
                        update_post_meta( $existing_product->ID, '_product_type', $product_type );

						// Update product image
						if ( isset( $product_data['_thumbnail_id'] ) ) {
							set_post_thumbnail( $existing_product->ID, $product_image_id );
						}

						$category_ids = array(); 
						foreach ( $category_slugs as $slug ) {
							// Check if category exists on the destination site
							$existing_term = get_term_by( 'slug', $slug, 'product_cat' );

							if ( $existing_term ) {
								// If the category exists, get its ID and add it to the category IDs array
								$category_ids[] = $existing_term->term_id;
							} else {
								// If the category doesn't exist, create on the destination site
								$new_term = wp_insert_term( $slug, 'product_cat' );

								if ( ! is_wp_error( $new_term ) && isset( $new_term['term_id'] ) ) {
									$category_ids[] = $new_term['term_id'];
								} else {
									WP_CLI::error( 'Error creating category: ' . $new_term->get_error_message() );
								}
							}
						}

						// Assign categories to the product on the destination site
						if ( ! empty( $category_ids ) ) {
							wp_set_object_terms( $existing_product->ID, $category_ids, 'product_cat' );
						} else {
							WP_CLI::line( 'No categories found for product ID: ' . $product_id );
						}

					} else {
						// Product does not exist, insert it
						$new_product_id = wp_insert_post( $product_data );
						if ( $new_product_id ) {
							// Set product meta
							foreach ( $product_data as $meta_key => $meta_value ) {
								add_post_meta( $new_product_id, $meta_key, $meta_value, true );
							}
                            // Set product type
                            $product_type = $product->get_type();
                            // print_r($variation_data);
                            update_post_meta( $new_product_id, '_product_type', $product_type );

                            switch ( $product_type ) {
                                case 'variable':
									$new_product = new WC_Product_Variable( $new_product_id );
									$variation_data = $product->get_available_variations();
									
									foreach ( $variation_data as $variation ) {
										$variation_id = $variation['variation_id'];
										$variation_obj = new WC_Product_Variation( $variation_id );
										$variation_stock_status = $variation_obj->get_stock_status();
										$variation_stock_quantity = $variation_obj->get_stock_quantity();
										if ($variation_stock_status === 'instock') {
											// If the variation is in stock, set the quantity
											$new_product->set_stock_quantity( $variation_stock_quantity, $variation_id );
										}
									}
                                    break;
                                case 'grouped':
                                    break;
                                case 'external':
                                    break;
                                default:
                                    $new_product = new WC_Product( $new_product_id );
                                    break;
                            }

							$new_product->set_regular_price( $product->get_regular_price() );
							$new_product->set_sale_price( $product->get_sale_price() );
							$new_product->save();

							$category_ids = array();
							foreach ( $category_slugs as $slug ) {
								// Check if the category exists on destination site
								$existing_term = get_term_by( 'slug', $slug, 'product_cat' );

								if ( $existing_term ) {
									// If the category exists, get its ID and add it to the category IDs array
									$category_ids[] = $existing_term->term_id;
								} else {
									$new_term = wp_insert_term( $slug, 'product_cat' );
									if ( ! is_wp_error( $new_term ) && isset( $new_term['term_id'] ) ) {
										$category_ids[] = $new_term['term_id'];
									} else {
										WP_CLI::error( 'Error creating category: ' . $new_term->get_error_message() );
									}
								}
							}

							// Assign categories to the product on the destination site
							if ( ! empty( $category_ids ) ) {
								wp_set_object_terms( $new_product_id, $category_ids, 'product_cat' );
							} else {
								WP_CLI::line( 'No categories found for product ID: ' . $product_id );
							}

							// Set product image
							if ( isset( $product_data['_thumbnail_id'] ) ) {
								set_post_thumbnail( $new_product_id, $product_image_id );
							}
							
						}
					}

					$count++;

					if ( $count % 3 === 0 || $count === $products_query->post_count ) {
						$batch_products = $count - (($batch_count - 1) * 3);
						sleep(1); 
						WP_CLI::success( "Successfully synced batch $batch_count. This batch synced $batch_products products." );
						$batch_count++; 
					}

					restore_current_blog();
				}
				wp_reset_postdata();
			} else {
				WP_CLI::error( "No products found in the source site '$site_from' for category '$category'." );
			}

			WP_CLI::success( "Products synced successfully. Total batches: " . ceil($count / 3) . ". Total products synced: $count" );


		}
	}

	// Register the command
	WP_CLI::add_command( 'sync-products', 'Sync_Products_Command' );
}
