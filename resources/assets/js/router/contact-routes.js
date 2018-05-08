module.exports = {
    path: '/contacts',
    component: require('@/pages/ContactsPage.vue'),
    meta: { requiresAuth: true },
    children: [
        {
            path: '',
            name: 'contact-list',
            component: require('@/components/Contact/ContactList.vue'),
        },
    ]
};
