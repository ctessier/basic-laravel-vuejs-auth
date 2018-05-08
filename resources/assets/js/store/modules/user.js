const initState = {
    name: null,
    email: null,
    imageUrl: null,
}

export default {
    namespaced: true,
    state: initState,
    actions: {
        fetch ({ dispatch }) {
            axios.get('/api/user')
                .then((response) => {
                    dispatch('receive', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        receive ({ commit }, user) {
            commit('set', user);
        },
    },
    mutations: {
        set (state, { name, email, image_url }) {
            state.name = name;
            state.email = email;
            state.imageUrl = image_url;
        },
    },
}
