<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package ana-enterprise
 */

get_header();
?>

	<main id="primary" class="ana-enterprise-main u-padding-t80 site-main">
		<div class="container">
			<div class="u-flex-columns ">
				<div class="u-flex-column">
					<section class="error-404 not-found ana-enterprise-post-article u-margin-t50 u-margin-b50 u-bg-white u-padding-a15">
						<header class="page-header">
							<h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'ana-enterprise' ); ?></h1>
						</header><!-- .page-header -->

						<div class="page-content">
							<p class="u-margin-t10 u-margin-b10"><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'ana-enterprise' ); ?></p>

							<?php
								get_search_form();
							?>
						</div><!-- .page-content -->
					</section><!-- .error-404 -->
				</div>
			</div>
		</div>
	</main><!-- #main -->

<?php
get_footer();
