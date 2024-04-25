<?php
/**
 * The template for displaying the footer
 *
 * @package md-prime
 */

?>
<?php
$theme_options = get_option('theme_options');
if (isset($theme_options['custom_html'])) {
    echo $theme_options['custom_html'];
}
// Checkbox options
$checkbox_options = isset($theme_options['checkbox_options']) ? $theme_options['checkbox_options'] : array();
echo '<strong>Checkbox Options:</strong><br>';
foreach ($checkbox_options as $option) {
    echo esc_html($option) . '<br>';
}
// Radio options
$radio_option = isset($theme_options['radio_options']) ? $theme_options['radio_options'] : '';
echo '<strong>Radio Option:</strong> ' . esc_html($radio_option) . '<br>';

// Multi-select options
$multi_select_options = isset($theme_options['multi_select_options']) ? $theme_options['multi_select_options'] : array();
echo '<strong>Multi-select Options:</strong><br>';
foreach ($multi_select_options as $option) {
    echo esc_html($option) . '<br>';
}
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
<?php
// Output custom scripts
if (isset($theme_options['custom_scripts'])) {
    echo '<script>' . $theme_options['custom_scripts'] . '</script>';
}
?>