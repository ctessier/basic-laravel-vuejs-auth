<template>
    <div :class="`alert alert-${type}`" role="alert">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'success',
        },
    },
};
</script>
