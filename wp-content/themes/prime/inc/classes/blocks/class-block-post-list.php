<?php
/**
 * Register Blog List Block.
 *
 * @package md-prime
 */

namespace MD_PRIME\Inc\Blocks;

use MD_PRIME\Inc\Traits\Singleton;
use WP_Query;

/**
 * Class for register blocks.
 */
class Block_Post_List {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {
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
		 *  Action to register block.
		 */
		add_action( 'init', array( $this, 'register_block' ) );
	}

	/**
	 * Register block.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_block() {

		register_block_type(
			'jay/postlist',
			array(
				'attributes'      => array(
					'postLimit'          => array(
						'type'    => 'number',
						'default' => 6,
					),
					'selectPostType'        => array(
						'type'    => 'string',
						'default' => 'post',
					),
				),
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}

	/**
	 * Render Callback
	 *
	 * @param attributes $attributes block attributes.
	 *
	 * @return string $html
	 * @since 1.0.0
	 */
	public function render_callback( $attributes ) {
		$postLimit         = ! empty( $attributes['postLimit'] ) ? $attributes['postLimit'] : 6;
		$selectPostType    = ! empty( $attributes['selectPostType'] ) ? $attributes['selectPostType'] : 'post';
		$args       = array(
			'post_type'      => $selectPostType,
			'post_status'    => 'publish',
			'order' 		 => 'DESC',
			'posts_per_page' => $postLimit,
		);
	
		$postQuery = new WP_query( $args );
		
		ob_start();
		?>
			<div class="post">
				<?php 
				if ( $postQuery->have_posts() ) {
                        while ( $postQuery->have_posts() ) {  
							$postQuery->the_post();
							?>
							<div class="main_post"> 
								<div class="post_img"> 
									<?php the_post_thumbnail('thumbnail'); ?>
								</div>
								<div class="post_content"> 
									<h2><?php the_title(); ?></h2>
									<?php the_content(); ?>
								</div>
								
								
							</div>

						 <?php }
				}
				?>
			</div>

		<?php
		$html = ob_get_clean();
		return $html;
	}
} 