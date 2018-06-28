// @flow

import produce from 'immer'
import {
  GET_USER_SUCCESS,
  MARK_USER_INACTIVE,
  MARK_USER_VERIFIED,
  UPDATE_USER_PROFILE_PIC_SUCCESS
} from 'actions/types'

const DEFAULT_USER_STATE = null

const userProducer: (UserStateType, UserActionType) => UserStateType = produce(
  (draft: UserStateType, action: UserActionType) => {
    if (action.type === UPDATE_USER_PROFILE_PIC_SUCCESS) {
      if (draft) {
        draft.profilePic = action.payload
      }
    } else if (action.type === MARK_USER_INACTIVE) {
      if (draft) {
        draft.active = true
      }
    } else if (action.type === MARK_USER_VERIFIED) {
      if (draft) {
        draft.verified = true
      }
    }
  }
)

const userReducer = (state: UserStateType = DEFAULT_USER_STATE, action: UserActionType): UserStateType => {
  if (action.type === GET_USER_SUCCESS) {
    return action.payload
  } else if (state == null) {
    return state
  } else {
    return userProducer(state, action)
  }
}

export default userReducer
