<template>
    <div class="row">
        <div class="col-md-12">
            <p>Welcome {{ isAuthenticated ? currentUser.name : 'visitor' }}!</p>
        </div>
    </div>
</template>

<script>
import { isUserAuthenticated, getCurrentUser } from '../utils/auth';

export default {
    computed: {
        isAuthenticated () {
            return isUserAuthenticated();
        },
        currentUser () {
            return getCurrentUser();
        }
    },
};
</script>
