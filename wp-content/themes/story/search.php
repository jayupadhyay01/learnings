<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package storyful
 */

get_header();
?>

<main id="primary" class="site-main storyful-main u-padding-t80 u-bg-lightgray">
	<div class="container">
		<div class="u-flex-columns u-flex-columns@max-767">
			<div class="u-flex-column u-flex-basis-70 u-flex-basis-70@max-767">
			<?php if ( have_posts() ) : ?>

				<header class="page-header u-margin-t50">
					<h1 class="page-title">
						<?php
						/* translators: %s: search query. */
						printf( esc_html__( 'Search Results for: %s', 'storyful' ), '<span>' . get_search_query() . '</span>' );
						?>
					</h1>
				</header><!-- .page-header -->

				<?php
					/* Start the Loop */
				while ( have_posts() ) :
					the_post();

					/**
					 * Run the loop for the search to output the results.
					 * If you want to overload this in a child theme then include a file
					 * called content-search.php and that will be used instead.
					 */
					get_template_part( 'template-parts/content', 'search' );

				endwhile;

					the_posts_navigation();

				else :

					get_template_part( 'template-parts/content', 'none' );

				endif;
				?>
			</div>
			<div class="u-flex-column u-flex-basis-30 u-flex-basis-30@max-767">
				<div class="storyful-sidebar u-margin-t50@max-767 u-margin-t50 u-margin-b20">
					<?php get_sidebar(); ?>
				</div>
			</div>
		</div>
	</div>
</main><!-- #main -->

<?php
get_footer();
