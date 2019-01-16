// @flow
/* eslint-disable no-underscore-dangle */

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import swal from 'sweetalert'
import Dropdown, { DropdownItem } from 'components/Dropdown'
import { Text } from 'components/typography'
import * as Form from 'components/form'
import SafeButton from 'components/SafeButton'
import { RELATIONSHIP_TYPE } from 'constants/user-props'
import { formatName } from 'utilities/user-formatters'
import { colors } from 'styles'
import * as actions from 'actions'
import { getMatchedUsersForUser, getMatchForUsers } from './util'
import Toggle from '../Toggle'

const ComponentWrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 1;
`

const MatchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
  & > * {
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

const MatchConfigWrapper = styled.div`
  margin-bottom: 10px;
  padding: 5px 0;
  margin-top: 5px;
  border-top: 1px solid ${colors.blue};
  width: 100%;
`

const ParticipantConfigWrapper = styled.div`
  margin-bottom: 10px;
  padding: 5px 0;
  margin-top: 5px;
  border-top: 1px solid ${colors.blue};
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: ${props => props.justify || 'flex-start'};
  & > *:not(:last-child) {
    margin-right: 5px;
  }
`

type PropsType = {
  matches: Array<MatchEdgeType>, // may be empty until completes loading from api
  users: { [string]: UserType },
  editMatch: object => Promise<*>, // accepts a match id
  deleteMatch: string => Promise<*> // accepts a match
}

type StateType = {
  userA: ?string,
  userB: ?string,
  matchConfig: ?MatchEdgeType,
  participantUnderEdit: ?string
}

const MATCH_STATES = ['active', 'ended']
const RENDEVOUS_STATES = ['unscheduled', 'unschedulable', 'scheduled', 'schedule-next-cycle']

class EditMatchTool extends React.Component<PropsType, StateType> {
  state = {
    userA: null,
    userB: null,
    matchConfig: null,
    participantUnderEdit: null
  }

  editMatchConfig(newConfig: *) {
    this.setState({
      matchConfig: {
        ...this.state.matchConfig,
        ...newConfig
      }
    })
  }

  handleDropdownChange = (name: string, newValue: DropdownItem<string>) => {
    if (name.split('.')[0] === 'match') {
      this.handleMatchConfigItemChange(name, newValue.id)
    }

    if (name === 'userA' || name === 'userB') {
      const nextState = {}
      nextState[name] = newValue.id
      if (name === 'userB' && this.state.userA) {
        const matchConfig = getMatchForUsers(this.state.userA, newValue.id, this.props.matches)
        if (matchConfig) {
          nextState.matchConfig = matchConfig
        } else {
          throw new Error('matchConfig missing')
        }
      }
      this.setState(nextState)
    }
  }

  handleFormItemChange = (event: SyntheticInputEvent<*>) => {
    const { name, value } = event.target
    if (name === 'participants') {
      this.setState({
        participantUnderEdit: value
      })
    } else if (name.split('.')[0] === 'match') {
      this.handleMatchConfigItemChange(name, value)
    }
  }

  handleMatchConfigItemChange = (name: string, value: *) => {
    const keySplit = name.split('.')
    const { matchConfig } = this.state

    const getRealValue = (key: string, value2: *): * => {
      const overrides = {
        // Either append/remove the provied val
        matchBasis: v =>
          matchConfig &&
          (matchConfig.matchBasis.includes(v)
            ? matchConfig.matchBasis.filter(x => x !== v)
            : [...matchConfig.matchBasis, v]),
        'participants.score': v => Number(v)
      }
      return key in overrides ? overrides[key](value2) : value2
    }

    let configKey = keySplit[1]
    let configValue = getRealValue(configKey, value)

    // Check if we're editing a field within match.participants
    // Doing so requires some extra logic, which will replace
    const participantCheck = keySplit[1].match(/participants\[(.*)\]/)
    if (participantCheck) {
      const participantId = participantCheck[1]
      const participant = matchConfig && matchConfig.participants.find(p => p.user === participantId)
      const otherParticipant = matchConfig && matchConfig.participants.find(p => p.user !== participantId)
      if (!participant || !otherParticipant) {
        return
      }
      const participantKey = keySplit[2]
      participant[participantKey] = getRealValue(`participants.${participantKey}`, value)

      configKey = 'participants'
      configValue = [participant, otherParticipant]
    }

    this.editMatchConfig({
      [configKey]: configValue
    })
  }

  validForSubmission = () => this.state.userA != null && this.state.userB != null

  handleSubmitEdit = (event: SyntheticInputEvent<*>, callback: boolean => void) => {
    this.props
      .editMatch(this.state.matchConfig)
      .then(() => {
        callback(true)
      })
      .catch(err => {
        callback(false)
        // eslint-disable-next-line
        console.error(err)
      })
  }

  handleSubmitClick = (submitType: string, handler: string => Promise<*>, event: *, done: boolean => void) => {
    const { userA, userB, matchConfig } = this.state
    if (userA && userB) {
      if (matchConfig) {
        swal({
          title: `${submitType.charAt(0).toUpperCase()}${submitType.slice(1)} Match`,
          text: `Are you sure you want to ${submitType} the match between ${userA} and ${userB}?`,
          icon: 'warning',
          buttons: true,
          dangerMode: true
        }).then(didConfirm => {
          if (didConfirm) {
            handler(matchConfig._id).then(() => {
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

  makeDropdownUserItem = (user: UserType) => new DropdownItem(user._id, `${formatName(user.name)} (${user._id})`)

  render(): React.Element<*> {
    const { users, matches } = this.props
    const { userA, userB, matchConfig, participantUnderEdit } = this.state
    const userOptions = Object.keys(users).map(u => this.makeDropdownUserItem(users[u]))
    const matchedOptions = (userA ? getMatchedUsersForUser(userA, users, matches) : []).map(uId =>
      this.makeDropdownUserItem(users[uId])
    )

    const participants = userA &&
      userB &&
      matchConfig && {
        [userA]: matchConfig.participants.find(p => p.user === userA) || {},
        [userB]: matchConfig.participants.find(p => p.user === userB) || {}
      }

    return (
      <ComponentWrapper>
        <MatchWrapper>
          <div>
            <Text bold>Edit the match between</Text>
            <Dropdown
              name="userA"
              items={userOptions}
              selectedItem={userA ? this.makeDropdownUserItem(users[userA]) : null}
              placeholder="Joe Bruin"
              onChange={this.handleDropdownChange}
            />
          </div>
          <div>
            <Text bold>and</Text>
            <Dropdown
              name="userB"
              items={matchedOptions}
              selectedItem={userB ? this.makeDropdownUserItem(users[userB]) : null}
              placeholder="Josie Bruin"
              onChange={this.handleDropdownChange}
            />
          </div>
        </MatchWrapper>

        {/* If a particular match has been identified, show the details of that match in form fields to be editted */
        userA &&
          userB &&
          matchConfig && (
            <MatchConfigWrapper>
              <Row justify="flex-start">
                <div>
                  <Text bold>Rendezvous State</Text>
                  <Dropdown
                    name="match.rendezvousState"
                    items={RENDEVOUS_STATES.map(s => new DropdownItem(s))}
                    selectedItem={new DropdownItem(matchConfig.rendezvousState)}
                    onChange={this.handleDropdownChange}
                  />
                </div>
                <div>
                  <Text bold>Match State</Text>
                  <Dropdown
                    name="match.state"
                    items={MATCH_STATES.map(s => new DropdownItem(s))}
                    selectedItem={new DropdownItem(matchConfig.state)}
                    onChange={this.handleDropdownChange}
                  />
                </div>
              </Row>

              <Text bold>Match Basis</Text>
              <Form.CheckboxGroup
                name="match.matchBasis"
                options={RELATIONSHIP_TYPE.map(t => new DropdownItem(t))}
                selectedOptions={[...matchConfig.matchBasis]}
                onChange={this.handleFormItemChange}
              />

              {// Show a Dropdown by which you can select the match participant to edit
              userA &&
                userB &&
                matchConfig &&
                participants && (
                  <div>
                    <Text>Select the participant to edit</Text>
                    <Form.RadioGroup
                      name="participants"
                      options={[userA, userB].map(u => this.makeDropdownUserItem(users[u]))}
                      selected={participantUnderEdit || ''}
                      onChange={this.handleFormItemChange}
                    />
                  </div>
                )}

              {// Show the fields within a match participant that can be editted
              participantUnderEdit &&
                participants && (
                  <ParticipantConfigWrapper>
                    <Text bold>Did {users[participantUnderEdit].name.first} like their match?</Text>
                    <Dropdown
                      name={`match.participants[${participantUnderEdit}].likeState`}
                      items={['pending', 'liked', 'disliked'].map(v => new DropdownItem(v))}
                      selectedItem={new DropdownItem(participants[participantUnderEdit].likeState)}
                      onChange={this.handleDropdownChange}
                    />

                    <Text bold>
                      Did {users[participantUnderEdit].name.first} update their availability since getting the match?
                    </Text>
                    <Toggle
                      name={`match.participants[${participantUnderEdit}].updatedAvailability`}
                      enabled={participants[participantUnderEdit].updatedAvailability}
                      onClick={this.handleFormItemChange}
                    />

                    <Text bold>Did {users[participantUnderEdit].name.first} see the dislike feedback modal yet?</Text>
                    <Toggle
                      name={`match.participants[${participantUnderEdit}].sawDislikeFeedbackModal`}
                      enabled={participants[participantUnderEdit].sawDislikeFeedbackModal}
                      onClick={this.handleFormItemChange}
                    />

                    <Text bold>
                      How desirable is {users[participantUnderEdit].name.first} to the other participant?
                    </Text>
                    <Form.TextInput
                      type="number"
                      name={`match.participants[${participantUnderEdit}].score`}
                      value={participants[participantUnderEdit].score}
                      onChange={this.handleFormItemChange}
                    />
                  </ParticipantConfigWrapper>
                )}
            </MatchConfigWrapper>
          )}

        <Row>
          <SafeButton
            buttonProps={{ disabled: !this.validForSubmission(), primary: true }}
            workingText="Editting match..."
            onClick={this.handleSubmitEdit}
          >
            Edit Match
          </SafeButton>
          <SafeButton
            buttonProps={{ disabled: !this.validForSubmission(), warning: true }}
            workingText="Deleting match..."
            onClick={this.handleSubmitDelete}
          >
            Delete Match
          </SafeButton>
        </Row>
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

export default connect(mapStateToProps, {
  editMatch: actions.editMatch,
  deleteMatch: actions.deleteMatch
})(EditMatchTool)
