<template>
    <div class="card-columns">
        <p v-if="loading">Loading...</p>
        <contact-card
            v-for="contact in contacts"
            :id="contact.id"
            :key="contact.id"
            :email="contact.email"
            :updatedAt="contact.updated_at"
            :name="`${contact.firstname} ${contact.lastname}`"
            :photo="`http://i.pravatar.cc/288?img=${contact.id+10}`"
        />
    </div>
</template>

<script>
import ContactCard from '@/components/ContactCard.vue';
import contactService from '@/services/contactService';

export default {
    components: { ContactCard },
    data() {
        return {
            contacts: [],
            error: null,
            loading: true,
        }
    },
    created() {
        contactService.getAll()
            .then(({ data }) => {
                this.contacts = data;
            })
            .catch((error) => {
                this.error = error;
            })
            .finally(() => {
                this.loading = false;
            });
    },
};
</script>
