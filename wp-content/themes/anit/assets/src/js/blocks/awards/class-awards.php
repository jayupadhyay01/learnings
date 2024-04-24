<?php
/**
 * Registers the anitian/awards block.
 *
 * @global array    $attrs   Block attributes passed to the render callback.
 * @global string   $content Block content from InnerBlocks passed to the render callback.
 * @global WP_Block $block   Block registration object.
 *
 * @package anitian
 */

namespace ANITIAN\Blocks;

use ANITIAN\Inc\Block_Base;

use WP_Block;
use WP_REST_Response;
use WP_Query;

/**
 *  Class for the anitian/awards block.
 */
class Awards extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'awards';
		$this->setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {
		add_filter( 'ana_enterprise_gutenberg_blocks_config', array( $this, 'localize_block_data' ) );
		add_action( 'rest_api_init', array( $this, 'register_anitian_endpoint' ) );
	}

	/**
	 * Localize template data.
	 *
	 * @param array $blocks_config Block configuration.
	 * @return array Updated block configuration.
	 */
	public function localize_block_data( array $blocks_config ): array {
		// Merge your block data into blocks_config.
		return array_merge(
			$blocks_config,
			array(
				'sample_dynamic_block_config' => array(
					'data_key' => 'data_value',
				),
			)
		);
	}
	/**
	 * Register custom API endpoint for awards.
	 */
	public function register_anitian_endpoint() {
		register_rest_route(
			'anitian_api',
			'/request/awards',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_awards' ),
			)
		);
	}

	/**
	 * Callback function to retrieve awards data.
	 *
	 * @return WP_REST_Response
	 */
	public function get_awards() {
		$args = array(
			'post_type'      => 'awards',
			'posts_per_page' => -1,
		);

		$awards = get_posts( $args );

		$response_data = array();

		foreach ( $awards as $award ) {
			$response_data[] = array(
				'id'    => $award->ID,
				'title' => get_the_title( $award->ID ),
			);
		}

		return new WP_REST_Response( $response_data, 200 );
	}


	/**
	 * Render block.
	 *
	 * @param array    $attributes   Block attributes.
	 * @param string   $content      Block content.
	 * @param WP_Block $block        Block object.
	 * @return string
	 */
	public function render_callback(
		// phpcs:disable VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		array $attributes,
		string $content,
		WP_Block $block
		// phpcs:enable
	): string {

		$wrapper_attributes = get_block_wrapper_attributes();

		// attributes.
		$heading       = isset( $attributes['heading'] ) ? $attributes['heading'] : '';
		$headingColor  = isset( $attributes['HeadingColor'] ) ? $attributes['HeadingColor'] : '';
		$TitleColor    = isset( $attributes['TitleColor'] ) ? $attributes['TitleColor'] : '';
		$selectedPosts = isset( $attributes['selectedPosts'] ) ? $attributes['selectedPosts'] : '';
		$numberofposts = ! empty( $attributes['numberOfPosts'] ) ? $attributes['numberOfPosts'] : 10;
		$autoplay      = isset( $attributes['autoplay'] ) ? var_export( $attributes['autoplay'], true ) : 'false';
		$arrows        = isset( $attributes['arrows'] ) ? var_export( $attributes['arrows'], true ) : 'false';
		$dots          = isset( $attributes['dots'] ) ? var_export( $attributes['dots'], true ) : 'false';
		$slideInfinite = isset( $attributes['slideInfinite'] ) ? var_export( $attributes['slideInfinite'], true ) : 'false';
		$bgImage       = isset( $attributes['bgImage'] ) && is_array( $attributes['bgImage'] ) ? $attributes['bgImage'] : '';
		$buttonLink    = isset( $attributes['buttonLink'] ) ? $attributes['buttonLink'] : '';
		$buttonText    = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : '';
		$sliderBgColor = isset( $attributes['sliderBgColor'] ) ? $attributes['sliderBgColor'] : '';

		if ( ! empty( $selectedPosts ) ) {
			$slugs  = '';
			$number = 0;
			foreach ( $selectedPosts as $slug ) {
				if ( $number === 0 ) {
					$slugs .= $slug['value'];
				} else {
					$slugs .= ', ' . $slug['value'];
				}
				++$number;
			}
			$posts = explode( ', ', $slugs );
			if ( $posts !== null && ! empty( $posts ) ) {
				$query_args = array(
					'post_type'      => 'awards',
					'post_status'    => 'publish',
					'posts_per_page' => $numberofposts,
					'orderby'        => ! empty( $attributes['postOrderBy'] ) ? $attributes['postOrderBy'] : '',
					'order'          => ! empty( $attributes['postOrder'] ) ? $attributes['postOrder'] : '',
					'post__in'       => $posts,
				);
			}
		} else {
			$query_args = array(
				'post_type'      => 'awards',
				'post_status'    => 'publish',
				'posts_per_page' => $numberofposts,
				'orderby'        => ! empty( $attributes['postOrderBy'] ) ? $attributes['postOrderBy'] : '',
				'order'          => ! empty( $attributes['postOrder'] ) ? $attributes['postOrder'] : '',
			);
		}

		$result = new WP_Query( $query_args );

		ob_start();
		?>
		<div <?php echo wp_kses_post( $wrapper_attributes ); ?> style="background-image:url('<?php echo esc_url( isset( $bgImage['url'] ) ? $bgImage['url'] : '' ); ?>')">
			<?php if ( ! empty( $heading ) ) : ?>
				<div class="awards-container">
					<div class="awards-wrap">
						<div class="heading-section">
							<div class="title-section">
								<?php if ( $heading ) { ?>
								<h3 style="color:<?php echo esc_attr( $headingColor ); ?>"><?php echo wp_kses_post( $heading ); ?></h3>
								<?php } ?>
							</div>
							<div class="awards-buttons">
								<?php if ( $buttonLink ) { ?>
								<p class="awards-link">
									<a href="<?php echo esc_url( $buttonLink ); ?>">
										<?php echo esc_html( $buttonText ); ?>
									</a>	
								</p>
								<?php } ?>
							</div>
						</div>
						<div class="slider-container">
						<?php if ( $result->have_posts() ) : ?>
							<div class="awards-slider-options" data-slide-autoplay="<?php echo esc_attr( $autoplay ); ?>" data-slide-arrows="<?php echo esc_attr( $arrows ); ?>" data-slide-dots="<?php echo esc_attr( $dots ); ?>" data-slide-infinite="<?php echo esc_attr( $slideInfinite ); ?>">
								<div class="slider-for-awards">
									<?php
									while ( $result->have_posts() ) {
										$result->the_post();
										$post_id   = get_the_ID();
										$image_url = get_the_post_thumbnail_url( $post_id );
										?>
										<div class="awards-slide-main-section" style="background:<?php echo esc_url( $sliderBgColor ); ?>">
											<div class="awards-content-section">
												<div class="awards-img-section">
													<?php if ( $image_url ) { ?>
													<img src="<?php echo esc_url( $image_url ); ?>" alt="awards-thumbnail" />
													<?php } ?>
												</div>
												<div class="awards-title-section">
												<h6 style="color: <?php echo esc_attr( $TitleColor ); ?>"><?php the_title(); ?></h6>
												</div>
											</div>
										</div>
										<?php
									}
									?>
								</div>	
							</div>
							<?php else : ?>
								<h2>No awards to show.</h2>
							<?php endif; ?>
						</div>	
						
					</div>
				</div>
			<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}
}
