<?php
/**
 * Register Dynamic Sample Block.
 *
 * @package md-prime
 */
namespace MD_PRIME\Inc\Blocks;

use MD_PRIME\Inc\Traits\Singleton;

/**
 * Class for register blocks.
 */
class Block_News {

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
			'md-prime/news2',
			array(
				'attributes'      => array(
					'postPerPage' => array(
						'type'    => 'number',
						'default' => 6,
					),
					'title' => array(
						'type' => 'string',
						'default' => 'News'
					),
					'buttonLabel' => array(
						'type' => 'string',
						'default' => 'Learn More'
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
		$class_name = 'wp-block-sample-dynamic';
		$heading    = ! empty( $attributes['heading'] ) ? $attributes['heading'] : '';
		$postperpage = isset( $attributes['postPerPage'] ) && ! empty( $attributes['postPerPage'] ) ? $attributes['postPerPage'] : 3; 
        $label  = isset( $attributes['buttonLabel'] ) && ! empty( $attributes['buttonLabel'] ) ? $attributes['buttonLabel'] : 'Learn More';
        $title  = isset( $attributes['title'] ) && ! empty( $attributes['title'] ) ? $attributes['title'] : '';

		$cache_key  = 'news-' . $postperpage;
    
        $blockquery = get_transient( $cache_key );
    
        if ( false === $blockquery || is_user_logged_in() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
            
            $args       = array(
                'posts_per_page' => $postperpage,
                'post_type'      => 'news',
                'post_status'    => 'publish',
				'order' 		 => 'DESC',
            );
        
            $blockquery = new \WP_query( $args );
        }
		ob_start();
		?>

		<div class="news_container section-col wp-block-column">
			<h2 class="has-text-align-center heading-spacing"><?php echo esc_html($title); ?></h2>
		<form class="sort-dropdown">
			<div class="news-sorting-wrapper">
				<label for="sort-category">Sort by</label><br>
				<select class="sort-category" id="sort-category">
					<option post-per-page="<?php echo esc_attr($postperpage); ?>" value="" button-label="<?php echo esc_attr($label); ?>">Select All</option>
					<?php 
					$taxonomy = 'news_category';
					$terms = get_terms([
						'taxonomy' => $taxonomy,
						'hide_empty' => false,
					]);
					foreach ($terms as $term) :
						echo esc_html($term->name);
						echo '<option post-per-page="'.esc_attr($postperpage).'" button-label="'.esc_attr($label).'" value="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</option>';
					endforeach;	?>
					</select>
					<span class="select-triangle-down">&nbsp;</span>
				</div>
			</form>
			<div class="section-col">
				<div class="news-loding" style="display: none;">
					<img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/loading-spinner.gif"/>
				</div>
                <div class="row news-sortable">
                    <?php
						$break_after = 3;
						$counter = 0;
                    if ( $blockquery->have_posts() ) {
                        while ( $blockquery->have_posts() ) {
                            
                            $blockquery->the_post();
							$news_title      = get_the_title();
							$news_content = get_the_content();
							$news_ext_url = get_the_permalink();
							$static_img = '<img alt="news" src="'.get_template_directory_uri().'/assets/img/opry-entertainmentnews.jpeg"/>';
							?>
                            <div class="news_wrapper" data-sort-id="<?php echo get_the_ID(); ?>">
								<div class="news_img">
									<a href="<?php echo esc_url($news_ext_url); ?>"><?php echo !empty(get_the_post_thumbnail()) ? get_the_post_thumbnail() : wp_kses_post($static_img); ?></a>
								</div>

								<div class="news_column">
                                    <?php
                                    if( !empty( $news_title ) ): ?>
                                        <div class="news_title">
                                            <?php echo esc_html($news_title); ?>
                                        </div>
                                    <?php endif; 
                                
                                    if( !empty( $news_content ) ): ?>
                                        <div class="news_content">
                                            <?php echo wp_kses_post(wp_trim_words( $news_content, 35, '...' )); ?>
                                        </div>
                                    <?php endif; ?>
									
									<div class="news-button-link wp-block-button">
										<a class="wp-block-button__link news_url" rel="noopener" href="<?php echo esc_url($news_ext_url); ?>">
											<?php echo esc_html($label); ?>
										</a>
									</div>
                                </div>

							</div>
							<?php if ($counter % $break_after == ($break_after-1)) { ?>
								<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide">
							<?php } ++$counter;  ?>

						<?php }
                    } else {
                        ?>
                        <p class="result-not-found"><?php echo esc_html('No any news found'); ?></p>
                        <?php 
                    }
					?>
					</div>
				</div>
		</div>
		<?php
		        wp_reset_postdata();
		$html = ob_get_clean();
		return $html;
	}
}
