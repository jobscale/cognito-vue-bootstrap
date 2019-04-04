import Vue from 'vue';

import { mapGetters } from 'vuex';
import router from '@/router';
import store from '@/store';

import Alert from '@/components/auth/Alert';

Vue.component('v-alert', Alert);

export default {
  data() {
    return {
      username: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['hasAuthenticationStatus']),
  },
  methods: {
    async passwordReset() {
      await store.dispatch('auth/passwordReset', {
        username: this.username,
      });
      if (!this.hasAuthenticationStatus) {
        router.push('confirmPasswordReset');
      }
    },
  },
};
