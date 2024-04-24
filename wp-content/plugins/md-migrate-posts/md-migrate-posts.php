<?php
/*
Plugin Name: Migrate Posts Third Party
Description: Migrate Posts from third party site to our site in Gutenberg block
Version: 1.0
Author: Jay Upadhyay
*/

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	class MD_Migrate_Posts_Command extends WP_CLI_Command {

		/**
		 * Migrate Posts from third party site.
		 *
		 * ## OPTIONS
		 *
		 * [--site-url=<site-url>]
		 * : Source site to fetch posts from.
		 *
		 * [--page-from=<page-from>]
		 * : Starting page number to fetch HTML content from.
		 *
		 * [--page-to=<page-to>]
		 * : Ending page number to fetch HTML content from.
		 *
		 * ## EXAMPLES
		 *
		 *  wp md_migrate_posts migrate --site-url=https://www.pointcentral.com/blog/ --page-from=1 --page-to=3
		 *
		 * @param array $args Command arguments.
		 * @param array $assoc_args Command associative arguments.
		 */
		public function migrate( $args, $assoc_args ) {

			// Parse command arguments
			$site_url  = isset( $assoc_args['site-url'] ) ? $assoc_args['site-url'] : '';
			$page_from = isset( $assoc_args['page-from'] ) ? intval( $assoc_args['page-from'] ) : 1;
			$page_to   = isset( $assoc_args['page-to'] ) ? intval( $assoc_args['page-to'] ) : 1;

			WP_CLI::line( 'Site URL: ' . $site_url );
			WP_CLI::line( 'Fetching HTML content from page ' . $page_from . ' to page ' . $page_to );

			if ( empty( $site_url ) ) {
				WP_CLI::error( 'Please provide the --site-url parameter.' );
				return;
			}

			// Fetch HTML content from each page within range
			$post_data     = array();
			$post_counter  = 0;
			$batch_counter = 0;
			for ( $page = $page_from; $page <= $page_to; $page++ ) {
				$page_url = $site_url . ( $page > 1 ? '/page/' . $page : '' );
				$response = wp_remote_get( $page_url );

				if ( is_wp_error( $response ) ) {
					WP_CLI::error( 'Failed to fetch content from ' . $page_url );
					continue;
				}

				$html_content = wp_remote_retrieve_body( $response );

				$dom = new DOMDocument();
				$dom->loadHTML( $html_content );

				$xpath = new DOMXPath( $dom );

				// Example: Extracting post titles and dates
				$post_title_elements = $xpath->query( '//div[@class="archive-article-title"]/a' );
				$post_date_elements  = $xpath->query( '//div[@class="archive-article-date"]' );

				foreach ( $post_title_elements as $index => $title_element ) {
					$post_title = $title_element->nodeValue;
					$post_url   = $title_element->getAttribute( 'href' );
					$post_date  = isset( $post_date_elements[ $index ] ) ? $post_date_elements[ $index ]->nodeValue : '';
					// Convert date format
					$converted_date = gmdate( 'Y-m-d H:i:s', strtotime( $post_date ) );

					// Fetch content from post URL
					$post_response = wp_remote_get( $post_url );
					if ( is_wp_error( $post_response ) ) {
						WP_CLI::warning( 'Failed to fetch content from ' . $post_url );
						$post_content = '';
					} else {
						$post_html_content = wp_remote_retrieve_body( $post_response );
						$post_dom          = new DOMDocument();
						$post_dom->loadHTML( $post_html_content );
						$post_xpath = new DOMXPath( $post_dom );

						// Fetching content from the title link of blog page and check the "wpb_text_column" class for content in the fetched link
						$post_content_elements = $post_xpath->query( '//div[contains(@class, "wpb_text_column") and contains(@class, "wpb_content_element") and not(contains(@class, "footer-address"))]/div[@class="wpb_wrapper"]' );
						$post_content          = '';
						foreach ( $post_content_elements as $content_element ) {
							// Process content recursively
							$this->processChildNodes( $content_element, $post_content );
						}

						// Fetching featured image
						$featured_image = '';
						$image_query    = $post_xpath->query( '//div[@class="page-header-bg-image"]' );
						if ( $image_query->length > 0 ) {
							$image_style = $image_query->item( 0 )->getAttribute( 'style' );
							preg_match( '/url\((.*?)\)/', $image_style, $matches );
							if ( isset( $matches[1] ) ) {
								$image_url = $matches[1];
								// Check if image already exists in media library
								$existing_image_id = $this->get_existing_image_id( $image_url );
								if ( $existing_image_id ) {
									$featured_image = $existing_image_id;
								} else {
									// Download image and add to media library
									$upload = wp_upload_bits( basename( $image_url ), null, file_get_contents( $image_url ) );
									if ( ! $upload['error'] ) {
										$attachment    = array(
											'post_mime_type' => $upload['type'],
											'post_title'   => preg_replace( '/\.[^.]+$/', '', basename( $image_url ) ),
											'post_content' => '',
											'post_status'  => 'inherit',
										);
										$attachment_id = wp_insert_attachment( $attachment, $upload['file'] );
										if ( ! is_wp_error( $attachment_id ) ) {
											require_once ABSPATH . 'wp-admin/includes/image.php';
											$attachment_data = wp_generate_attachment_metadata( $attachment_id, $upload['file'] );
											wp_update_attachment_metadata( $attachment_id, $attachment_data );
											$featured_image = $attachment_id;
										}
									}
								}
							}
						}
					}

					// Create posts
					$post_data[] = array(
						'post_title'     => $post_title,
						'post_date'      => $converted_date,
						'post_content'   => $post_content,
						'post_status'    => 'publish',
						'post_author'    => 1,
						'post_type'      => 'post',
						'featured_image' => $featured_image,
					);

					++$post_counter;

					if ( $post_counter % 10 === 0 ) {
						sleep( 1 );
						++$batch_counter;
						WP_CLI::line( 'Batch ' . $batch_counter . ' of 10 posts successfully inserted' );
					}
				}
			}

			// Remaining posts
			foreach ( $post_data as $data ) {
				$post_id = wp_insert_post( $data );
				if ( is_wp_error( $post_id ) ) {
					WP_CLI::error( 'Failed to insert post: ' . $data['post_title'] );
				} else {
					// Set featured image for the post
					if ( ! empty( $data['featured_image'] ) ) {
						set_post_thumbnail( $post_id, $data['featured_image'] );
					}
				}
			}

			WP_CLI::line( 'Total ' . count( $post_data ) . ' posts successfully inserted' );
			$last_batch_posts = $post_counter % 10;
			if ( $last_batch_posts !== 0 ) {
				++$batch_counter;
				WP_CLI::line( 'Total ' . $batch_counter . ' batches of 10 posts inserted' );
				WP_CLI::line( 'Last batch with ' . $last_batch_posts . ' posts inserted' );
			} else {
				WP_CLI::line( 'Total ' . $batch_counter . ' batches of 10 posts inserted' );
			}
		}

		/**
		 * Get existing image ID from the media library based on the image URL.
		 *
		 * @param string $image_url The URL of the image.
		 * @return int|false Existing image ID or false if not found.
		 */
		private function get_existing_image_id( $image_url ) {
			global $wpdb;
			$attachment_id = $wpdb->get_var(
				$wpdb->prepare(
					"SELECT ID FROM $wpdb->posts WHERE guid = %s",
					$image_url
				)
			);
			return $attachment_id ? $attachment_id : false;
		}

		/**
		 * Recursively process child nodes to handle anchor links inside paragraphs and headings.
		 *
		 * @param DOMNode $node The current node to process.
		 * @param string  $content The content string to append the processed content.
		 */
		private function processChildNodes( $node, &$content ) {
			foreach ( $node->childNodes as $childNode ) {
				if ( $childNode->nodeType === XML_ELEMENT_NODE ) {
					$tag_name = $childNode->tagName;
					if ( $tag_name === 'a' ) {
						// If anchor link found
						$anchor_href = $childNode->getAttribute( 'href' );
						$anchor_text = $childNode->nodeValue;
						// Insert anchor link with appropriate formatting inside paragraph block
						$content .= '<a href="' . $anchor_href . '" target="_blank" rel="noopener">' . $anchor_text . '</a>';
					} elseif ( preg_match( '/^h[1-6]$/', $tag_name ) ) {
						// If it's a heading, handle it accordingly
						$heading_level = substr( $tag_name, 1 );
						// Insert heading block with formatting
						$content .= '<!-- wp:heading {"level":' . $heading_level . '} -->';
						$content .= '<' . $tag_name . '>' . $childNode->nodeValue . '</' . $tag_name . '>';
						$content .= '<!-- /wp:heading -->';
					} else {
						// For other tags, continue processing
						$content .= '<!-- wp:paragraph -->';
						$content .= '<p>';
						$this->processChildNodes( $childNode, $content );
						$content .= '</p>';
						$content .= '<!-- /wp:paragraph -->';
					}
				} elseif ( $childNode->nodeType === XML_TEXT_NODE ) {
					// If it's a text node, append its content
					$content .= $childNode->nodeValue;
				}
			}
		}
	}

	// Register the command
	WP_CLI::add_command( 'md_migrate_posts', 'MD_Migrate_Posts_Command' );
}
