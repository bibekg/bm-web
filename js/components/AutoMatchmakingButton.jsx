// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import SafeButton from 'components/SafeButton'
import * as actions from 'actions'

type StateType = {
  status: string // possible values: processing | done
}

class AutoMatchmakingView extends React.Component<*, StateType> {
  constructor() {
    super()
    this.state = { status: 'done' }
  }

  onMatchmakingButtonClick = (event: *, done: boolean => void) => {
    // eslint-disable-next-line no-alert
    swal({
      title: 'Reset Matches',
      text: 'Are you sure you want to reset all matches?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.setState({ status: 'processing' })
        this.props.postAutoMatchmaking(() => {
          done(true)
          this.setState({ status: 'done' })
        })
      } else {
        done(false)
      }
    })
  }

  render(): React.Element<*> {
    return (
      <SafeButton
        buttonProps={{ warning: true }}
        workingText="Matches are being made. Please wait."
        onClick={this.onMatchmakingButtonClick}
      >
        MATCHMAKING.DO()
      </SafeButton>
    )
  }
}

export default connect(() => ({}), actions)(AutoMatchmakingView)
