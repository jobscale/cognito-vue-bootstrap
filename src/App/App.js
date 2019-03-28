import Vue from 'vue';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

Vue.component('v-menu', Menu);
Vue.component('v-footer', Footer);

export default {
  name: 'App'
};
