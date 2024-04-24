<?php
/**
 * Class for custom work.
 *
 * @package Jay_WP_CLI_Admin
 */

/**
 * Exit if accessed directly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// If class is exist, then don't execute this.
if ( ! class_exists( 'Jay_WP_CLI_Admin' ) ) {
	
	/**
	 * Class for Activity Re-post.
	 */
	class Jay_WP_CLI_Admin {
		
		/**
		 * Constructor for class.
		 */
		public function __construct() {
			
			// Add cli init action.
			add_action( 'cli_init',  array( $this, 'ImportCSV_cli_register_command' ) );
			
		}
		
		/**
		 * Set user roles as an option.
		 *
		 * @param array $field
		 *
		 * @return array
		 */
		function ImportCSV_cli_register_command() {
			WP_CLI::add_command( 'bulkimport', array( $this, 'IMPORT_POSTS_CSV_CLI' ) );
		}
		
		public function IMPORT_POSTS_CSV_CLI( $args ) {
			
			$filename = $args[0]; //Dynamic file name through attribute
			$file = fopen(P_PATH.'documents/'.$filename, 'r'); // Read CSV File
			
			if ( ! $this->file = fopen(P_PATH.'documents/'.$filename, 'r') ) {

				return WP_CLI::error( 'unable to open file ' . $this->file . ', please check file!' );
	
			}
			if ( empty($filename) ) {
				return WP_CLI::error( 'Please add file name to open ');
			}
			
			$count = 0;   
			$total_count = 0; // Success Count
			$error_count = 0; // Error Count
			while ( ( $data = fgetcsv( $file ) ) !== FALSE ) {
				if( 0 === $count ) {   // remove headers
					$count++;
					continue;
				}
				
				$author_id =  !empty( $data[4] ) ? $data[4] : 1; // Author ID
				
				//$data is an array of the csv elements
				$postData = array(
					'post_title'    =>  $data[1],
					'post_content'  =>  $data[2],
					'post_status'   =>  $data[3],
					'post_type'     =>  $data[4],
					'post_author'   =>  $author_id,
				);
				
				$inserted_post = wp_insert_post( $postData ); // Insert post data into posts
				
				if( $inserted_post ) {
					WP_CLI::log( sprintf( "Imported Successfully: ". $data[1] ) );					

					if( 100 === $count ) {
						$count = 0;
						WP_CLI::log( sprintf( "Importing..." ) );
						sleep(2);
					}
					$total_count += 1 ;
					
				} else {
					$error_count = $data[0];
					WP_CLI::error( 'Error!!'. $data[1] );
					$error_count++;
				}
				
				$count++;
				
			}
			
			fclose( $file );
			if( $total_count > 1 ){
				WP_CLI::success( $total_count. ' Posts Generated Successfully' ); 
			} else {
				WP_CLI::success( $total_count. ' Post Generated Successfully' ); 
			}
			
			if( 0 !== $error_count){
				WP_CLI::error( WP_CLI::colorize( '%R'.$error_count . ' Posts not Generated!!%n' ) );
			}
			if( 0 == $error_count) {
				WP_CLI::success(  'All '.$total_count.' Posts are generated successfully' ); 
			}
			
			
		}
		
		
	}
	
	new Jay_WP_CLI_Admin();
}
