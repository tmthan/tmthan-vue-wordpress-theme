<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<!-- 
     ___    ___     _______     _____      _____           _________     _________
     \  \  /  /    |       |   |     \    /     |         |         |   |         |
      \  \/  /     |  |''''    |  |\  \  /  /|  |         |  |''''''    |  |''''''
       \    /      |  |____    |  | \  \/  / |  |         |  |          |  |
       /    \      |  .....|   |  |  \    /  |  |         |  |          |  |
      /  /\  \     |  |____    |  |   \__/   |  |         |  |______    |  |______
     /__/  \__\    |_______|   |__|          |__|         |_________|   |_________|
-->
  <head>
    <meta
      charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/wp-content/themes/tmthan/dist/css/tmthan.app.css" rel="preload" as="style">
    <link href="/wp-content/themes/tmthan/dist/js/tmthan.app.js" rel="preload" as="script">
    <script src="/wp-content/themes/tmthan/dist/js/tmthan.chunk-vendors.js"></script>
    <script src="/wp-content/themes/tmthan/dist/js/tmthan.app.js"></script>
    <link href="/wp-content/themes/tmthan/dist/js/tmthan.chunk-vendors.js" rel="preload" as="script">
    <link href="/wp-content/themes/tmthan/dist/css/tmthan.app.css" rel="stylesheet">
    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
