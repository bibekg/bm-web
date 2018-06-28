// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import SafeButton from 'components/SafeButton'
import * as actions from 'actions'

type PropsType = {
  resetMatches: (ReduxCallbackType<*>) => void
}

class ResetMatchesButton extends React.Component<PropsType> {
  onResetClick = (event: SyntheticInputEvent<*>, done: boolean => void) => {
    swal({
      title: 'Reset Matches',
      text: 'Are you sure you want to reset all matches?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(wilDelete => {
      if (wilDelete) {
        this.props.resetMatches(() => {
          done(true)
        })
      } else {
        done(false)
      }
    })
  }

  render(): * {
    return (
      <SafeButton
        buttonProps={{ warning: true }}
        workingText="Matches are being reset. Please wait."
        onClick={this.onResetClick}
      >
        Reset matches
      </SafeButton>
    )
  }
}

export default connect(() => ({}), actions)(ResetMatchesButton)
