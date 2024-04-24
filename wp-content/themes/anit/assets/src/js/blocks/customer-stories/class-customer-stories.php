<?php
/**
 * Registers the anitian/customer-stories block.
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
 *  Class for the anitian/customer-stories block.
 */
class Customer_Stories extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'customer-stories';
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
	 * Register custom API endpoint for customer-stories.
	 */
	public function register_anitian_endpoint() {
		register_rest_route(
			'anitian_api',
			'/request/testimonial',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_testimonials' ),
			)
		);
	}

	/**
	 * Callback function to retrieve customer-stories data.
	 *
	 * @return WP_REST_Response
	 */
	public function get_testimonials() {
		$args = array(
			'post_type'      => 'testimonial',
			'posts_per_page' => -1,
		);

		$testimonials = get_posts( $args );

		$response_data = array();

		foreach ( $testimonials as $testimonial ) {
			$response_data[] = array(
				'id'    => $testimonial->ID,
				'title' => get_the_title( $testimonial->ID ),
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
		$heading         = isset( $attributes['heading'] ) ? $attributes['heading'] : '';
		$subHeading      = isset( $attributes['subHeading'] ) ? $attributes['subHeading'] : '';
		$selectedPosts   = isset( $attributes['selectedPosts'] ) ? $attributes['selectedPosts'] : '';
		$numberofposts   = ! empty( $attributes['numberOfPosts'] ) ? $attributes['numberOfPosts'] : 10;
		$autoplay        = isset( $attributes['autoplay'] ) ? var_export( $attributes['autoplay'], true ) : 'false';
		$arrows          = isset( $attributes['arrows'] ) ? var_export( $attributes['arrows'], true ) : 'false';
		$dots            = isset( $attributes['dots'] ) ? var_export( $attributes['dots'], true ) : 'false';
		$slideInfinite   = isset( $attributes['slideInfinite'] ) ? var_export( $attributes['slideInfinite'], true ) : 'false';
		$bgImage         = isset( $attributes['bgImage'] ) && is_array( $attributes['bgImage'] ) ? $attributes['bgImage'] : '';
		$buttonLink      = isset( $attributes['buttonLink'] ) ? $attributes['buttonLink'] : '';
		$buttonText      = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : '';
		$sliderBgColor   = isset( $attributes['sliderBgColor'] ) ? $attributes['sliderBgColor'] : '';
		$titleColor      = isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '';
		$headingColor    = isset( $attributes['HeadingColor'] ) ? $attributes['HeadingColor'] : '';
		$subHeadingColor = isset( $attributes['subHeadingColor'] ) ? $attributes['subHeadingColor'] : '';
		$subtitleColor   = isset( $attributes['subtitleColor'] ) ? $attributes['subtitleColor'] : '';
		$descColor       = isset( $attributes['descColor'] ) ? $attributes['descColor'] : '';
		$showButton      = isset( $attributes['showButton'] ) ? $attributes['showButton'] : '';

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
					'post_type'      => 'testimonial',
					'post_status'    => 'publish',
					'posts_per_page' => $numberofposts,
					'orderby'        => ! empty( $attributes['postOrderBy'] ) ? $attributes['postOrderBy'] : '',
					'order'          => ! empty( $attributes['postOrder'] ) ? $attributes['postOrder'] : '',
					'post__in'       => $posts,
				);
			}
		} else {
			$query_args = array(
				'post_type'      => 'testimonial',
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
				<div class="customer-stories-container">
					<div class="customer-stories-wrap">
						<div class="heading-section">
							<?php if ( $heading ) { ?>
							<h2 style="color:<?php echo esc_attr( $headingColor ); ?>"><?php echo wp_kses_post( $heading ); ?></h2>
							<?php }  if ( $subHeading ) { ?>
							<div style="color:<?php echo esc_attr( $subHeadingColor ); ?>"><?php echo wp_kses_post( $subHeading ); ?></div>
							<?php } ?>
						</div>
						<div class="slider-container">
						<?php if ( $result->have_posts() ) : ?>
							<div class="testimonials-slider-options" data-slide-autoplay="<?php echo esc_attr( $autoplay ); ?>" data-slide-arrows="<?php echo esc_attr( $arrows ); ?>" data-slide-dots="<?php echo esc_attr( $dots ); ?>" data-slide-infinite="<?php echo esc_attr( $slideInfinite ); ?>">
								<div class="slider-for-testimonials">
									<?php
									while ( $result->have_posts() ) {
										$result->the_post();
										$post_id                 = get_the_ID();
										$image_url               = get_the_post_thumbnail_url( $post_id );
										$paramalink              = get_the_permalink( $post_id );
										$testimonial_name        = get_post_meta( $post_id, 'name', true );
										$testimonial_designation = get_post_meta( $post_id, 'designation', true );
										?>
										<div class="testimonials-main-section" style="background:<?php echo esc_url( $sliderBgColor ); ?>">

											<div class="testimonials-content-section">
												<div class="description" style="color:<?php echo esc_attr( $descColor ); ?>"><?php the_content(); ?></div>
												<div class="testimonials-img-content-wrap">
													<div class="testimonials-img-section">
														<?php if ( $image_url ) { ?>
														<img src="<?php echo esc_url( $image_url ); ?>" alt="testimonial-thumbnail" />
														<?php } ?>
													</div>
													<div class="testimonials-title-section">
														<h3 style="color:<?php echo esc_attr( $titleColor ); ?>"><a href="<?php echo esc_url( $paramalink ); ?>"><?php echo esc_html( $testimonial_name ); ?></a></h3>
														<p style="color:<?php echo esc_attr( $subtitleColor ); ?>"><?php echo esc_html( $testimonial_designation ); ?></p>
													</div>
												</div>
											</div>
										</div>
										<?php
									}
									?>
								</div>	
							</div>
							<?php else : ?>
								<h2><?php esc_html_e( 'No Customer Stories to show.' ); ?></h2>
							<?php endif; ?>
						</div>
						<?php if ( $arrows === 'true' ) { ?>
						<div class="customer__stories_bottom">
							<div class="customer__Stories_arrow_wrapper">
								<div class="customer__stories_bottom-arrow-prev slick-arrow" style=""></div>
								<div class="customer__stories_bottom-arrow-next slick-arrow" style=""></div>
							</div>
						</div>
						<?php } ?>
						<?php if ( ! empty( $showButton ) ) { ?>
						<div class="customer-stories-buttons">
								<?php if ( $buttonLink ) { ?>
								<p class="customer-stories-link">
									<a href="<?php echo esc_url( $buttonLink ); ?>">
										<?php echo esc_html( $buttonText ); ?>
									</a>	
								</p>
								<?php } ?>
							</div>
						<?php } ?>
					</div>
				</div>
			<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}
}
