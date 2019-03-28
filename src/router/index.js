import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import SignOut from '@/pages/auth/SignOut';
import ConfirmSignUp from '@/pages/auth/ConfirmSignUp';
import PasswordReset from '@/pages/auth/PasswordReset';
import ChangePassword from '@/pages/auth/ChangePassword';
import ConfirmPasswordReset from '@/pages/auth/ConfirmPasswordReset';

import store from '@/store';

Vue.use(Router);

const routes = [
  {
    path: '/', name: 'home', component: Home, meta: {title: 'Home', auth: false}
  },
  {
    path: '/dashboard', name: 'dashboard', component: Dashboard, meta: {title: 'Dashboard', auth: true}
  },
  {
    path: '/signIn', name: 'signIn', component: SignIn, meta: {title: 'Sign In', auth: false}
  },
  {
    path: '/signOut', name: 'signOut', component: SignOut, meta: {title: 'Sign Out', auth: true}
  },
  {
    path: '/signUp', name: 'signUp', component: SignUp, meta: {title: 'Sign Up', auth: false}
  },
  {
    path: '/confirmSignUp',
    name: 'confirmSignUp',
    component: ConfirmSignUp,
    meta: {title: 'Confirm SignUp', auth: false}
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ChangePassword,
    meta: {title: 'Change Password', auth: true}
  },
  {
    path: '/passwordReset',
    name: 'passwordReset',
    component: PasswordReset,
    meta: {title: 'Password Reset', auth: false}
  },
  {
    path: '/confirmPasswordReset',
    name: 'confirmPasswordReset',
    component: ConfirmPasswordReset,
    meta: {title: 'Confirm Password Reset', auth: false}
  },
];

const router = new Router({mode: "history", routes});

// this routine will ensure that any pages marked as `auth` in the `meta` section are
// protected from access by unauthenticated users.
router.beforeEach((to, from, next) => {
  // Use the page's router title to name the page
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  // is there a meta and auth attribute?
  if (to.meta && to.meta.auth !== undefined) {

    // if the page requires auth
    if (to.meta.auth) {
      // and we are authenticated?
      if (store.getters['auth/isAuthenticated']) {
        next(); // route normally
        return;
      }
      // otherwise off to the sign in page
      router.push({name: 'signIn'});
      return;
    }
    // otherwise are we already authenticated?
    if (store.getters['auth/isAuthenticated']) {
      // yes we are, so off to dashboard
      router.push({name: 'dashboard'});
      return;
    }
    next(); // route normally
    return;
  }
  next(); // route normally
  return;
});

export default router;