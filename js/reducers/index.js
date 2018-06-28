// @flow

import { combineReducers } from 'redux'
import authenticationReducer from './authentication'
import userReducer from './user'
import matchReducer from './match'
import adminReducer from './admin'

export default combineReducers({
  auth: authenticationReducer,
  user: userReducer,
  admin: adminReducer,
  match: matchReducer
})
