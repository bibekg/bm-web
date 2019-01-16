// @flow

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from 'App'
import reduxStore from 'app-redux-store'

const renderApp = () => {
  const appElement = document.getElementById('app')
  if (appElement) {
    render(
      <Provider store={reduxStore}>
        <App />
      </Provider>,
      appElement
    )
  }
}
renderApp()

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp()
  })
}
