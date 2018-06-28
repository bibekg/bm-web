// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Header, Subtitle, Title, Text } from 'components/typography'
import Break from 'components/Break'
import AutoMatchmakingButton from './AutoMatchmakingButton'
import ResetMatchesButton from './ResetMatchesButton'

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10vh;
  text-align: center;
  margin-bottom: 50px;
`

export default function AdminMatchmakingView(): React.Element<*> {
  return (
    <ViewWrapper>
      <Header>Matchmaking</Header>
      <Subtitle>
        This is where we make{' '}
        <span role="img" aria-label="blue heart">
          💙
        </span>{' '}
        happen.
      </Subtitle>

      <Title align="left">Run matchmaking</Title>
      <Text paragraph>
        Clicking this button will run our matchmaking script and match users in our database. If you are not authorized
        to be clicking this button, please do not use it. Note that the matchmaking algorithm will reset matches before
        making matches, so pressing the Reset matches button as well is not necessary.
      </Text>
      <AutoMatchmakingButton />

      <Break />

      <Title align="left">Reset matches</Title>
      <Text paragraph>
        Clicking this button will reset matches that are eligible for reset. This includes users who are active,
        verified, have a profile, and do not have a date scheduled for some time in the future.
      </Text>
      <ResetMatchesButton />
    </ViewWrapper>
  )
}
