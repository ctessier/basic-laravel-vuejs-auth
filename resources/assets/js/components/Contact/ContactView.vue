<template>
    <div v-if="!loading && !error" class="row">
        <div class="col-md-8 col-sm-12">
            <h2>{{ `${contact.firstname} ${contact.lastname}` }}</h2>
            <p>{{ contact.email }}</p>
            <button type="button" class="btn btn-outline-danger" @click="deleteContact">
                Delete
            </button>
        </div>
        <div class="col-md-4 col-sm-12">
            <p class="text-right">
                <img
                    class="card-img-top"
                    :alt="`${contact.firstname} ${contact.lastname}`"
                    :src="`http://i.pravatar.cc/288?img=${contact.id+10}`"
                />
                <small class="text-muted">
                    Updated {{ contact.updated_at | diffForHuman }}
                </small>
            </p>
        </div>
    </div>
</template>

<script>
import contactService from '@/services/contactService';

export default {
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            contact: {},
            error: null,
            loading: true,
        }
    },
    methods: {
        deleteContact() {
            if (confirm('Are you sure you want to delete this contact?')) {
                contactService.delete(this.id)
                    .then(() => this.$router.push({ name: 'contact-list' }))
                    .catch((error) => {
                        console.log(error);
                        alert('Oops, an error occurred');
                    });
            }
        },
    },
    created() {
        contactService.get(this.id)
            .then(({ data }) => {
                this.contact = data;
            })
            .catch((error) => {
                alert('Oops, an error occurred');
                this.error = error;
            })
            .finally(() => {
                this.loading = false;
            });
    }
};
</script>
