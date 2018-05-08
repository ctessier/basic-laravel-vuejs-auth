import router from './router';
import store from './store';

/**
 * @var {string} OAUTH_TOKEN_ENDPOINT The Laravel Passport endpoint to perform a
 * login and refresh token request.
 */
const OAUTH_TOKEN_ENDPOINT = '/oauth/token';

/**
 * @var {string} USER_ENDPOINT The Laravel API endpoint to fetch the logged in
 * user's information.
 */
const USER_ENDPOINT = '/api/user';

/**
 * @var {array} INVALID_ACCESS_TOKEN_ERRORS The list of error messages sent by
 * Laravel Passport when a request is made with an expired access or refresh
 * token.
 */
const INVALID_TOKEN_ERRORS = [
    'Unauthenticated.',
    'The refresh token is invalid.',
];

/**
 * Passport Auth plugin
 *
 * Provide `login` and `logout` methods for your components and handles token
 * authentication with axios and LaraveL Passport OAuth2 server.
 *
 * @see https://vuejs.org/v2/guide/plugins.html for more info on Vue.js plugins.
 * @see https://github.com/prograhammer/vue-example-project which inspired this
 * plugin.
 *
 * Usage:
 *
 *      // register the plugin...
 *      Vue.use(passportAuthPlugin, {
 *          client_id: 1,
 *          client_secret: 'secret',
 *      });
 *
 *      // login the user...
 *      this.$auth.login(username, password)
 *          .then(() => {
 *              // user is logged in
 *          })
 *          .catch(() => {
 *              // login failed
 *          })
 *
 *      // perform authenticated API calls...
 *
 *      // logout the user...
 *      this.$auth.logout();
 */
export default {

    /**
     * @private
     * @var {string} _client_id The Laravel Passport Password client id.
     */
    _client_id: null,

    /**
     * @private
     * @var {string} _client_secret The Laravel Passport Password client secret.
     */
    _client_secret: null,

    /**
     * @private
     * @var {string} _scope The Laravel Passport scope.
     */
    _scope: '*',

    /**
     * Initialize the plugin by setting up the interceptors on the `axios`
     * instance.
     *
     * - The user's access token is added on each outgoing request if it exists.
     * - If a request fails because of an invalid access token, a refresh token
     * request is performed.
     *
     * @private
     * @return {void}
     */
    _init () {
        axios.interceptors.request.use((request) => {
            const { accessToken } = store.state.auth;

            if (accessToken && !request.headers.Authorization) {
                this._setAuthHeader(request, accessToken);
            }

            return request;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(undefined, (error) => {
            const originalRequest = error.config;
            const isOAuthRequest = error.config.url === OAUTH_TOKEN_ENDPOINT;

            if (
                !isOAuthRequest &&
                this._isInvalidToken(error.response) &&
                !originalRequest._retry
            ) {
                const { refreshToken } = store.state.auth;
                originalRequest._retry = true;
                return this._refreshToken(refreshToken, originalRequest);
            }

            return Promise.reject(error.response);
        });
    },

    /**
     * Set the Authorization header of a given request with an access token.
     *
     * @private
     * @param {Request} request The axios request instance to set the header on.
     * @param {string} accessToken The access token to add to the request.
     * @return {void}
     */
    _setAuthHeader (request, accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    },

    /**
     * Tells whether a response fails because of an invalid token.
     *
     * @private
     * @param {Response} response The axios response instance
     * @return {boolean}
     */
    _isInvalidToken (response) {
        const { status, data } = response;
        return status === 401 && INVALID_TOKEN_ERRORS.includes(data.message);
    },

    /**
     * Store the user's access token, refresh token and expires in to the store.
     *
     * @private
     * @param {object} responseData The axios response data.
     * @return {void}
     */
    _storeToken (responseData) {
        const { access_token, refresh_token, expires_in } = responseData;
        store.commit('login', { access_token, refresh_token, expires_in });
    },

    /**
     * Store the user's information.
     *
     * @private
     * @param {object} responseData The axios response data.
     * @return {void}
     */
    _storeUser (responseData) {
        store.dispatch('user/receive', responseData);
    },

    /**
     * Retry a given request.
     *
     * @private
     * @param {Request} request The axios request instance to retry.
     * @return {void}
     */
    _retry (request) {
        this._setAuthHeader(request, store.state.auth.accessToken);
        return axios(request)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },

    /**
     * Trigger a refresh token process which will also retry a failed request.
     *
     * @private
     * @param {string} refreshToken The user's refresh token.
     * @param {Request} request The axios request instance to retry after the
     * token has been refreshed.
     * @return {Promise}
     */
    _refreshToken (refreshToken, request) {
        const params = {
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken,
            'client_id': this._client_id,
            'client_secret': this._client_secret,
        };

        return axios.post(OAUTH_TOKEN_ENDPOINT, params)
            .then((response) => {
                this._storeToken(response.data);
                return this._retry(request);
            })
            .catch((errorResponse) => {
                if (this._isInvalidToken(errorResponse)) {
                    this.logout();
                }
                return errorResponse;
            });
    },

    /**
     * Install the plugin.
     *
     * @param {Vue} Vue The Vue instance.
     * @param {object} options The plugin options.
     * @return {void}
     */
    install (Vue, options) {
        this._client_id = options.client_id;
        this._client_secret = options.client_secret;
        this._scope = options.scope || this._scope;

        this._init();

        Vue.prototype.$auth = Vue.auth = this;
    },

    /**
     * Log the user in.
     *
     * @param {string} username The user's username.
     * @param {string} password The user's password.
     * @return {Promise}
     */
    login (username, password) {
        const params = {
            'grant_type': 'password',
            'client_id': this._client_id,
            'client_secret': this._client_secret,
            'username': username,
            'password': password,
            'scope': this._scope,
        };

        return axios.post(OAUTH_TOKEN_ENDPOINT, params)
            .then((response) => {
                this._storeToken(response.data);
                return axios.get(USER_ENDPOINT);
            })
            .then((response) => {
                this._storeUser(response.data);
            })
            .catch((error) => {
                throw error;
            });
    },

    /**
     * Log the user out.
     *
     * @return {void}
     */
    logout () {
        return new Promise((resolve, reject) => {
            store.commit('logout');
            router.push({ path: '/' });
            resolve();
        });
    },

}
