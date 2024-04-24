<?php
/**
 * Plugin Name: SEO Migration
 * Description: Custom WP CLI command to import pages from a CSV file with SEO data.
 * Version: 1.0
 * Author: Jay Upadhyay
 */

if ( defined( 'WP_CLI' ) && WP_CLI ) {

    /**
     * Import pages from a CSV file.
     *
     * ## OPTIONS
     *
     * <csv_path>
     * : Path to the CSV file.
     *
     * ## EXAMPLES
     *
     * wp seo-migration import-pages /path/to/your/file.csv
     *
     * @param array $args Command arguments.
     * @param array $assoc_args Command options.
     */
    $csv_import_callback = function( $args, $assoc_args ) {

        $csv_path = isset( $args[0] ) ? $args[0] : '';

        if ( empty( $csv_path ) || ! file_exists( $csv_path ) ) {
            WP_CLI::error( 'Invalid CSV file path.' );
        }

        $handle = fopen( $csv_path, 'r' );

        if ( $handle !== false ) {
            $csv_headers = fgetcsv( $handle, 0, ';' );
            $batch_count = 0;
            $total_pages = 0;
            $batch_size = 50;

            // Count total lines in the CSV file
            $total_lines = count(file($csv_path));

            // Create progress bar
            $progress = \WP_CLI\Utils\make_progress_bar( 'Importing Pages', $total_lines );

            while (($data = fgetcsv($handle, 0, ';')) !== false) {

                $page_title = isset($data[0]) ? $data[0] : '';
                $page_slug = isset($data[2]) ? $data[2] : '';
                $page_meta_desc = isset($data[3]) ? $data[3] : '';
                $page_meta_title = isset($data[4]) ? $data[4] : '';
                $page_meta_focus_kw = isset($data[5]) ? $data[5] : '';
                $page_status = isset($data[6]) ? $data[6] : 'publish';

                // Trim meta fields to remove any extra whitespace
                $page_meta_desc = trim($page_meta_desc);
                $page_meta_title = trim($page_meta_title);
                $page_meta_focus_kw = trim($page_meta_focus_kw);

                $page_id = wp_insert_post(array(
                    'post_title' => $page_title,
                    'post_name' => $page_slug,
                    'post_type' => 'page',
                    'post_content' => '',
                    'post_excerpt' => '',
                    'post_status' => $page_status,
                ));

                if (is_wp_error($page_id)) {
                    WP_CLI::error('Error importing page: ' . $page_id->get_error_message());
                }

                // Update meta fields only if not empty
                if (!empty($page_meta_desc)) {
                    update_post_meta($page_id, '_yoast_wpseo_metadesc', $page_meta_desc);
                }
                if (!empty($page_meta_title)) {
                    update_post_meta($page_id, '_yoast_wpseo_title', $page_meta_title);
                }
                if (!empty($page_meta_focus_kw)) {
                    update_post_meta($page_id, '_yoast_wpseo_focuskw', $page_meta_focus_kw);
                }

                $total_pages++;
                $batch_count++;

                // Check batch size
                if ($batch_count === $batch_size) {
                    WP_CLI::success('Batch ' . ceil($total_pages / $batch_size) . ' with ' . $batch_size . ' pages added.');
                    $batch_count = 0;
                    sleep(1);
                }

                // Increment progress bar
                $progress->tick();
            }

            // Last batch
            if ($batch_count > 0) {
                WP_CLI::success('Last batch with ' . $batch_count . ' pages added.');
            }

            // Finish progress bar
            $progress->finish();

            fclose( $handle );
        } else {
            WP_CLI::error( 'Error opening CSV file.' );
        }

        WP_CLI::success( 'Import completed. Total number of pages inserted: ' . $total_pages );
    };

    WP_CLI::add_command( 'seo-migration import-pages', $csv_import_callback );
}
