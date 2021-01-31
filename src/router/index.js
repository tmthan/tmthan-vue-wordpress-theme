import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '../view/Home';
import PostPage from '../view/PostPage';
import Post from '../view/Post';
import Category from '../view/Category';
import CategoryPage from '../view/CategoryPage';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/page/:postPage',
      name: 'PostPage',
      component: PostPage,
    },
    {
      path: '/category/:categorySlug',
      name: 'Category',
      component: Category,
    },
    {
      path: '/category/:categorySlug/page/:categoryPage',
      name: 'CategoryPage',
      component: CategoryPage,
    },
    {
      // Assuming you're using the default permalink structure for posts
      path: '/:postSlug',
      name: 'Post',
      component: Post,
    },
  ],
  mode: 'history',
  base: '',
});

export default router;
