<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link :to="{ name: 'homepage' }" class="navbar-brand">My App</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link tag="li" class="nav-item" :to="{ name: 'homepage' }" exact>
                    <a class="nav-link">Home</a>
                </router-link>
                <logout v-if="isAuthenticated"></logout>
                <router-link v-else tag="li" class="nav-item" :to="{ name: 'login' }" exact>
                    <a class="nav-link">Login</a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
import Logout from './Logout.vue';

export default {
    props: {
        isAuthenticated: { type: Boolean, required: true },
    },
    components: { Logout },
};
</script>
