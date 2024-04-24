<?php
/**
 * Registers the storyful/our-mission block.
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
 *  Class for the storyful/our-mission block.
 */
class Our_Mission extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'our-mission';
	}
}