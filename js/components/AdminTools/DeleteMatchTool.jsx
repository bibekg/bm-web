// @flow
/* eslint-disable no-underscore-dangle */

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import swal from 'sweetalert'
import Dropdown, { DropdownItem } from 'components/Dropdown'
import { Text } from 'components/typography'
import { formatName } from 'utilities/user-formatters'
import SafeButton from 'components/SafeButton'
import * as actions from 'actions'

const ComponentWrapper = styled.div`
  margin: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
`

const MatchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  & > * {
    margin: 5px;
    max-width: 500px;
    width: 100%;
    flex-grow: 1;
    position: relative;
    &:nth-child(1) {
      z-index: 2;
    }
    &:nth-child(2) {
      z-index: 1;
    }
  }
  position: relative;
  z-index: 1;
`

type PropsType = {
  matches: Array<MatchEdgeType>, // may be empty until completes loading from api
  users: { [string]: UserType },
  deleteMatch: string => Promise<*> // accepts a match id
}

type StateType = {
  userA: ?DropdownItem<string>,
  userB: ?DropdownItem<string>
}

class DeleteMatchTool extends React.Component<PropsType, StateType> {
  state = {
    userA: null,
    userB: null
  }

  handleDropdownChange = (name: string, newValue: DropdownItem<string>) => {
    if (name === 'userA' || name === 'userB') {
      this.setState({ [name]: newValue })
    }
  }

  validForSubmission = () => this.state.userA != null && this.state.userB != null

  handleSubmitClick = (event: *, done: boolean => void) => {
    const { userA, userB } = this.state
    if (userA && userB) {
      // Find the match corresponding to the currently selected users
      const matchToDelete = this.props.matches.find(
        match =>
          userA &&
          match.participants.find(p => p.user === userA.id) != null &&
          userB &&
          match.participants.find(p => p.user === userB.id) !== null
      )
      if (matchToDelete) {
        swal({
          title: 'Delete Match',
          text: `Are you sure you want to delete the match between ${userA.toString()} and ${userB.toString()}?`,
          icon: 'warning',
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            this.props.deleteMatch(matchToDelete._id).then(() => {
              done(true)
              this.setState({
                userA: null,
                userB: null
              })
            })
          } else {
            done(false)
          }
        })
      } else {
        swal('Uh oh!', 'No match found for specified users', 'error')
      }
    }
  }

  generateDropdownItem = user => new DropdownItem(user._id, `${formatName(user.name)} (${user._id})`)

  render(): React.Element<*> {
    const userOptions = Object.keys(this.props.users).map(u => this.generateDropdownItem(this.props.users[u]))
    const matchedOptions = this.state.userA
      ? this.props.matches.reduce((acc: Array<*>, match): Array<*> => {
          // Filter matches for ones in which userA is present
          if (match.participants.find(p => this.state.userA && p.user === this.state.userA.id)) {
            // But accumulate a list of the OTHER user (not userA) in said matches
            const matchedParticipant = match.participants.find(p => this.state.userA && p.user !== this.state.userA.id)
            if (matchedParticipant) {
              // Look up the user via the id we just retrieved

              // Server will not populate participants.user so all we can expect there is an ObjectId string
              // This is to avoid sending all the users twice, once as just users and once under matches.participants.user
              // flow-disable-next-line
              const matchedUser = this.props.users[matchedParticipant.user]
              if (matchedUser) {
                acc.push(this.generateDropdownItem(matchedUser))
              } else if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line
                console.log(`Match participant ${matchedParticipant.user} could not be found in users`)
              }
            }
            return acc
          }
          return acc
        }, [])
      : []

    return (
      <ComponentWrapper>
        <MatchWrapper>
          <div>
            <Text bold center>
              Delete the match between
            </Text>
            <Dropdown
              name="userA"
              items={userOptions}
              selectedItem={this.state.userA}
              placeholder="Joe Bruin"
              onChange={this.handleDropdownChange}
            />
          </div>
          <div>
            <Text bold center>
              and
            </Text>
            <Dropdown
              name="userB"
              items={matchedOptions}
              selectedItem={this.state.userB}
              placeholder="Josie Bruin"
              onChange={this.handleDropdownChange}
            />
          </div>
        </MatchWrapper>

        <SafeButton
          buttonProps={{ disabled: !this.validForSubmission(), primary: true }}
          workingText="Deleting match..."
          onClick={this.handleSubmitClick}
        >
          Delete Match
        </SafeButton>
      </ComponentWrapper>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  matches: state.admin.matches,
  // Create a mapping of userId => user object
  users: state.admin.users.reduce((acc, u): { [string]: UserType } => {
    acc[u._id] = u
    return acc
  }, {})
})

export default connect(mapStateToProps, actions)(DeleteMatchTool)
