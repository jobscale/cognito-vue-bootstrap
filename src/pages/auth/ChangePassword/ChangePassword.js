import Vue from "vue";

import {mapGetters} from "vuex";
import router from "@/router";
import store from "@/store";

import Alert from "@/components/auth/Alert";

Vue.component("v-alert", Alert);

export default {
  data() {
    return {
      currentPassword: "",
      newPassword: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async passwordChange() {
      await store.dispatch("auth/passwordChange", {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      });
      if (!this.hasAuthenticationStatus) {
        router.push("dashboard");
      }
    }
  }
};
