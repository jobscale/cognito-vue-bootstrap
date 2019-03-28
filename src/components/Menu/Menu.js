import {mapState} from 'vuex';

import 'vue-awesome/icons/user-circle';
import 'vue-awesome/icons/sign-out';
import 'vue-awesome/icons/github';
import 'vue-awesome/icons/twitter';

export default {
  name: 'Navbar',
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated,
    })
  },
  methods: {
    signIn() {
      this.$store.dispatch('signIn');
    }
  }
};
