// @flow

import * as React from 'react'
import styled from 'styled-components'
import Countdown from 'react-countdown-now'
import { colors } from 'styles'
import { Text } from 'components/typography'
import hourglass from './hourglass.svg'

const TimerDiv = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: ${colors.blue};
  padding: 5px !important;
  border-top-left-radius: 10px;
  width: 10rem;
`

const renderer = ({ days, hours, minutes, seconds }): React.Element<*> => (
  <TimerDiv>
    <Text color={colors.white}>
      &nbsp;
      <img src={hourglass} alt="hourglass" height={12} />
      &nbsp;
      {days}d {hours}h {minutes}m {seconds}s
    </Text>
  </TimerDiv>
)

type PropsType = {
  countDownTime: Date
}

export default function MatchmakingTimer(props: PropsType): React.Element<*> {
  return <Countdown date={props.countDownTime || new Date()} renderer={renderer} />
}
