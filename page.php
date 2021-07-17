<?php
/**
 * @package WordPress
 * @subpackage HTML5_Boilerplate
 */

get_header(); ?>
<script src="/wp-content/themes/tmthan/dist/js/tmthan.chunk-vendors.js"></script>
<script src="/wp-content/themes/tmthan/dist/js/tmthan.app.js"></script>
<div id="app">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  <article class="post" id="post-<?php the_ID(); ?>">
    <header>
      <h2><?php the_title(); ?></h2>
    </header>
  
    <?php the_content('<p class="serif">Read the rest of this page &raquo;</p>'); ?>

    <?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
  
  </article>
  <?php endwhile; endif; ?>
  <?php edit_post_link('Edit this entry.', '<p>', '</p>'); ?>

  <?php comments_template(); ?>

</div>

<?php get_footer(); ?>