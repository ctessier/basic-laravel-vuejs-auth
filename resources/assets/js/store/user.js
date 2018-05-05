const initState = {
    name: null,
    email: null,
}

export default {
    namespaced: true,
    state: initState,
    actions: {
        fetch ({ dispatch }) {
            axios.get('/api/user')
                .then((response) => {
                    const { name, email } = response.data;
                    dispatch('receive', { name, email });
                })
                .catch((error) => {

                });
        },
        receive ({ commit }, user) {
            commit('set', user);
        },
    },
    mutations: {
        set (state, { name, email }) {
            state.name = name;
            state.email = email;
        },
    },
}
