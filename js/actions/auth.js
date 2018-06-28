// @flow

import * as ACTIONS from 'actions/types'

export const updateAuth = (isLoggedIn: boolean, accessToken: string, userId: string): UpdateAuthActionType => ({
  type: ACTIONS.UPDATE_AUTH,
  payload: { isLoggedIn, accessToken, userId }
})
