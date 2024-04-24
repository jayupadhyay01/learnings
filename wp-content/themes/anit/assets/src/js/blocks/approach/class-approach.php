<?php
/**
 * Registers the anitian/approach block.
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
 *  Class for the anitian/approach block.
 */
class Approach extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'approach';
	}
}
