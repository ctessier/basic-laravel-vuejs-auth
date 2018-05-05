const loadState = () => ({
    isAuthenticated: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    expiresIn: localStorage.getItem('expiresIn') || null,
});

export default {
    state: loadState(),
    mutations: {
        login (state, { access_token, refresh_token, expires_in }) {
            state.isAuthenticated = true;
            state.accessToken = access_token;
            state.refreshToken = refresh_token;
            state.expiresIn = expires_in;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            localStorage.setItem('expiresIn', expires_in);
        },
        logout (state) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('expiresIn');
            const newState = loadState();
            Object.keys(newState).forEach(key => {
                state[key] = newState[key];
            });
        },
    },
}
