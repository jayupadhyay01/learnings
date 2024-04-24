<?php
/**
 * Registers the storyful/our-leadership block.
 *
 * @global array    $attrs   Block attributes passed to the render callback.
 * @global string   $content Block content from InnerBlocks passed to the render callback.
 * @global WP_Block $block   Block registration object.
 *
 * @package storyful
 */

namespace STORYFUL\Blocks;

use STORYFUL\Inc\Block_Base;

use WP_Block;
use WP_REST_Response;
use WP_Query;

/**
 *  Class for the storyful/our-leadership block.
 */
class Our_Leadership extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'our-leadership';
		$this->setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {
		add_filter( 'ana_enterprise_gutenberg_blocks_config', array( $this, 'localize_block_data' ) );
		add_action( 'rest_api_init', array( $this, 'register_ana_enterprise_endpoint' ) );
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
	 * Register custom API endpoint for Testimonials.
	 */
	public function register_ana_enterprise_endpoint() {
		register_rest_route(
			'storyful_api',
			'/request/testimonial',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_testimonials' ),
			)
		);
	}

	/**
	 * Callback function to retrieve Testimonials data.
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
		$heading          = isset( $attributes['heading'] ) ? $attributes['heading'] : '';
		$headingColor     = isset( $attributes['headingColor'] ) ? $attributes['headingColor'] : '';
		$bannerTitle      = isset( $attributes['bannerTitle'] ) ? $attributes['bannerTitle'] : '';
		$bannerTitleColor = isset( $attributes['bannerTitleColor'] ) ? $attributes['bannerTitleColor'] : '';
		$buttonText       = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : '';
		$buttonLink       = isset( $attributes['buttonLink'] ) ? $attributes['buttonLink'] : '';
		$selectedPosts    = isset( $attributes['selectedPosts'] ) ? $attributes['selectedPosts'] : '';
		$numberofposts    = ! empty( $attributes['numberOfPosts'] ) ? $attributes['numberOfPosts'] : 10;
		$bgImage          = isset( $attributes['bgImage'] ) && is_array( $attributes['bgImage'] ) ? $attributes['bgImage'] : '';
		$BgColor          = isset( $attributes['BgColor'] ) ? $attributes['BgColor'] : '';
		$titleColor       = isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '';
		$subtitleColor    = isset( $attributes['subtitleColor'] ) ? $attributes['subtitleColor'] : '';
		$descColor        = isset( $attributes['descColor'] ) ? $attributes['descColor'] : '';

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
		<div <?php echo wp_kses_post( $wrapper_attributes ); ?> style="<?php echo $BgColor ? 'background:' . esc_url( $BgColor ) : ''; ?><?php echo isset( $bgImage['url'] ) ? ( $BgColor && isset( $bgImage['url'] ) ? ';' : '' ) . 'background-image:url(\'' . esc_url( $bgImage['url'] ) . '\')' : ''; ?>">
			<?php if ( ! empty( $heading ) ) : ?>
			<div class="leadership__header">
				<h2 class="leadership__header-heading fadeInLeft" style="color:<?php echo esc_attr( $headingColor ); ?>"><?php echo wp_kses_post( $heading ); ?></h2>
			</div>
			<?php endif; ?>
			<div class="container">
				<div class="box-item-main leadership__author__box">
					<?php if ( $result->have_posts() ) : ?>
						<?php
						while ( $result->have_posts() ) {
							$result->the_post();
							$post_id                 = get_the_ID();
							$image_url               = get_the_post_thumbnail_url( $post_id );
							$paramalink              = get_the_permalink( $post_id );
							$testimonial_name        = get_post_meta( $post_id, 'name', true );
							$testimonial_designation = get_post_meta( $post_id, 'designation', true );
							$testimonial_link        = get_post_meta( $post_id, 'link', true );
							?>
						<div class="leadership__author__box-item">
							<div class="leadership__author__box-item-inner">
								<div class="leadership__author__box-item-inner-img">
									<img decoding="async" src="<?php echo esc_url( $image_url ); ?>" alt="Leadership" class="author-img">
									<?php if ( ! empty( $testimonial_link ) ) : ?>
									<div class="linked-in-icon">
										<a href="<?php echo esc_url( $testimonial_link ); ?>"><img decoding="async" src="<?php echo esc_url( get_template_directory_uri() . '/assets/src/js/blocks/our-leadership/img/linkedin-icon-orange.svg' ); ?>" alt="linkedin-icon"></a>
									</div>
									<?php endif; ?>
								</div>
								<div class="leadership__author__box-item-inner-content">
									<h3 class="leadershipName" style="color:<?php echo esc_attr( $titleColor ); ?>"><?php echo esc_html( $testimonial_name ); ?></h3>
									<p class="leadershipTitle" style="color:<?php echo esc_attr( $subtitleColor ); ?>"><?php echo esc_html( $testimonial_designation ); ?></p>
								</div>
							</div>
							<div class="leadership__popup-model">
								<div class="leadership__popup-model-content">
									<div class="leadership__popup-model-header">
										<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">X</span></button>
									</div>
									<div class="leadership__popup-model-body">
										<div class="leadership__popup-model-author-details-main">
											<div class="leadership__popup-model-author-details-main-img-section">
												<img decoding="async" src="<?php echo esc_url( $image_url ); ?>" alt="Leadership" class="author-img">
											</div>
											<div class="leadership__popup-model-author-details-box">
												<h3 class="leadershipName" style="color:<?php echo esc_attr( $titleColor ); ?>"><a href="<?php echo esc_url( $paramalink ); ?>"><?php echo esc_html( $testimonial_name ); ?></a></h3>
												<p class="leadershipTitle" style="color:<?php echo esc_attr( $subtitleColor ); ?>"><?php echo esc_html( $testimonial_designation ); ?></p>
											</div>
										</div>
										<div class="col-md-8 bio-text leadership__popup-model-about-author-box">
											<div class="about-author"><span class="about-head">About</span></div>
											<div class="leadershipBio" style="color:<?php echo esc_attr( $descColor ); ?>"><?php the_content(); ?></div>
										</div>
									</div>
								</div>
								<div class="bg_overlay"></div>
							</div>
						</div>
						<?php } else : ?>
						<h2><?php esc_html_e( 'No Leaders to show.' ); ?></h2>
					<?php endif; ?>
				</div>
				<div class="leadership__join-team animated">
					<h4 class="leadership__join-team__heading" style="color:<?php echo esc_attr( $bannerTitleColor ); ?>"><?php echo wp_kses_post( $bannerTitle ); ?></h4>
					<span class="leadership__join-team__heading-span"></span>
					<div class="sbtn sbtn-arrow-primary">
						<span class="btn-text"><a href="<?php echo esc_url( $buttonLink ); ?>"><?php echo esc_html( $buttonText ); ?></a></span>
					</div>
				</div>
			</div>
		</div>

		<?php
		return ob_get_clean();
	}
}