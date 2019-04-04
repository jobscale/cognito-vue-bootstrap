import Auth from '@aws-amplify/auth';
import { Logger } from '@aws-amplify/core';

Logger.LOG_LEVEL = 'DEBUG'; // to show detailed logs from Amplify library
const logger = new Logger('store:auth');
const logging = console;

// initial state
const state = {
  user: null,
  isAuthenticated: false,
  authenticationStatus: null,
};

const getters = {
  authenticatedUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated,
  authenticationStatus: state => state.authenticationStatus
    ? state.authenticationStatus
    : { variant: 'secondary' },
  hasAuthenticationStatus: state => !!state.authenticationStatus,
};

const mutations = {
  setAuthenticationError(state, err) {
    logger.debug('auth error: {}', err);
    state.authenticationStatus = {
      state: 'failed', message: err.message, variant: 'danger',
    };
  },
  clearAuthenticationStatus: (state) => {
    state.authenticationStatus = null;
  },
  setUserAuthenticated(state, user) {
    logging.info({ user });
    state.user = user;
    state.session = user.getSignInUserSession();
    state.isAuthenticated = true;
  },
  clearAuthentication(state) {
    state.user = null;
    state.userId = null;
    state.isAuthenticated = false;
  },
};

const actions = {
  clearAuthenticationStatus: (context) => {
    context.commit('clearAuthenticationStatus', null);
  },
  signIn: async (context, params) => {
    logger.debug('signIn for {}', params.username);
    context.commit('auth/clearAuthenticationStatus', null, { root: true });
    return Auth.signIn(params.username, params.password)
    .then(user => {
      logging.info({ user });
      context.commit('setUserAuthenticated', user);
      if (user.challengeName !== 'NEW_PASSWORD_REQUIRED') {
        return user;
      }
      logger.debug('complete new password for {}', context.state.user.username);
      const { requiredAttributes } = user.challengeParam;
      logging({ requiredAttributes });
      return Auth.completeNewPassword(user, params.password, requiredAttributes)
      .catch(err => {
        logging.error({ err });
        context.commit('auth/setAuthenticationError', err, { root: true });
      });
    })
    .catch(err => {
      context.commit('auth/setAuthenticationError', err, { root: true });
    });
  },
  signOut: async (context) => Auth.signOut()
  .catch(err => {
    logger.error('error during sign out: {}', err);
  })
  .then(() => {
    context.commit('auth/clearAuthentication', null, { root: true });
  }),
  signUp: async (context, params) => {
    context.commit('auth/clearAuthenticationStatus', null, { root: true });
    return Auth.signUp(params)
    .then(() => {
      context.commit('auth/clearAuthentication', null, { root: true });
    })
    .catch(err => {
      context.commit('auth/setAuthenticationError', err, { root: true });
    });
  },
  confirmSignUp: async (context, params) => {
    logger.debug('confirm signup for {}', params.username);
    context.commit('auth/clearAuthenticationStatus', null, { root: true });
    return Auth.confirmSignUp(params.username, params.code)
    .catch(err => {
      context.commit('auth/setAuthenticationError', err, { root: true });
    });
  },
  confirmResend: async (context, params) => {
    context.commit('auth/clearAuthenticationStatus', null, { root: true });
    return Auth.resendSignUp(params.username)
    .catch(err => {
      context.commit('auth/setAuthenticationError', err, { root: true });
    });
  },
  passwordReset: async (context, params) => {
    context.commit('auth/clearAuthenticationStatus', null, { root: true });
    return Auth.forgotPassword(params.username)
    .catch(err => {
      context.commit('auth/setAuthenticationError', err, { root: true });
    });
  },
  confirmPasswordReset: async (context, params) => {
    context.commit('auth/clearAuthenticationStatus', null, { root: true });
    return Auth.forgotPasswordSubmit(params.username, params.code, params.password)
    .catch(err => {
      context.commit('auth/setAuthenticationError', err, { root: true });
    });
  },
  passwordResetResend: async (context, params) => {
    context.commit('auth/clearAuthenticationStatus', null, { root: true });
    return Auth.passwordResetResend(params.username)
    .catch(err => {
      context.commit('auth/setAuthenticationError', err, { root: true });
    });
  },
  passwordChange: async (context, params) => {
    logger.debug('password change for {}', context.state.user.username);
    context.commit('auth/clearAuthenticationStatus', null, { root: true });
    const user = await Auth.currentAuthenticatedUser();
    return Auth.changePassword(user, params.currentPassword, params.newPassword)
    .catch(err => {
      logging.error({ err });
      context.commit('auth/setAuthenticationError', err, { root: true });
    });
  },
};

Object.keys(getters).forEach(key => {
  const invoke = getters[key];
  getters[key] = (...argv) => {
    logging.info({ getters: key });
    return invoke(...argv);
  };
});
Object.keys(mutations).forEach(key => {
  const invoke = mutations[key];
  mutations[key] = (...argv) => {
    logging.info({ mutations: key });
    return invoke(...argv);
  };
});
Object.keys(actions).forEach(key => {
  const invoke = actions[key];
  actions[key] = (...argv) => {
    logging.info({ actions: key });
    return invoke(...argv);
  };
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
