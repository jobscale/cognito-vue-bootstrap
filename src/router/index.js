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
import CompleteNewPassword from '@/pages/auth/CompleteNewPassword';
import store from '@/store';

Vue.use(Router);

const logging = console;
const routes = [
  {
    path: '/', name: 'home', component: Home, meta: { title: 'Home', auth: false },
  },
  {
    path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { title: 'Dashboard', auth: true },
  },
  {
    path: '/signIn', name: 'signIn', component: SignIn, meta: { title: 'Sign In', auth: false },
  },
  {
    path: '/signOut', name: 'signOut', component: SignOut, meta: { title: 'Sign Out', auth: true },
  },
  {
    path: '/signUp', name: 'signUp', component: SignUp, meta: { title: 'Sign Up', auth: false },
  },
  {
    path: '/confirmSignUp', name: 'confirmSignUp', component: ConfirmSignUp, meta: { title: 'Confirm SignUp', auth: false },
  },
  {
    path: '/completeNewPassword', name: 'completeNewPassword', component: CompleteNewPassword, meta: { title: 'Complete New Password', auth: true },
  },
  {
    path: '/changePassword', name: 'changePassword', component: ChangePassword, meta: { title: 'Change Password', auth: true },
  },
  {
    path: '/passwordReset', name: 'passwordReset', component: PasswordReset, meta: { title: 'Password Reset', auth: false },
  },
  {
    path: '/confirmPasswordReset', name: 'confirmPasswordReset', component: ConfirmPasswordReset, meta: { title: 'Confirm Password Reset', auth: false },
  },
];

const router = new Router({ mode: 'history', routes });

// this routine will ensure that any pages marked as `auth` in the `meta` section are
// protected from access by unauthenticated users.
router.beforeEach((to, from, next) => {
  // is there a meta and auth attribute?
  logging.info({ auth: store.getters['auth/isAuthenticated'] });
  if (to.meta && to.meta.auth && !store.getters['auth/isAuthenticated']) {
    // if the page requires auth
    // and we are authenticated?
    // otherwise off to the sign in page
    router.push({ name: 'signIn' });
    return;
  }
  // Use the page's router title to name the page
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next(); // route normally
});

export default router;
