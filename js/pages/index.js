// @flow

import AboutPage from './AboutPage'
import FAQPage from './FAQPage'
import LandingPage from './LandingPage'
import MainPage from './MainPage'
import PrivacyPolicyPage from './PrivacyPolicyPage'
import ProfilePage from './ProfilePage'
import ProfileEditPage from './ProfileEditPage'
import AdminPage from './AdminPage'
import ConfirmationPage from './ConfirmationPage'
import SignUpPage from './SignUpPage'
import UserVerificationPage from './UserVerificationPage'
import TermsOfServicePage from './TermsOfServicePage'
import ErrorPage from './ErrorPage'

const pageRoutes: { [string]: PageRouteType } = {
  about: {
    component: AboutPage,
    path: '/about',
    exact: false,
    showNavBar: true
  },
  faq: {
    component: FAQPage,
    path: '/faq',
    exact: false,
    showNavBar: true
  },
  landing: {
    component: LandingPage,
    path: '/',
    exact: true,
    showNavBar: true
  },
  main: {
    component: MainPage,
    path: '/main',
    exact: false,
    requireAuth: true,
    showNavBar: true
  },
  privacyPolicy: {
    component: PrivacyPolicyPage,
    path: '/privacy',
    exact: true,
    showNavBar: true
  },
  profile: {
    component: ProfilePage,
    path: '/profile',
    exact: true,
    requireAuth: true,
    showNavBar: true
  },
  profileEdit: {
    component: ProfileEditPage,
    path: '/profile/edit',
    exact: true,
    requireAuth: true,
    showNavBar: true
  },
  confirmation: {
    component: ConfirmationPage,
    path: '/confirmation',
    exact: true
  },
  admin: {
    component: AdminPage,
    path: '/admin',
    exact: false,
    requireAuth: true,
    requireAdmin: true,
    showNavBar: true
  },
  signup: {
    component: SignUpPage,
    path: '/signup',
    exact: true,
    requireAuth: true
  },
  verification: {
    component: UserVerificationPage,
    path: '/verify',
    exact: false,
    requireAuth: true
  },
  terms: {
    component: TermsOfServicePage,
    path: '/terms',
    exact: true,
    requireAuth: false,
    showNavBar: true
  },
  error: {
    component: ErrorPage,
    path: '',
    exact: false,
    showNavBar: true
  }
  // Adding a new route? Make sure to add it above the ErrorPage route so that
  // it gets caught in the Switch and doesn't result in a 404 page
}

export default pageRoutes
