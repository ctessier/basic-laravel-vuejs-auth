<template>
    <div :class="`alert alert-${type}`" role="alert">
        {{ message }}
    </div>
</template>

<script>
export default {
    props: ['type', 'message'],
};
</script>
