// @flow
/* global FB */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'components/Button'
import * as actions from 'actions'

// react/no-unused-prop-types doesn't seem to be smart enough to catch the
// usage of the props inside the FB callbacks
type PropsType = {
  // If unspecified, button shows text based on Redux auth.isLoggedIn state
  override: 'login' | 'logout' | 'signup',
  // If true, shows just the text 'Log In' instead of a button
  plain?: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  history: { push: string => void },
  isLoggedIn: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  updateAuth: (boolean, ?string, ?string) => UpdateAuthActionType,
  getUser: () => void
}

function LogInButton(props: PropsType): * {
  const login = (redirect: string) => {
    const { isLoggedIn, updateAuth, history } = props
    if (isLoggedIn) {
      history.push(redirect)
    } else {
      FB.login(res => {
        if (res.status === 'connected') {
          updateAuth(true, res.authResponse.accessToken, res.authResponse.userID)
          props.getUser()
          history.push(redirect)
        }
      })
    }
  }

  const logout = () => {
    const { isLoggedIn, updateAuth, history } = props
    if (isLoggedIn) {
      FB.logout(() => {
        updateAuth(false)
        history.push('/')
      })
    } else {
      history.push('/')
    }
  }

  const handleClick = () => {
    switch (props.override) {
      case 'signup':
        login('/signup')
        return
      case 'login':
        login('/main')
        return
      case 'logout':
        logout()
        return
      default:
        break
    }

    if (props.isLoggedIn) {
      logout()
    } else {
      login('/main')
    }
  }

  const getDisplayText = (): string => {
    switch (props.override) {
      case 'signup':
        return 'Continue with Facebook'
      case 'login':
        return 'Log In'
      case 'logout':
        return 'Log Out'
      default:
        break
    }

    return props.isLoggedIn ? 'Log Out' : 'Log In'
  }
  return (
    <Button primary={props.plain} onClick={handleClick}>
      {getDisplayText()}
    </Button>
  )
}

const mapStateToProps = (state: ReduxStateType) => ({
  isLoggedIn: state.auth.isLoggedIn
})

// Wrapping with the withRouter HOC allows us to tap into the history.push() API
export default connect(mapStateToProps, actions)(withRouter(LogInButton))
