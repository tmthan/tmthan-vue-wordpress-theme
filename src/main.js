import Vue from 'vue'
import App from './App.vue'
import router from './router';
import './assets/style.css';
import {VueMasonryPlugin} from 'vue-masonry';
import Skeleton from 'vue-loading-skeleton';

Vue.use(VueMasonryPlugin);
Vue.use(Skeleton);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
