<?php
/**
 * The template for displaying the footer
 *
 * @package md-prime
 */

?>

	<footer id="colophon" class="site-footer u-bg-gray  u-flex u-justify-content-center u-padding-a30">
		<div class="site-info u-primary-text-color">
			<a class="u-link-text-color" href="<?php echo esc_url( __( 'https://www.multidots.com/', 'md-prime' ) ); ?>">
				<?php
				/* translators: %s: CMS name, i.e. WordPress. */
				printf( esc_html__( 'Proudly powered by %s', 'md-prime' ), 'WordPress' );
				?>
			</a>
			<span class="sep"> | </span>
				<?php
				/* translators: 1: Theme name, 2: Theme author. */
				printf( esc_html__( 'Theme: %1$s by %2$s.', 'md-prime' ), 'Multidots', '<a class="u-link-text-color" href="htts://www.multidots.com/">multidots.com</a>' );
				?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
