// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as Form from 'components/form'
import Dropdown, { DropdownItem } from 'components/Dropdown'
import * as actions from 'actions'
import { Text } from 'components/typography'
import Button from 'components/Button'
import { formatName } from 'utilities/user-formatters'

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
  users: Array<UserType>,
  // eslint-disable-next-line flowtype/no-weak-types
  getAllUsers: (?Object, ?Array<string>, ?ReduxCallbackType<*>) => void,
  createNewMatch: (Array<string>, Array<string>, ReduxCallbackType<*>) => void
}

type StateType = {
  userA: ?DropdownItem<string>,
  userB: ?DropdownItem<string>,
  message: ?string,
  variants: Array<string>
}

const VARIANT_OPTIONS = []

const toggleArrayValue = <T>(arr: Array<T>, value: T): Array<T> => {
  if (arr.indexOf(value) === -1) {
    return [...arr, value]
  } else {
    return arr.filter(item => item !== value)
  }
}

class CreateNewMatch extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    if (props.users.length === 0) {
      props.getAllUsers(null, ['_id', 'name'])
    }
    this.state = {
      userA: null,
      userB: null,
      variants: [],
      message: null
    }
  }

  handleDropdownChange = (name: string, newValue: DropdownItem<string>) => {
    if (name === 'userA' || name === 'userB') {
      this.setState({ [name]: newValue })
    }
  }

  handleChange = (event: SyntheticInputEvent<*>) => {
    const { name, value } = event.target
    if (name === 'variants') {
      this.setState({
        variants: toggleArrayValue(this.state.variants, value)
      })
    }
  }

  validForSubmission(): boolean {
    return this.state.userA != null && this.state.userB != null && this.state.userA.id !== this.state.userB.id
  }

  submit = () => {
    const { userA, userB, variants } = this.state
    if (userA && userB) {
      this.props.createNewMatch([userA.id, userB.id], variants, err => {
        if (err) {
          this.setState({ message: err.message })
        } else {
          this.setState({ message: 'Users matched!' })
        }
      })
    }
  }

  render(): React.Element<*> {
    // eslint-disable-next-line no-underscore-dangle
    const userOptions = this.props.users.map(u => new DropdownItem(u._id, `${formatName(u.name)} (${u._id})`))

    return (
      <ComponentWrapper>
        <MatchWrapper>
          <div>
            <Text bold center>
              Create a match between
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
              items={userOptions}
              selectedItem={this.state.userB}
              placeholder="Josie Bruin"
              onChange={this.handleDropdownChange}
            />
          </div>
        </MatchWrapper>

        {VARIANT_OPTIONS &&
          VARIANT_OPTIONS.length > 0 && (
            <div>
              <Text bold center>
                with the following variants
              </Text>
              <Form.CheckboxGroup
                name="variants"
                options={VARIANT_OPTIONS}
                selectedOptions={this.state.variants}
                onChange={this.handleChange}
              />
            </div>
          )}

        <Button disabled={!this.validForSubmission()} primary onClick={this.submit}>
          Create Match
        </Button>

        {this.state.message && <Text>{this.state.message}</Text>}
      </ComponentWrapper>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  users: state.admin.users
})

export default connect(mapStateToProps, actions)(CreateNewMatch)
