<?php
/**
 * Dynamic Blocks.
 *
 * @package md-prime
 */

namespace MD_PRIME\Inc;

use MD_PRIME\Inc\Traits\Singleton;

/**
 * Class Blocks
 */
class Blocks {
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
		 * Load blocks classes.
		 */
		Blocks\Block_Sample_Dynamic::get_instance();
		Blocks\Block_News::get_instance();
		Blocks\Block_Post_List::get_instance();
	}

}
