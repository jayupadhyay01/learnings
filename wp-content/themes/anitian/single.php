<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package ana-enterprise
 */

get_header();
?>

	<main id="primary" class="site-main ana-enterprise-main u-padding-t80 u-bg-lightgray">
		<div class="container">
			<div class="u-flex-columns u-flex-columns@max-767">
				<div class="u-flex-column u-flex-basis-70 u-flex-basis-70@max-767">
					<?php
					while ( have_posts() ) :
						the_post();

						get_template_part( 'template-parts/content', get_post_type() );

						the_post_navigation(
							array(
								'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous:', 'ana-enterprise' ) . '</span> <span class="nav-title">%title</span>',
								'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next:', 'ana-enterprise' ) . '</span> <span class="nav-title">%title</span>',
							)
						);

						endwhile; // End of the loop.
					?>
				</div>

			</div>
		</div>
	</main><!-- #main -->

<?php
get_footer();
