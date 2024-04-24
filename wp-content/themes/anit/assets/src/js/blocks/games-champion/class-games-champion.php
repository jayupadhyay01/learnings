<?php
/**
 * Registers the anitian/games-champion block.
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
 *  Class for the anitian/games-champion block.
 */
class Games_Champion extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'games-champion';
	}
}
