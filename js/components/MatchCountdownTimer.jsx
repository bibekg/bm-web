// @flow

import * as React from 'react'
import Countdown from 'react-countdown-now'
import styled from 'styled-components'
import { Header, Subtitle } from 'components/typography'
import { COUNTDOWN_MESSAGE } from 'static-data/copy'

const CountdownDiv = styled.div`
  text-align: center;
`

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds }): React.Element<*> => (
  <Subtitle>
    {days}d {hours}h {minutes}m {seconds}s
  </Subtitle>
)

type PropsType = {
  onComplete?: () => void,
  countDownTime: Date
}

type StateType = {
  countdownDone: boolean
}

export default class CountdownTimer extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      countdownDone: new Date() >= props.countDownTime
    }
  }

  render(): React.Element<*> {
    return (
      <CountdownDiv>
        <Header>Time Until Next Match</Header>
        <Countdown
          date={this.props.countDownTime}
          renderer={renderer}
          onComplete={() => this.setState({ countdownDone: true })}
        />

        {this.state.countdownDone && <Subtitle>{COUNTDOWN_MESSAGE}</Subtitle>}
      </CountdownDiv>
    )
  }
}
