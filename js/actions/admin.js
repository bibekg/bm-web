// @flow

import axios from 'axios'
import { makeApiRequest } from 'actions'
import * as API from 'constants/api-endpoints'
import * as ACTIONS from 'actions/types'

export const getAllUsersSuccess = (users: Array<UserType>) => ({
  type: ACTIONS.GET_ALL_USERS_SUCCESS,
  payload: users
})

export const getAllUsers = (query?: Array<string>, properties?: Array<string>, callback?: ReduxCallbackType<*>) => (
  dispatch: *,
  getState: *
) =>
  makeApiRequest(API.GET_ALL_USERS, getState().auth.accessToken, {
    query: query || {},
    properties
  })
    .then(response => {
      dispatch(getAllUsersSuccess(response.data.users))
      if (callback) {
        callback(null, response.data)
      }
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      if (callback) {
        callback(err)
      }
    })

export const hardDeleteUser = (userId: string) => (dispatch: *, getState: *) =>
  makeApiRequest(API.HARD_DELETE_USER, getState().auth.accessToken, { userId })

export const deleteMatch = (matchId: string) => (dispatch: *, getState: *) =>
  makeApiRequest(API.DELETE_MATCH, getState().auth.accessToken, { id: matchId })

export const editMatch = (match: object) => (dispatch: *, getState: *) =>
  makeApiRequest(API.EDIT_MATCH, getState().auth.accessToken, { match })

export const getAllMatchesSuccess = (matches: Array<MatchEdgeType>) => ({
  type: ACTIONS.GET_ALL_MATCHES_SUCCESS,
  payload: matches
})

export const getAllMatches = (callback?: ReduxCallbackType<*>) => (dispatch: *, getState: *) =>
  makeApiRequest(API.GET_ALL_MATCHES, getState().auth.accessToken)
    .then(response => {
      dispatch(getAllMatchesSuccess(response.data.matches))
      if (callback) callback(null, response.data)
    })
    .catch(err => {
      if (callback) callback(err, null)
    })

export const createNewMatch = (userIds: Array<string>, variants: Array<string>, callback: *) => (
  dispatch: *,
  getState: *
) =>
  axios({
    method: API.MATCH_USERS.METHOD,
    url: API.MATCH_USERS.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    },
    // eslint-disable-next-line no-underscore-dangle
    data: {
      userIds,
      variants
    }
  })
    .then(response => {
      if (callback) {
        callback(null, response)
      }
    })
    .catch(err => {
      callback(err, null)
    })

export const runMatchmaking = () => (dispatch: *, getState: *) =>
  axios({
    method: API.RUN_MATCHMAKING.METHOD,
    url: API.RUN_MATCHMAKING.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })

// eslint-disable-next-line flowtype/no-weak-types
export const resetMatches = (callback?: (?Error, ?Object) => void) => (dispatch: *, getState: *) =>
  axios({
    method: API.RESET_MATCHES.METHOD,
    url: API.RESET_MATCHES.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(res => {
      if (res && res.data && res.data.status === 'success') {
        if (callback) {
          callback(null, res)
        }
      } else if (callback) {
        callback(new Error(res.data.message), null)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
    })

export const postAutoMatchmaking = (callback: (?Error, *) => void) => (dispatch: *, getState: *) =>
  axios({
    method: API.POST_AUTO_MATCHMAKING.METHOD,
    url: API.POST_AUTO_MATCHMAKING.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(res => {
      if (res && res.data && res.data.status === 'success') {
        if (callback) {
          callback(null, res)
        }
      } else if (callback) {
        callback(new Error(res.data.message), null)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
    })

export const getAdminStatsSuccess = (stats: AdminStatsType) => ({
  type: ACTIONS.GET_ADMIN_STATS_SUCCESS,
  payload: stats
})

export const getAdminStats = (callback?: ReduxCallbackType<*>) => (dispatch: *, getState: *) =>
  axios({
    method: API.GET_ADMIN_STATS.METHOD,
    url: API.GET_ADMIN_STATS.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(response => {
      dispatch(getAdminStatsSuccess(response.data.stats))
      if (callback) {
        callback(null, response.data.user)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
    })
