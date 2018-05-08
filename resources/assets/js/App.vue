<template>
    <div class="app">
        <Navbar :isAuthenticated="isAuthenticated" :currentUser="currentUser" />
        <div class="container mt-4">
            <router-view :isAuthenticated="isAuthenticated" :currentUser="currentUser" />
        </div>
    </div>
</template>

<script>
import store from './store';
import Navbar from './components/Navbar.vue';
import { isUserAuthenticated, getCurrentUser } from './utils/auth';

export default {
    components: { Navbar },
    computed: {
        isAuthenticated: () => isUserAuthenticated(),
        currentUser: () => getCurrentUser(),
    },
    created() {
        if (this.isAuthenticated) {
            store.dispatch('user/fetch');
        }
    },
};
</script>
