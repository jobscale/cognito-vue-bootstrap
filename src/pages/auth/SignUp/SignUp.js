import Vue from 'vue';
import router from '@/router';
import { mapGetters } from 'vuex';
import Alert from '@/components/auth/Alert';
import Amplify from '@aws-amplify/core';

const { Logger } = Amplify;

Vue.component('v-alert', Alert);

const logger = new Logger('SignUpPage');

export default {
  data() {
    return {
      username: '',
      email: '',
      name: '',
      pass: '',
    };
  },
  mounted() {
    // clear existing status message
    this.$store.dispatch('auth/clearAuthenticationStatus');
  },
  computed: {
    ...mapGetters('auth', ['hasAuthenticationStatus']),
  },
  methods: {
    async signUp() {
      logger.debug('sign-up');
      await this.$store.dispatch('auth/signUp', {
        username: this.username,
        password: this.pass,
        attributes: {
          name: this.name,
          email: this.email,
        },
      });

      if (!this.hasAuthenticationStatus) {
        router.push('confirmSignUp');
      }
    },
  },
};
