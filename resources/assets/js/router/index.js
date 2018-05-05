import Vue from 'vue';
import VueRouter from 'vue-router';

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
        },
    ],
});
