import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import authModule from './modules/auth';
import userModule from './modules/user';

const store = new Vuex.Store({
    modules: {
        auth: authModule,
        user: userModule,
    }
});

export default store;
