// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'
import { Text } from 'components/typography'
import CountdownTimeRenderer from 'components/CountdownTimeRenderer'
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

export default function MatchedCountdownTimer(): React.Element<*> {
  return (
    <CountdownTimeRenderer
      render={(timeLeftString: string) => (
        <TimerDiv>
          <Text color={colors.white}>
            &nbsp;
            <img src={hourglass} alt="hourglass" height={12} />
            &nbsp;
            {timeLeftString}
          </Text>
        </TimerDiv>
      )}
    />
  )
}
