import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style.css';
import { VueMasonryPlugin } from 'vue-masonry';

Vue.use(VueMasonryPlugin);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');
