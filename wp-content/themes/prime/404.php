<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package md-prime
 */

get_header();
?>

	<main id="primary" class="md-prime-main u-padding-t80 site-main u-bg-lightgray">
		<div class="container">
			<div class="u-flex-columns u-flex-columns@mobile-max">
				<div class="u-flex-column u-flex-basis-7 u-flex-basis-7@mobile-max">
					<section class="error-404 not-found md-prime-post-article u-margin-t50 u-margin-b50 u-margin-t50@mobile-max u-margin-b50@mobile-max u-bg-white u-padding-a15">
						<header class="page-header">
							<h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'md-prime' ); ?></h1>
						</header><!-- .page-header -->

						<div class="page-content">
							<p class="u-margin-t10 u-margin-b10"><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'md-prime' ); ?></p>

							<?php
								get_search_form();
							?>
						</div><!-- .page-content -->
					</section><!-- .error-404 -->
				</div>
				<div class="u-flex-column u-flex-basis-3 u-flex-basis-3@mobile-max">
					<div class="md-prime-sidebar u-margin-t50@mobile-max u-margin-t50 u-margin-b20">
						<?php
							the_widget( 'WP_Widget_Recent_Posts' );
						?>
						<div class="widget widget_categories">
							<h2 class="widget-title"><?php esc_html_e( 'Most Used Categories', 'md-prime' ); ?></h2>
							<ul>
								<?php
								wp_list_categories(
									array(
										'orderby'    => 'count',
										'order'      => 'DESC',
										'show_count' => 1,
										'title_li'   => '',
										'number'     => 10,
									)
								);
								?>
							</ul>
						</div><!-- .widget -->

						<?php
							/* translators: %1$s: smiley */
							$archive_content = '<p>' . sprintf( esc_html__( 'Try looking in the monthly archives. %1$s', 'md-prime' ), convert_smilies( ':)' ) ) . '</p>';
							the_widget( 'WP_Widget_Archives', 'dropdown=1', "after_title=</h2>$archive_content" );

							the_widget( 'WP_Widget_Tag_Cloud' );
						?>
					</div>
				</div>
			</div>
		</div>
	</main><!-- #main -->

<?php
get_footer();
