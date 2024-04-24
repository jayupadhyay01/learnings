<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ana-enterprise
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="ana-enterprise-post-article u-margin-t50 u-margin-b50 u-bg-white u-padding-a15">
		<header class="entry-header">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</header><!-- .entry-header -->

		<?php \ANA_ENTERPRISE\Inc\Template_Tags::get_instance()->post_thumbnail(); ?>

		<div class="entry-content">
			<?php
			the_content();

			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'ana-enterprise' ),
					'after'  => '</div>',
				)
			);
			?>
		</div><!-- .entry-content -->
	</div>	
</article><!-- #post-<?php the_ID(); ?> -->
