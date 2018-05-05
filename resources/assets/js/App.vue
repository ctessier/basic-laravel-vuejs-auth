<template>
    <div class="app">
        <Navbar :isAuthenticated="isAuthenticated" />
        <div class="container mt-4">
            <router-view />
        </div>
    </div>
</template>

<script>
import store from './store';
import Navbar from './components/Navbar.vue';
import { isUserAuthenticated } from './utils/auth';

export default {
    components: { Navbar },
    computed: {
        isAuthenticated () {
            return isUserAuthenticated();
        },
    },
    beforeMount() {
        if (this.isAuthenticated) {
            store.dispatch('user/fetch');
        }
    },
};
</script>
