<template>
    <li class="nav-item">
        <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
    </li>
</template>

<script>
export default {
    methods: {
        logout () {
            this.$auth.logout().then(() => {
                this.$router.push({ name: 'homepage' });
            });
        }
    }
};
</script>
