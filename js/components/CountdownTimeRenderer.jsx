// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import Countdown from 'react-countdown-now'
import * as actions from 'actions'

type PropsType = {
  render: string => React.Element<*>,
  getCountdownTime: (callback: ReduxCallbackType<Date>) => void,
  onComplete?: () => void,
  renderCountdownDone?: () => React.Element<*>
}

type StateType = {
  countDownTime: Date,
  countdownDone: boolean
}

class CountdownTimeRenderer extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      countDownTime: new Date()
    }
    props.getCountdownTime((err, countDownTime) => {
      if (!err) {
        this.setState({
          countDownTime
        })
      }
    })
  }

  componentWillMount() {
    this.setState({
      countdownDone: new Date() >= this.state.countDownTime
    })
  }

  // turn object into the string

  renderer = ({ days, hours, minutes, seconds }): React.Element<*> =>
    this.props.render(`${days}d ${hours}h ${minutes}m ${seconds}s`)

  render(): React.Element<*> {
    return (
      <div>
        <Countdown
          date={this.state.countDownTime}
          renderer={this.renderer}
          onComplete={() => this.setState({ countdownDone: true })}
        />
        {this.state.countdownDone && this.props.renderCountdownDone && this.props.renderCountdownDone()}
      </div>
    )
  }
}

export default connect(null, actions)(CountdownTimeRenderer)
