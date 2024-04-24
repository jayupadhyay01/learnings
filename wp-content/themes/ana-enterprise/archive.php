<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ana-enterprise
 */

get_header();
?>

	<main id="primary" class="site-main ana-enterprise-main u-padding-t80 u-bg-lightgray">
		<div class="container">
			<div class="u-flex-columns u-flex-columns@max-767">
				<div class="u-flex-column u-flex-basis-70 u-flex-basis-70@max-767">
				<?php if ( have_posts() ) : ?>

					<header class="page-header u-margin-t50">
						<?php
						the_archive_title( '<h1 class="page-title">', '</h1>' );
						the_archive_description( '<div class="archive-description">', '</div>' );
						?>
					</header><!-- .page-header -->

					<?php
					/* Start the Loop */
					while ( have_posts() ) :
						the_post();

						/*
						* Include the Post-Type-specific template for the content.
						* If you want to override this in a child theme, then include a file
						* called content-___.php (where ___ is the Post Type name) and that will be used instead.
						*/
						get_template_part( 'template-parts/content', get_post_type() );

					endwhile;

					the_posts_navigation();

					else :

						get_template_part( 'template-parts/content', 'none' );

					endif;
					?>
				</div>
				<div class="u-flex-column u-flex-basis-30 u-flex-basis-30@max-767">
					<div class="ana-enterprise-sidebar u-margin-t50@max-767 u-margin-t50 u-margin-b20">
						<?php get_sidebar(); ?>
					</div>
				</div>
			</div>
		</div>
	</main><!-- #main -->

<?php
get_footer();
