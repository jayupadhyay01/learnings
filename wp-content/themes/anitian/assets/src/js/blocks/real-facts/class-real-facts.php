<?php
/**
 * Registers the anitian/real-facts block.
 *
 * @global array    $attrs   Block attributes passed to the render callback.
 * @global string   $content Block content from InnerBlocks passed to the render callback.
 * @global WP_Block $block   Block registration object.
 *
 * @package anitian
 */

namespace ANITIAN\Blocks;

use ANITIAN\Inc\Block_Base;

/**
 *  Class for the anitian/real-facts block.
 */
class Real_Facts extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'real-facts';
		// Enqueue external scripts
		wp_enqueue_script(
			'vimeo-api',
			'https://player.vimeo.com/api/player.js',
			array(),
			null,
			true
		);
	}
}
