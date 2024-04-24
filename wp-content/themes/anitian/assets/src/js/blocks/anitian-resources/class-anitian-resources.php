<?php
/**
 * Registers the anitian/anitian-resources block.
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
 *  Class for the anitian/anitian-resources block.
 */
class Anitian_Resources extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'anitian-resources';
	}
}
