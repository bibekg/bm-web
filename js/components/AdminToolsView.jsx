// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Header, Subtitle, Title, Text } from 'components/typography'
import Break from 'components/Break'
import { DeleteUser, CreateNewMatch, DeleteMatchTool } from 'components/AdminTools'
import * as actions from 'actions'

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10vh;
  text-align: center;
  margin-bottom: 50px;
`

type PropsType = {
  getAllMatches: () => void,
  getAllUsers: () => void
}

class AdminToolsView extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props)

    props.getAllUsers()
    props.getAllMatches()
  }

  render(): React.Element<*> {
    return (
      <ViewWrapper>
        <Header>Admin Tools</Header>
        <Subtitle>
          {
            "\"Technology is nothing. What's important is that you have a faith in people, that they're basically good and smart, and if you give them tools, they'll do wonderful things with them.\""
          }
        </Subtitle>
        <Subtitle>-- Steve Jobs</Subtitle>

        <Break />

        <Title align="left">Match Custom Users</Title>
        <Text paragraph>{'Match two users with each other.'}</Text>
        <CreateNewMatch />

        <Break />

        <Title align="left">Delete a match</Title>
        <Text paragraph>{'Delete a match between two users.'}</Text>
        <DeleteMatchTool />

        <Break />

        <Title align="left">Hard Delete a User</Title>
        <Text paragraph>{"Completely delete a user, along with all of the user's matches from the system."}</Text>
        <DeleteUser />
      </ViewWrapper>
    )
  }
}

export default connect(null, actions)(AdminToolsView)
