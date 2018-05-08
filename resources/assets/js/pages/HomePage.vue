<template>
    <div class="row">
        <div class="col-md-12">
            <p>Welcome {{ isAuthenticated && currentUser.name ? currentUser.name : 'visitor' }}!</p>
        </div>
    </div>
</template>

<script>
import { isUserAuthenticated, getCurrentUser } from '../utils/auth';

export default {
    props: {
        currentUser: { type: Object, default: null },
        isAuthenticated: { type: Boolean, required: true },
    },
};
</script>
