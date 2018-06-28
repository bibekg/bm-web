// @flow

import axios from 'axios'
import * as API from 'constants/api-endpoints'
import * as ACTIONS from 'actions/types'
import { setRendezvousTime, markRendezvousUnschedulable, markAvailabilitySubmitted } from 'actions/match'

// Merge provided user properties with existing user
export const getUserSuccess = (user: UserType) => ({
  type: ACTIONS.GET_USER_SUCCESS,
  payload: user
})

export const updateUserProfilePicSuccess = (profilePic: string) => ({
  type: ACTIONS.UPDATE_USER_PROFILE_PIC_SUCCESS,
  payload: profilePic
})

export const markUserInactive = () => ({
  type: ACTIONS.MARK_USER_INACTIVE
})

export const markUserVerified = () => ({
  type: ACTIONS.MARK_USER_VERIFIED
})

export const getCountdownTime = (callback: ReduxCallbackType<Date>) => (dispatch: *, getState: *) =>
  axios({
    method: API.GET_COUNTDOWN_TIME.METHOD,
    url: API.GET_COUNTDOWN_TIME.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(response => {
      callback(null, new Date(response.data.countdownEnd))
    })
    .catch(err => {
      callback(err)
    })

export const getUser = (onSuccess?: UserType => void) => (dispatch: *, getState: *) =>
  axios({
    method: API.GET_CURRENT_USER.METHOD,
    url: API.GET_CURRENT_USER.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(response => {
      dispatch(getUserSuccess(response.data.user))
      if (typeof onSuccess === 'function') {
        onSuccess(response.data.user)
      }
    })
    .catch(err => {
      // TODO: Set up failure actions
      // dispatch(getUserFailure(err))
      // eslint-disable-next-line no-console
      console.log(err)
    })

type EditUserResponseType = {
  data: {
    success: string,
    message: string,
    user: UserType
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export const editUser = (user: UserType, callback?: ReduxCallbackType<*>) => (dispatch: *, getState: *) =>
  axios({
    method: API.EDIT_CURRENT_USER.METHOD,
    url: API.EDIT_CURRENT_USER.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    },
    data: { user }
  })
    .then((res: EditUserResponseType) => {
      dispatch(getUserSuccess(res.data.user))
      if (callback) {
        callback(null, res)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
    })

// eslint-disable-next-line flowtype/no-weak-types
export const updateUserProfilePic = (picture: File, callback?: ReduxCallbackType<*>) => (dispatch: *, getState: *) =>
  axios({
    method: API.UPDATE_USER_PROFILE_PIC.METHOD,
    url: API.UPDATE_USER_PROFILE_PIC.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    },
    data: ((): FormData => {
      const formData = new FormData()
      // The key MUST be named picture
      formData.append('picture', picture)
      return formData
    })()
  })
    .then(res => {
      dispatch(updateUserProfilePicSuccess(res.data.profilePic))
      if (callback) {
        callback(null, res)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
    })

// eslint-disable-next-line flowtype/no-weak-types
export const requestEmailVerification = (email: ?string, callback?: ReduxCallbackType<*>) => (
  dispatch: *,
  getState: *
) =>
  axios({
    method: API.REQUEST_EMAIL_VERIFICATION.METHOD,
    url: `${API.REQUEST_EMAIL_VERIFICATION.URL}${email ? `/${email}` : ''}`,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(res => {
      if (res.data.status === 'success') {
        if (callback) {
          callback(null, res)
        }
      } else if (callback) {
        callback(new Error(res.data.message || 'Unknown server error'), null)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
    })

// eslint-disable-next-line flowtype/no-weak-types
export const deactivateUser = (callback?: ReduxCallbackType<*>) => (dispatch: *, getState: *) =>
  axios({
    method: API.DEACTIVATE_USER.METHOD,
    url: API.DEACTIVATE_USER.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(res => {
      dispatch(markUserInactive())
      if (callback) {
        callback(null, res)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
    })

// eslint-disable-next-line flowtype/no-weak-types
export const verifyUser = (hash: string, callback?: ReduxCallbackType<*>) => (dispatch: *, getState: *) =>
  axios({
    method: API.VERIFY_USER.METHOD,
    url: `${API.VERIFY_USER.URL}/${hash}`,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(res => {
      if (res.data.status === 'success') {
        dispatch(markUserVerified())
        if (callback) {
          callback(null, res)
        }
      } else if (callback) {
        callback(new Error(res.data.message || 'Unknown server error'), null)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
    })

// eslint-disable-next-line flowtype/no-weak-types
export const postFeedback = (
  feedbackCategory: FeedbackCategoryType,
  feedbackContent: string,
  callback?: ReduxCallbackType<*>
) => (dispatch: *, getState: *) =>
  axios({
    method: API.SUBMIT_FEEDBACK.METHOD,
    url: API.SUBMIT_FEEDBACK.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    },
    data: {
      feedback: {
        category: feedbackCategory,
        content: feedbackContent
      }
    }
  })
    .then(res => {
      if (callback) {
        callback(null, res)
      }
    })
    .catch(err => {
      if (callback) {
        callback(err, null)
      }
      // eslint-disable-next-line no-console
      console.log(err)
    })

// eslint-disable-next-line flowtype/no-weak-types
export const postDateAvailability = (availabilityDates: Array<Date>, callback?: (?Error, ?Object) => void) => (
  dispatch: *,
  getState: *
) =>
  axios({
    method: API.SUBMIT_AVAILABILITY.METHOD,
    url: API.SUBMIT_AVAILABILITY.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    },
    data: { availability: availabilityDates }
  })
    .then(response => {
      const { status, time, message } = response.data

      if (status === 'failure') {
        if (typeof callback === 'function') callback(new Error(message), null)
        return
      }

      if (status === 'scheduled') {
        dispatch(setRendezvousTime(time))
      } else if (status === 'unschedulable') {
        dispatch(markRendezvousUnschedulable())
      } else if (status === 'submitted') {
        dispatch(markAvailabilitySubmitted())
      }

      if (typeof callback === 'function') callback(null, response.data)
    })
    .catch(err => {
      if (typeof callback === 'function') callback(err, null)
      // eslint-disable-next-line no-console
      console.log(err)
    })
