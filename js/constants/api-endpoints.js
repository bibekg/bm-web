// @flow

export const BASE_API_URL = {
  development: 'http://localhost:3000',
  staging: 'https://api.bruinmeat.win',
  production: 'https://api.bruinmeet.com'
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

export const GET_RECENT_MATCHES = {
  URL: `${BASE.user}/mutual-matches`,
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

// User related
export const GET_ALL_USERS = {
  URL: `${BASE.admin}/users`,
  METHOD: 'GET'
}

export const HARD_DELETE_USER = {
  URL: `${BASE.admin}/user`,
  METHOD: 'DELETE'
}

// Match related
export const GET_ALL_MATCHES = {
  URL: `${BASE.admin}/match`,
  METHOD: 'GET'
}

export const CREATE_MATCH = {
  URL: `${BASE.admin}/match`,
  METHOD: 'POST'
}

export const EDIT_MATCH = {
  URL: `${BASE.admin}/match`,
  METHOD: 'PUT'
}

export const DELETE_MATCH = {
  URL: `${BASE.admin}/match`,
  METHOD: 'DELETE'
}

export const RESET_MATCHES = {
  URL: `${BASE.admin}/matchmaking`,
  METHOD: 'DELETE'
}

export const RUN_MATCHMAKING = {
  URL: `${BASE.admin}/matchmaking`,
  METHOD: 'POST'
}

// Miscellaneous
export const GET_ADMIN_STATS = {
  URL: `${BASE.admin}/stats`,
  METHOD: 'GET'
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
