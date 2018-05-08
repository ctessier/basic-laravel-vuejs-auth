import store from '../store';

/**
 * Tells whether the user is authenticated.
 *
 * @return {boolean}
 */
export const isUserAuthenticated = () => {
    return store.state.auth.isAuthenticated;
}

/**
 * Return the current user objeect.
 *
 * @return {object}
 */
export const getCurrentUser = () => {
    return isUserAuthenticated() ? store.state.user : null;
}
