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
    };
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async confirmSignUp() {
      await store.dispatch("auth/confirmSignUp", {
        username: this.username,
        code: this.code
      });
      if (!this.hasAuthenticationStatus) {
        router.push("signIn");
      }
    },
    async confirmResend() {
      await store.dispatch("auth/confirmResend", {
        username: this.username
      });
    }
  }
};
