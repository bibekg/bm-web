// @flow

import { combineReducers } from 'redux'
import authenticationReducer from './authentication'
import userReducer from './user'
import matchReducer from './match'
import adminReducer from './admin'
import recentReducer from './recent'

export default combineReducers({
  auth: authenticationReducer,
  user: userReducer,
  recent: recentReducer,
  admin: adminReducer,
  match: matchReducer
})
