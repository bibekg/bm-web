// @flow

import produce from 'immer'
import {
  GET_MATCH_SUCCESS,
  SET_RENDEZVOUS_TIME,
  MARK_RENDEZVOUS_UNSCHEDULABLE,
  MARK_AVAILABILITY_SUBMITTED,
  UPDATE_LIKE_STATUS,
  MARK_MATCH_FEEDBACK_SUBMITTED,
  MARK_DISLIKE_MATCH_FEEDBACK_SUBMITTED,
  CLEAR_MATCH
} from 'actions/types'

const DEFAULT_MATCH_STATE = null

const matchProducer: (MatchStateType, MatchActionType) => MatchStateType = produce(
  (draft: MatchStateType, action: MatchActionType) => {
    if (action.type === SET_RENDEZVOUS_TIME) {
      if (draft) {
        draft.rendezvousState = 'scheduled'
        draft.rendezvousTime = action.payload
      }
    } else if (action.type === MARK_RENDEZVOUS_UNSCHEDULABLE) {
      if (draft) {
        draft.rendezvousState = 'unschedulable'
      }
    } else if (action.type === MARK_AVAILABILITY_SUBMITTED) {
      if (draft && draft.participants && draft.participants.self) {
        draft.participants.self.updatedAvailability = true
      }
    } else if (action.type === UPDATE_LIKE_STATUS) {
      if (draft && draft.participants && draft.participants.self) {
        draft.participants.self.likeState = action.payload ? 'liked' : 'disliked'
      }
    } else if (action.type === MARK_MATCH_FEEDBACK_SUBMITTED) {
      if (draft && draft.participants && draft.participants.self) {
        draft.participants.self.matchFeedback = action.payload
      }
    } else if (action.type === MARK_DISLIKE_MATCH_FEEDBACK_SUBMITTED) {
      if (draft && draft.participants && draft.participants.self) {
        draft.participants.self.dislikeMatchFeedback = action.payload
      }
    }
  }
)

const matchReducer = (state: MatchStateType = DEFAULT_MATCH_STATE, action: MatchActionType): MatchStateType => {
  const { type, payload } = action
  if (type === GET_MATCH_SUCCESS) {
    return payload
  } else if (type === CLEAR_MATCH) {
    return null
  } else if (state != null) {
    return matchProducer(state, action)
  }

  return state
}

export default matchReducer
