// @flow

import { GET_RECENT_MATCHES_SUCESS } from '../actions/types'

const DEFAULT_RECENT_STATE = null

const recentReducer = (state: RecentStateType = DEFAULT_RECENT_STATE, action: RecentActionType): RecentStateType => {
  const { type, payload } = action
  if (type === GET_RECENT_MATCHES_SUCESS) {
    return payload
  } else if (state == null) {
    return state
  }

  return state
}

export default recentReducer
