<?php
/**
 * Registers the storyful/testimonial block.
 *
 * @global array    $attrs   Block attributes passed to the render callback.
 * @global string   $content Block content from InnerBlocks passed to the render callback.
 * @global WP_Block $block   Block registration object.
 *
 * @package storyful
 */

namespace STORYFUL\Blocks;

use STORYFUL\Inc\Block_Base;

/**
 *  Class for the storyful/testimonial block.
 */
class Testimonial extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'testimonial';
	}
}
