// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Title, Subtitle } from 'components/typography'
import CountdownTimeRenderer from 'components/CountdownTimeRenderer'

const CountdownDiv = styled.div`
  text-align: center;
`

const UNMATCHED_MESSAGE =
  "Matches are generated every few days. You'll always get an email when you get a match so make sure to check your email 😊❤️."

export default function UnmatchedCountdownTimer(): React.Element<*> {
  return (
    <CountdownDiv>
      <Title>Time Until Next Match</Title>
      <CountdownTimeRenderer
        render={(timeLeftString: string) => <Subtitle>{timeLeftString}</Subtitle>}
        renderCountdownDone={() => <Subtitle>{UNMATCHED_MESSAGE}</Subtitle>}
      />
    </CountdownDiv>
  )
}
