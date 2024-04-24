<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package md-prime
 */

get_header();
?>

	<main id="primary" class="site-main md-prime-main u-padding-t80 site-main u-bg-lightgray">
		<div class="container">
			<div class="u-flex-columns u-flex-columns@mobile-max">
				<div class="u-flex-column u-flex-basis-7 u-flex-basis-7@mobile-max">
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
				<div class="u-flex-column u-flex-basis-3 u-flex-basis-3@mobile-max">
					<div class="md-prime-sidebar u-margin-t50@mobile-max u-margin-t50 u-margin-b20">
						<?php get_sidebar(); ?>
					</div>
				</div>
			</div>
		</div>
	</main><!-- #main -->

<?php
get_footer();
