import Vue from "vue";

import {mapGetters} from "vuex";
import router from "@/router";
import store from "@/store";

import Alert from "@/components/auth/Alert";

Vue.component("v-alert", Alert);

export default {
  data() {
    return {
      username: "",
      code: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async confirmPasswordReset() {
      await store.dispatch("auth/confirmPasswordReset", {
        username: this.username,
        code: this.code,
        password: this.password,
      });
      if (!this.hasAuthenticationStatus) {
        router.push("signIn");
      }
    },
    async passwordResetResend() {
      await store.dispatch("auth/passwordReset", {
        username: this.username
      });
    }
  }
};
