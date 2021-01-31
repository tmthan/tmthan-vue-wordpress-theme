<?php
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );

// Load scripts
function load_vue_scripts() {
	wp_enqueue_script(
		'tmthan-theme-js-1',
		get_stylesheet_directory_uri() . '/dist/js/app.c3b12655.js',
		array(),
		1.0,
		false
	);

	wp_enqueue_script(
		'tmthan-theme-js-2',
		get_stylesheet_directory_uri() . '/dist/js/chunk-vendors.8c8f94ae.js',
		array(),
		1.0,
		false
	);

	wp_enqueue_style(
		'tmthan-theme-css',
		get_stylesheet_directory_uri() . '/dist/css/app.309c9433.css',
		false,
		1.0
	);
}
add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );
add_filter( 'rest_allow_anonymous_comments', '__return_true' );