<template>
    <div class="card">
        <img class="card-img-top" :src="photo" :alt="name">
        <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>
            <p class="card-text" v-if="email">{{ email }}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="view">View</button>
                </div>
                <small class="text-muted">Updated {{ updatedAt | diffForHuman }}</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        photo: { type: String, required: true },
        email: { type: String, required: false },
        updatedAt: { type: String, required: false },
    },
    methods: {
        view() {
            this.$router.push({ name: 'contact-view', params: { id: `${this.id}` } });
        },
    }
};
</script>
