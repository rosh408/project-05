<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */

?>

</div><!-- #content -->

<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="site-info">

		<nav id="site-navigation" class="main-navigation" role="navigation">
			<div class="first-three-nav">
				<?php wp_nav_menu(array('theme_location' => 'primary', 'menu_id' => 'primary-menu')); ?>
			</div>
			<p>Brought to you by <a class="red-link" href="https://redacademy.com/vancouver/"> &nbsp RED Academy</a></p>
		</nav><!-- #site-navigation -->

	</div><!-- .site-info -->
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>