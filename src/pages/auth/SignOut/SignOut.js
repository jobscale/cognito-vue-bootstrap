import router from '@/router';

export default {
  async created() {
    await this.$store.dispatch('auth/signOut');
    router.push('/');
  },
};
