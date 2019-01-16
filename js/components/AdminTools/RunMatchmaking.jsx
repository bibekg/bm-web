import * as React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import SafeButton from '../SafeButton'

const RunMatchmaking = props => (
  <SafeButton
    workingText="Making matches..."
    buttonProps={{ warning: true }}
    onClick={(event, callback) => {
      props.runMatchmaking().then(callback)
    }}
  >
    Run Matchmaking
  </SafeButton>
)

export default connect(null, {
  runMatchmaking: actions.runMatchmaking
})(RunMatchmaking)
