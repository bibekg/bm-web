// @flow

export const BASE_API_URL = {
  development: 'http://localhost:3000/api',
  staging: '/api',
  production: '/api'
}[process.env.NODE_ENV || 'development']

const BASE = {
  user: `${BASE_API_URL}/user`,
  admin: `${BASE_API_URL}/admin`,
  signup: `${BASE_API_URL}/signup`
}

// ///////////////////////////
// Current user apis
// ///////////////////////////

export const GET_CURRENT_USER = {
  URL: `${BASE.user}`,
  METHOD: 'GET'
}

export const EDIT_CURRENT_USER = {
  URL: `${BASE.user}`,
  METHOD: 'POST'
}

export const DECIDE_ON_MATCH = {
  URL: `${BASE.user}/likematch`,
  METHOD: 'POST'
}

export const DEACTIVATE_USER = {
  URL: `${BASE.user}/deactivate`,
  METHOD: 'POST'
}

export const GET_CURRENT_MATCH = {
  URL: `${BASE.user}/current-match`,
  METHOD: 'GET'
}

export const SUBMIT_FEEDBACK = {
  URL: `${BASE.user}/feedback`,
  METHOD: 'POST'
}

export const UPDATE_USER_PROFILE_PIC = {
  URL: `${BASE.user}/profile-picture`,
  METHOD: 'POST'
}

export const SUBMIT_AVAILABILITY = {
  URL: `${BASE.user}/availability`,
  METHOD: 'POST'
}

export const SUBMIT_MATCH_FEEDBACK = {
  URL: `${BASE.user}/match-feedback`,
  METHOD: 'POST'
}

export const GET_COUNTDOWN_TIME = {
  URL: `${BASE.user}/countdown`,
  METHOD: 'GET'
}

export const SUBMIT_DISLIKE_MATCH_FEEDBACK = {
  URL: `${BASE.user}/dislike-match-feedback`,
  METHOD: 'POST'
}

// ///////////////////////////
// Admin APIs
// ///////////////////////////

export const GET_ALL_USERS = {
  URL: `${BASE.admin}/users`,
  METHOD: 'GET'
}

export const GET_ALL_MATCHES = {
  URL: `${BASE.admin}/matches`,
  METHOD: 'GET'
}

export const GET_USER_META = {
  URL: `${BASE.admin}/usermeta`,
  METHOD: 'GET'
}

export const MATCH_USERS = {
  URL: `${BASE.admin}/matchmaking`,
  METHOD: 'POST'
}

export const GET_ALL_FEEDBACK = {
  URL: `${BASE.admin}/feedback`,
  METHOD: 'GET'
}

export const RESET_MATCHES = {
  URL: `${BASE.admin}/matchmaking`,
  METHOD: 'DELETE'
}

export const POST_AUTO_MATCHMAKING = {
  URL: `${BASE.admin}/makematches`,
  METHOD: 'POST'
}

export const GET_ADMIN_STATS = {
  URL: `${BASE.admin}/stats`,
  METHOD: 'GET'
}

export const HARD_DELETE_USER = {
  URL: `${BASE.admin}/user`,
  METHOD: 'DELETE'
}

export const DELETE_MATCH = {
  URL: `${BASE.admin}/match`,
  METHOD: 'DELETE'
}

// ///////////////////////////
// Sign-up flow APIs
// ///////////////////////////

export const REQUEST_EMAIL_VERIFICATION = {
  URL: `${BASE.signup}/base`,
  METHOD: 'POST'
}

export const VERIFY_USER = {
  URL: `${BASE.signup}/verify`,
  METHOD: 'POST'
}
