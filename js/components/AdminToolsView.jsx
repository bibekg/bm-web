// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PageContainer from 'components/PageContainer'
import { Header, Subtitle, Title, Text } from 'components/typography'
import Break from 'components/Break'
import { EditMatch, DeleteUser, CreateNewMatch, DeleteMatch } from 'components/AdminTools'
import * as actions from 'actions'

const ViewWrapper = PageContainer({ noBackground: true, maxWidth: { large: '800px' } }).extend`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Top = styled.div`
  width: 100%;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
        <Top>
          <Header align="left">Admin Tools</Header>
          <Subtitle align="left">
            {
              "\"Technology is nothing. What's important is that you have a faith in people, that they're basically good and smart, and if you give them tools, they'll do wonderful things with them.\""
            }
          </Subtitle>
          <Subtitle align="left">-- Steve Jobs</Subtitle>
        </Top>

        <Content>
          <Break />

          <Title align="left">Match Custom Users</Title>
          <Text paragraph>{'Match two users with each other.'}</Text>
          <CreateNewMatch />

          <Break />

          <Title align="left">Edit a match</Title>
          <Text paragraph>{'Edit a match between two users, or delete the match altogether.'}</Text>
          <EditMatch />

          <Break />

          <Title align="left">Hard Delete a User</Title>
          <Text paragraph>{"Completely delete a user, along with all of the user's matches from the system."}</Text>
          <DeleteUser />
        </Content>
      </ViewWrapper>
    )
  }
}

export default connect(null, actions)(AdminToolsView)
