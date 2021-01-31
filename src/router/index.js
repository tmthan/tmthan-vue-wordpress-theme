import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '../view/Home';
import PostPage from '../view/PostPage';
import Post from '../view/Post';
// import Page from '../components/Page/Page.vue';

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
      // Assuming you're using the default permalink structure for posts
      path: '/:postSlug',
      name: 'Post',
      component: Post,
    },
    // {
    //   path: '/:pageSlug',
    //   name: 'Page',
    //   component: Page,
    // },
  ],
  mode: 'history',
  base: '',
});

export default router;
