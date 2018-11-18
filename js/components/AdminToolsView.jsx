// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import PageContainer from 'components/PageContainer'
import { Header, Subtitle, Title, Text } from 'components/typography'
import { CreateMatch, EditMatch, DeleteUser, makeToolPage } from 'components/AdminTools'
import Break from 'components/Break'
import { colors } from 'styles'
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

const LinkRow = styled.div`
  display: flex;
  > * {
    margin-right: 10px;
  }
`

const StyledNavLink = styled(NavLink)`
  padding: 10px;
  text-decoration: none;
  border-radius: 3px;
  border: 2px solid ${colors.blue};
  ${Text} {
    color: black;
  }

  &.active {
    background-color: ${colors.blue};
    ${Text} {
      color: ${colors.white};
    }
  }
`

const ToolWrapper = styled.div`
  width: 100%;
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

  makeToolPageRenderer(Tool, { title, subtitle }) {
    return () => {
      const ToolPage = makeToolPage(Tool)
      return <ToolPage title={title} subtitle={subtitle} />
    }
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

        <Break />

        <Content>
          <Text bold align="left">
            Select a tool to get started...
          </Text>

          <LinkRow>
            <StyledNavLink to="/admin/tools/create-match">
              <Text bold>Create Match</Text>
            </StyledNavLink>
            <StyledNavLink to="/admin/tools/edit-match">
              <Text bold>Edit Match</Text>
            </StyledNavLink>
            <StyledNavLink to="/admin/tools/delete-user">
              <Text bold>Delete User</Text>
            </StyledNavLink>
          </LinkRow>

          <ToolWrapper>
            <Route
              exact
              path="/admin/tools/create-match"
              render={this.makeToolPageRenderer(CreateMatch, {
                title: 'Create Match',
                subtitle: 'Match two users with each other.'
              })}
            />
            <Route
              exact
              path="/admin/tools/edit-match"
              render={this.makeToolPageRenderer(EditMatch, {
                title: 'Edit Match',
                subtitle: 'Edit a match between two users, or delete the match altogether.'
              })}
            />
            <Route
              exact
              path="/admin/tools/delete-user"
              render={this.makeToolPageRenderer(DeleteUser, {
                title: 'Delete Match',
                subtitle: "Completely delete a user, along with all of the user's matches from the system."
              })}
            />
          </ToolWrapper>
        </Content>
      </ViewWrapper>
    )
  }
}

export default connect(null, actions)(AdminToolsView)
