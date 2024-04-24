<?php
/**
 * Registers the anitian/aws-partners block.
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
 *  Class for the anitian/aws-partners block.
 */
class Aws_Partners extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'aws-partners';
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
		$descColor     = isset( $attributes['descColor'] ) ? $attributes['descColor'] : '';
		$selectedPosts = isset( $attributes['selectedPosts'] ) ? $attributes['selectedPosts'] : '';
		$numberofposts = ! empty( $attributes['numberOfPosts'] ) ? $attributes['numberOfPosts'] : 10;
		$autoplay      = isset( $attributes['autoplay'] ) ? var_export( $attributes['autoplay'], true ) : 'false';
		$arrows        = isset( $attributes['arrows'] ) ? var_export( $attributes['arrows'], true ) : 'false';
		$dots          = isset( $attributes['dots'] ) ? var_export( $attributes['dots'], true ) : 'false';
		$slideInfinite = isset( $attributes['slideInfinite'] ) ? var_export( $attributes['slideInfinite'], true ) : 'false';
		$bgImage       = isset( $attributes['bgImage'] ) && is_array( $attributes['bgImage'] ) ? $attributes['bgImage'] : '';
		$Image1        = isset( $attributes['Image1'] ) && is_array( $attributes['Image1'] ) ? $attributes['Image1'] : '';
		$Image2        = isset( $attributes['Image2'] ) && is_array( $attributes['Image2'] ) ? $attributes['Image2'] : '';

		$description   = isset( $attributes['description'] ) ? $attributes['description'] : '';
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
			<div class="container">
				<div class="aws-partners__wrapper">
					<div class="aws-partners__bottom">
						<div class="aws-partners__left-content">
							<div class="aws-partners__badge-image">
								<img loading="lazy" decoding="async" width="943" height="1255" src="<?php echo esc_url( isset( $Image1['url'] ) ? $Image1['url'] : '' ); ?>">
							</div>
							<div class="aws-partners__badge-image-2">
								<img loading="lazy" decoding="async" width="471" height="627" src="<?php echo esc_url( isset( $Image2['url'] ) ? $Image2['url'] : '' ); ?>" alt="">
							</div>
						</div>
						<div class="aws-partners__right-content">
							<?php if ( $heading ) { ?>
								<h3 class="aws-partners__title" style="color:<?php echo esc_attr( $headingColor ); ?>"><?php echo wp_kses_post( $heading ); ?></h3>
							<?php } ?>
							<?php if ( $description ) { ?>
								<p class="aws-partners__description" style="color: <?php echo esc_attr( $descColor ); ?>">
									<?php echo esc_html( $description ); ?>
								</p>
							<?php } ?>
							<?php if ( $result->have_posts() ) : ?>
								<div class="aws-partners__slider-main" data-slide-autoplay="<?php echo esc_attr( $autoplay ); ?>" data-slide-arrows="<?php echo esc_attr( $arrows ); ?>" data-slide-dots="<?php echo esc_attr( $dots ); ?>" data-slide-infinite="<?php echo esc_attr( $slideInfinite ); ?>">
									<?php
									while ( $result->have_posts() ) {
										$result->the_post();
										$post_id   = get_the_ID();
										$image_url = get_the_post_thumbnail_url( $post_id );
										?>
										<div class="aws-partners__slider-item" style="background:<?php echo esc_url( $sliderBgColor ); ?>">
											<div class="aws-partners__slider-image">
												<?php if ( $image_url ) { ?>
												<img src="<?php echo esc_url( $image_url ); ?>" alt="awards-thumbnail" />
												<?php } ?>
											</div>
										</div>
										<?php
									}
									?>
								</div>
							<?php else : ?>
								<h2><?php esc_html_e( 'No awards to show.' ); ?></h2>
							<?php endif; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
