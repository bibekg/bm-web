// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'reducers'

const enhancers = [applyMiddleware(thunk)]

/* eslint-disable */
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}
/* eslint-enable */

export default createStore(reducers, undefined, compose(...enhancers))
