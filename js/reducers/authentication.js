// @flow

import * as ACTIONS from 'actions/types'

const DEFAULT_AUTHENTICATION_STATE = {
  isLoggedIn: null,
  accessToken: null,
  userId: null
}

const authenticationReducer = (
  state: AuthenticationStateType = DEFAULT_AUTHENTICATION_STATE,
  action: AuthenticationActionType
): AuthenticationStateType => {
  switch (action.type) {
    case ACTIONS.UPDATE_AUTH:
      if (action.payload) {
        const { isLoggedIn, accessToken, userId } = action.payload
        return isLoggedIn ? { isLoggedIn: true, accessToken, userId } : { isLoggedIn: false }
      }
      return state

    default:
      return state
  }
}

export default authenticationReducer
