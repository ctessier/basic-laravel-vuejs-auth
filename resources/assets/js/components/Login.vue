<template>
    <div class="row">
        <div class="col-md-12">
            <h1>Login</h1>
            <message v-if="error" type="danger" :message="error" />
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="email-field">Email address</label>
                    <input type="email" class="form-control" id="email-field" placeholder="Enter email" v-model="email" />
                </div>
                <div class="form-group">
                    <label for="password-field">Password</label>
                    <input type="password" class="form-control" id="password-field" placeholder="Password" v-model="password" />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue';

export default {
    name: 'login',
    components: { Message },
    data() {
        return {
            email: '',
            password: '',
            error: null,
        }
    },
    methods: {
        submit() {
            this.error = null;
            this.$auth.login(this.email, this.password).then(() => {
                this.$router.push({ name: 'homepage' });
            }).catch((error) => {
                this.error = error;
            });
        },
    }
};
</script>
