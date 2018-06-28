// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { LocationShape } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import * as actions from 'actions'
import Loading from 'components/Loading'

type PropsType = {
  location: LocationShape,
  user: ?UserType,
  // TODO: Abstract this 2nd param type app-wide to a ReduxActionCallback
  // eslint-disable-next-line flowtype/no-weak-types
  verifyUser: (string, ?ReduxCallbackType<*>) => void
}

type StateType = {
  hash: ?string,
  done: boolean,
  error: ?Error
}

class UserVerificationPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)

    const hash = this.props.location.pathname ? this.props.location.pathname.split('/')[2] : null

    this.state = {
      hash,
      done: false,
      error: hash === null ? new Error('Missing hash') : null
    }
  }

  verifyUser(hash: string) {
    this.props.verifyUser(hash, (error, res) => {
      if (error) {
        this.setState({ error })
      }
      if (res && res.data) {
        if (res.data.status === 'success') {
          this.setState({ done: true })
        } else if (res.data.status === 'failure') {
          this.setState({ error: new Error(res.data.message) })
        }
      }
    })
  }

  componentDidMount() {
    if (this.state.hash) {
      this.verifyUser(this.state.hash)
    }
  }

  render(): ?React.Element<*> {
    if (this.state.error) {
      return <p>{this.state.error.message}</p>
    }
    return this.state.done ? <Redirect to="/signup" /> : <Loading />
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user
})

export default connect(mapStateToProps, actions)(UserVerificationPage)
