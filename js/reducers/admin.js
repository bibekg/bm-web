// @flow

import * as ACTIONS from 'actions/types'

const DEFAULT_ADMIN_STATE = {
  users: [],
  matches: [],
  stats: null
}

const adminReducer = (state: AdminStateType = DEFAULT_ADMIN_STATE, action: AdminActionType): AdminStateType => {
  switch (action.type) {
    case ACTIONS.GET_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload }
    case ACTIONS.GET_ALL_MATCHES_SUCCESS:
      return { ...state, matches: action.payload }
    case ACTIONS.GET_ADMIN_STATS_SUCCESS:
      return { ...state, stats: action.payload }
    default:
      return state
  }
}

export default adminReducer
