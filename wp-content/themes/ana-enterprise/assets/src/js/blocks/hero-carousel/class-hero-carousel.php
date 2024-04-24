<?php
/**
 * Registers the ana-enterprise/sample block.
 *
 * @global array    $attrs   Block attributes passed to the render callback.
 * @global string   $content Block content from InnerBlocks passed to the render callback.
 * @global WP_Block $block   Block registration object.
 *
 * @package ana-enterprise
 */

namespace ANA_ENTERPRISE\Blocks;

use ANA_ENTERPRISE\Inc\Block_Base;

/**
 *  Class for the ana-enterprise/sample block.
 */
class Hero_Carousel extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'hero-carousel';
	}
}
