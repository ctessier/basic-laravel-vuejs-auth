<template>
    <router-link
        exact
        tag="button"
        type="button"
        :to="{ name: target }"
        class="btn btn-outline-secondary"
    >
        Back
    </router-link>
</template>

<script>
export default {
    props: {
        target: { type: String, required: true },
    },
};
</script>
