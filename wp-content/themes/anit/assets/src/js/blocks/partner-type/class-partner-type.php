<?php
/**
 * Registers the anitian/partner-type block.
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
 *  Class for the anitian/partner-type block.
 */
class Partner_Type extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'partner-type';
	}
}
