import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import authModule from './auth';
import userModule from './user';

const store = new Vuex.Store({
    modules: {
        auth: authModule,
        user: userModule,
    }
});

export default store;
