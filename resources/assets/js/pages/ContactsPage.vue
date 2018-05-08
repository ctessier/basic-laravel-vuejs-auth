<template>
    <div class="row">
        <div class="col-sm-12">
            <h1>Contacts</h1>
            <router-view></router-view>
            <back-button v-if="showBackButton" :target="rootChildPageName" />
        </div>
    </div>
</template>

<script>
import BackButton from '@/components/BackButton';

export default {
    components: { BackButton },
    data() {
        return {
            rootChildPageName: 'contact-list',
        };
    },
    computed: {
        showBackButton() {
            return this.$route.name !== this.rootChildPageName;
        }
    },
};
</script>
