<?php
/**
 * Registers the storyful/casestudy block.
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
 *  Class for the storyful/casestudy block.
 */
class Casestudy extends Block_Base {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->_block = 'casestudy';
		$this->setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {
		add_filter( 'storyful_gutenberg_blocks_config', array( $this, 'localize_block_data' ) );
		add_action( 'rest_api_init', array( $this, 'register_case_studies_endpoint' ) );
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
	 * Register custom API endpoint for Case Studies.
	 */
	public function register_case_studies_endpoint() {
		register_rest_route(
			'storyful_api', // Namespace for the endpoint
			'/request/case_studies', // Route for the endpoint
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'get_case_studies' ),
			)
		);
	}

	/**
	 * Callback function to retrieve Case Studies data.
	 *
	 * @return WP_REST_Response
	 */
	public function get_case_studies() {
		$args = array(
			'post_type'      => 'case_study', // Your custom post type
			'posts_per_page' => -1,
		);

		$case_studies = get_posts( $args );

		$response_data = array();

		foreach ( $case_studies as $case_study ) {
			$response_data[] = array(
				'id'    => $case_study->ID,
				'title' => get_the_title( $case_study->ID ),
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

		// get string of attributes of the features that the block supports.
		$wrapper_attributes = get_block_wrapper_attributes();

		// attributes.
		$heading       = isset( $attributes['heading'] ) ? $attributes['heading'] : '';
		$selectedPosts = isset( $attributes['selectedPosts'] ) ? $attributes['selectedPosts'] : '';
		$numberofposts = ! empty( $attributes['numberOfPosts'] ) ? $attributes['numberOfPosts'] : 10;
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
					'post_type'      => 'case_study',
					'post_status'    => 'publish',
					'posts_per_page' => $numberofposts,
					'orderby'        => ! empty( $attributes['postOrderBy'] ) ? $attributes['postOrderBy'] : '',
					'order'          => ! empty( $attributes['postOrder'] ) ? $attributes['postOrder'] : '',
					'post__in'       => $posts,
				);
			}
		} else {
			$query_args = array(
				'post_type'      => 'case_study',
				'post_status'    => 'publish',
				'posts_per_page' => $numberofposts,
				'orderby'        => ! empty( $attributes['postOrderBy'] ) ? $attributes['postOrderBy'] : '',
				'order'          => ! empty( $attributes['postOrder'] ) ? $attributes['postOrder'] : '',
			);
		}

		$result = new WP_Query( $query_args );
		ob_start();
		?>
		<div <?php echo wp_kses_post( $wrapper_attributes ); ?>>
			<?php if ( ! empty( $heading ) ) : ?>
				
				<div class="container">
					<div class="title-section"><h2><?php echo wp_kses_post( $heading ); ?></h2></div>
					<div class="slider-container">
						<div class="slider-nav"> 
							<?php
							while ( $result->have_posts() ) {
								$result->the_post();
								$post_id    = get_the_ID();
								$title      = get_the_title( $post_id );
								$desciption = wp_trim_words( get_the_content( $post_id ), 5 );
								?>
								<div class="casestudy-tab-title">
									<p><strong><?php echo esc_html( $title ); ?></strong></p>
									<?php echo wp_kses_post( $desciption ); ?>
								</div>
								<?php
							}
							?>
						</div>
						<div class="slider-for">
							<?php
							while ( $result->have_posts() ) {
								$result->the_post();
								$post_id    = get_the_ID();
								$title      = get_the_title( $post_id );
								$image_url  = get_the_post_thumbnail_url( $post_id );
								$paramalink = get_the_permalink( $post_id );
								?>
								<div class="casestudy-tab-content">
									<div class="casestudy-content-section">
										<h3><?php echo esc_html( $title ); ?></h3>
										<?php echo wp_kses_post( the_content() ); ?>
										<div class="detail-btn">
											<a href="<?php echo esc_url( $paramalink ); ?>">Full Case studies</a>
										</div>
									</div>
									<div class="casestudy-img-section">
										<?php if ( $image_url ) { ?>
										<img src="<?php echo esc_url( $image_url ); ?>" alt="case-stury-thumbnail" />
										<?php } ?>
									</div>
								</div>
								<?php
							}
							?>
						</div>
					</div>	
				</div>
			<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}
}
