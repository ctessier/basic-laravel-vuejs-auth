import Vue from 'vue';
import VueRouter from 'vue-router';

import { isUserAuthenticated } from '../utils/auth';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: require('../components/Homepage.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: require('../components/Login.vue'),
            beforeEnter: (to, from, next) => {
                isUserAuthenticated() ? next('/') : next();
            },
        },
    ],
});
