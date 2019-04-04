import { mapState } from 'vuex';

const logging = console;

export default {
  data() {
    const url = 'https://mrfkz8e0na.execute-api.ap-northeast-1.amazonaws.com';
    const stage = 'dev-stage';
    return {
      urlApi: `${url}/${stage}`,
      resource: 'user',
    };
  },
  computed: {
    ...mapState({
      user: state => (state => {
        logging.info({ state });
        return state;
      })(state).auth.user,
    }),
  },
  methods: {
    invoke() {
      const url = `${this.urlApi}/user`;
      const { jwtToken } = this.user.signInUserSession.accessToken;
      const headers = {
        Authorization: jwtToken,
      };
      const options = {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
      };
      fetch(url, options)
      .then(res => res.json())
      .catch(e => e.message)
      .then(res => logging.info(res));
    },
    invoke2() {
      const url = `${this.urlApi}/guest`;
      const { jwtToken } = this.user.signInUserSession.accessToken;
      const headers = {
        Authorization: jwtToken,
      };
      const options = {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
      };
      fetch(url, options)
      .then(res => res.json())
      .catch(e => e.message)
      .then(res => logging.info(res));
    },
  },
};
