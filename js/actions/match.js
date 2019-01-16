// @flow

import axios from 'axios'
import * as API from 'constants/api-endpoints'
import * as ACTIONS from 'actions/types'
import { makeApiRequest } from '.'

export const getMatchSuccess = (match: MatchType) => ({
  type: ACTIONS.GET_MATCH_SUCCESS,
  payload: match
})

export const setRendezvousTime = (time: RendezvousTimeType) => ({
  type: ACTIONS.SET_RENDEZVOUS_TIME,
  payload: time
})

export const markRendezvousUnschedulable = () => ({
  type: ACTIONS.MARK_RENDEZVOUS_UNSCHEDULABLE
})

export const markAvailabilitySubmitted = () => ({
  type: ACTIONS.MARK_AVAILABILITY_SUBMITTED
})

export const updateLikeStatus = (status: boolean) => ({
  type: ACTIONS.UPDATE_LIKE_STATUS,
  payload: status
})

export const markMatchFeedbackSubmitted = (matchFeedback: MatchFeedbackType) => ({
  type: ACTIONS.MARK_MATCH_FEEDBACK_SUBMITTED,
  payload: matchFeedback
})

export const markDislikeMatchFeedbackSubmitted = (dislikeMatchFeedback: DislikeMatchFeedbackType) => ({
  type: ACTIONS.MARK_DISLIKE_MATCH_FEEDBACK_SUBMITTED,
  payload: dislikeMatchFeedback
})

export const getMatch = (callback: ReduxCallbackType<*>) => (dispatch: *, getState: *) =>
  axios({
    method: API.GET_CURRENT_MATCH.METHOD,
    url: API.GET_CURRENT_MATCH.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })
    .then(response => {
      const { match } = response.data
      if (match) {
        dispatch(getMatchSuccess(match))
        if (typeof callback === 'function') callback(null, response.data)
      }
    })
    .catch(error => {
      if (typeof callback === 'function') callback(error, null)
    })

export const postMatchAction = (likeMatch: boolean, callback: ReduxCallbackType<*>) => (dispatch: *, getState: *) =>
  axios({
    method: API.DECIDE_ON_MATCH.METHOD,
    url: API.DECIDE_ON_MATCH.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    },
    data: {
      // eslint-disable-next-line no-underscore-dangle
      matchId: getState().match._id,
      likeMatch
    }
  })
    .then(response => {
      const { match } = response.data
      if (match) {
        dispatch(getMatchSuccess(match))
        dispatch(updateLikeStatus(likeMatch))
      }
      if (typeof callback === 'function') callback(null, null)
    })
    .catch(err => {
      if (typeof callback === 'function') callback(err, null)
    })

type SubmitMatchFeedbackResponseType = {
  data: {
    nextMatch: ?MatchType,
    matchFeedback: MatchFeedbackType
  }
}
// eslint-disable-next-line flowtype/no-weak-types
export const submitMatchFeedback = (matchFeedback: MatchFeedbackType, callback?: ReduxCallbackType<*>) => (
  dispatch: *,
  getState: *
) =>
  axios({
    method: API.SUBMIT_MATCH_FEEDBACK.METHOD,
    url: API.SUBMIT_MATCH_FEEDBACK.URL,
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    },
    data: { matchFeedback }
  })
    .then((response: SubmitMatchFeedbackResponseType) => {
      dispatch(markMatchFeedbackSubmitted(response.data.matchFeedback))
      if (response.data.nextMatch) {
        dispatch(getMatchSuccess(response.data.nextMatch))
      }
      if (typeof callback === 'function') callback(null, response.data)
    })
    .catch(err => {
      if (typeof callback === 'function') callback(err, null)
      // eslint-disable-next-line no-console
      console.log(err)
    })

export const submitDislikeMatchFeedback = (dmf: DislikeMatchFeedbackType, callback?: ReduxCallbackType<*>) => (
  dispatch: *,
  getState: *
) =>
  makeApiRequest(API.SUBMIT_DISLIKE_MATCH_FEEDBACK, getState().auth.accessToken, dmf)
    .then(response => {
      dispatch(markDislikeMatchFeedbackSubmitted(response.data.dislikeMatchFeedback))
      if (callback) callback(null, response.data)
    })
    .catch(err => {
      if (callback) callback(err, null)
    })
