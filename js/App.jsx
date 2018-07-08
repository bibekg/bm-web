// @flow
/* global FB */

import * as React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'
import * as actions from 'actions'
import pages from 'pages'
import ScrollToTop from 'components/ScrollToTop'
import authWrapper from 'components/auth-wrapper'
import navBarWrapper from 'components/navbar-wrapper'
import { initializeFBSDK } from 'utilities/fb-sdk'
import 'polyfills'

// flow-disable-next-line
injectGlobal([
  `
  body {
    font-family: 'Montserrat', sans-serif;
    height: 100%;
    margin: 0;
  }

  #app {
    height: 100%;
  }

  body.disable-scroll {
    overflow: hidden;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
`
])

const AppDiv = styled.div`
  height: 100%;
`

type PropsType = {
  updateAuth: (boolean, ?string, ?string) => void,
  getUser: () => void
}

// App always tries to fill the auth and user Redux stores
class App extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props)
    // Initialize the Facebook SDK then try to update our Redux auth state with
    // the user's credentials if possible
    initializeFBSDK(() => {
      FB.getLoginStatus(res => {
        if (res.status === 'connected') {
          const { accessToken, userID } = res.authResponse
          this.props.updateAuth(true, accessToken, userID)
          this.props.getUser()
        } else {
          this.props.updateAuth(false, null, null)
        }
      })
    })
  }

  render(): * {
    return (
      <BrowserRouter>
        <AppDiv className="app">
          <ScrollToTop>
            <Switch>
              {Object.keys(pages).map((pageKey): * => {
                const { path, component, exact, requireAuth, requireAdmin, showNavBar } = pages[pageKey]

                // Apply a middleware-style HOC wrapping algorithm to determine
                // the exact component to render
                let componentToRender = component
                if (showNavBar) {
                  if (path === '/') {
                    componentToRender = navBarWrapper(componentToRender)
                  } else {
                    componentToRender = navBarWrapper(componentToRender, true)
                  }
                }
                // Make sure we wrap with requireAuth LAST so it is checked FIRST
                if (requireAuth) {
                  componentToRender = authWrapper(componentToRender, { requireAdmin: Boolean(requireAdmin) })
                }

                const routeProps = {
                  exact: Boolean(exact),
                  path,
                  component: componentToRender
                }

                return <Route key={path} {...routeProps} />
              })}
            </Switch>
          </ScrollToTop>
        </AppDiv>
      </BrowserRouter>
    )
  }
}

export default connect(() => ({}), actions)(App)
