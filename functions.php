<?php
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );
add_theme_support( 'title-tag' );
// Load scripts
// function load_vue_scripts() {
//     wp_enqueue_style('vue_wordpress.css', get_template_directory_uri() . '/dist/vue-wordpress.css');
//     wp_enqueue_script('vue_wordpress.js', get_template_directory_uri() . '/dist/vue-wordpress.js', array(), null, true);
// }
// add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );
add_filter( 'rest_allow_anonymous_comments', '__return_true' );
