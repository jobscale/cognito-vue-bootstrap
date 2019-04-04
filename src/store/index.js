import Vue from 'vue';
import Vuex from 'vuex';
import createPersist from 'vuex-localstorage';

// Modules
import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    auth,
  },
  strict: debug,
  plugins: [createPersist({
    namespace: 'cognito-vue-bootstrap',
    initialState: {},
    // ONE_WEEK
    expires: 7 * 24 * 60 * 60 * 1e3,
  })],
});

export default store;
