<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container d-flex justify-content-between">
            <router-link :to="{ name: 'homepage' }" class="navbar-brand">My App</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <router-link tag="li" class="nav-item" :to="{ name: 'homepage' }" exact>
                        <a class="nav-link">Home</a>
                    </router-link>
                    <router-link v-if="isAuthenticated" tag="li" class="nav-item" :to="{ name: 'contact-list' }">
                        <a class="nav-link">Contacts</a>
                    </router-link>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown justify-content-end" v-if="isAuthenticated && currentUser.name">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hi, {{ currentUser.name }}
                            <img :src="currentUser.imageUrl" class="rounded" />
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                            <logout />
                        </div>
                    </li>
                    <router-link v-else tag="li" class="nav-item" :to="{ name: 'login' }" exact>
                        <a class="nav-link">Login</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Logout from '@/components/Logout.vue';

export default {
    props: {
        currentUser: { type: Object, default: null },
        isAuthenticated: { type: Boolean, required: true },
    },
    components: { Logout },
};
</script>
