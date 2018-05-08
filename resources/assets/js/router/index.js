import Vue from 'vue';
import VueRouter from 'vue-router';

import { isUserAuthenticated, getCurrentUser } from '@/utils/auth';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: require('@/pages/HomePage.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/pages/LoginPage.vue'),
            beforeEnter: (to, from, next) => {
                isUserAuthenticated() ? next('/') : next();
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        !isUserAuthenticated() ? next({ name: 'login' }) : next();
    } else {
        next();
    }
});

export default router;
