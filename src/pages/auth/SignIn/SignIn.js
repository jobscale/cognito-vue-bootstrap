import Vue from 'vue';
import { mapGetters } from 'vuex';
import router from '@/router';
import store from '@/store';

import Alert from '@/components/auth/Alert';

Vue.component('v-alert', Alert);

export default {
  data() {
    return {
      email: '',
      pass: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['hasAuthenticationStatus']),
  },
  methods: {
    async signIn() {
      await store.dispatch('auth/signIn', {
        username: this.email,
        password: this.pass,
      });

      if (!this.hasAuthenticationStatus) {
        router.push('dashboard');
      }
    },
  },
};
