
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Vue from 'vue';
import store from '@/store';
import PassportAuth from '@/passport-auth';
import { diffForHuman } from '@/utils/date';

Vue.use(PassportAuth, {
    client_id: 2,
    client_secret: 'P7YHlZ4Q9yC74KaKewniNuSNK3NJBVsPzPO7UvEH',
});

Vue.filter('diffForHuman', diffForHuman);

import App from '@/App.vue';
import router from '@/router';

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
