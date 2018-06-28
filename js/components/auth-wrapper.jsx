// @flow

import * as React from 'react'
import type { LocationShape } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'actions'

type AuthWrapperOptionsType = {
  requireAdmin: boolean
}

const DEFAULT_WRAPPER_OPTIONS = {
  requireAdmin: false
}

const authWrapper = (
  ComposedComponent: React.ComponentType<{}>,
  authProps: AuthWrapperOptionsType = DEFAULT_WRAPPER_OPTIONS
): React.ComponentType<{}> => {
  type PropsType = {
    isLoggedIn: ?boolean,
    user: ?UserType,
    location: ?LocationShape
  }

  const Wrapper = (props: PropsType): * => {
    const redirect = (to: string): React.Element<*> => {
      if (props.location && props.location.pathname === to) {
        return <ComposedComponent {...props} />
      } else {
        return <Redirect to={to} />
      }
    }

    if (props.isLoggedIn === false) return <Redirect to="/" />

    if (props.isLoggedIn && props.user) {
      const isVerifyURL = props.location && props.location.pathname && props.location.pathname.startsWith('/verify/')

      if (!props.user.verified && isVerifyURL) {
        return <ComposedComponent {...props} />
      }

      // User is logged in and we have the user object
      if (authProps.requireAdmin && !props.user.isAdmin) {
        return redirect('/')
      } else if (!props.user.email) {
        return redirect('/signup')
      } else if (!props.user.verified) {
        return redirect('/confirmation')
      } else if (!props.user.hasProfile) {
        return redirect('/signup')
      } else {
        return <ComposedComponent {...props} />
      }
    } else {
      // Still waiting to be hydrated with login status and/or user object
      return null
    }
  }

  const mapStateToProps = (state: ReduxStateType) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.user
  })

  // Wrapper type is incompatible with withRouter parameter type
  // https://flow.org/en/docs/react/hoc/
  // flow-disable-next-line
  return connect(mapStateToProps, actions)(withRouter(Wrapper))
}

export default authWrapper
