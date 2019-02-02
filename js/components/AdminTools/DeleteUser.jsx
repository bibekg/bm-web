// @flow
/* eslint-disable no-underscore-dangle */

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import swal from 'sweetalert'
import SafeButton from 'components/SafeButton'
import * as actions from 'actions'
import Dropdown, { DropdownItem } from 'components/Dropdown'
import { formatName } from 'utilities/user-formatters'

const Wrapper = styled.div`
  & > * {
    margin: 10px 0;
  }
`

const DropdownWrapper = styled.div`
  max-width: 500px;
`

type PropsType = {
  users: Array<UserType>,
  // eslint-disable-next-line flowtype/no-weak-types
  getAllUsers: (?Object, ?Array<string>, ?ReduxCallbackType<*>) => void,
  hardDeleteUser: string => Promise<*>
}

type StateType = {
  selectedUserOption: ?DropdownItem<string>
}

class DeleteUser extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    props.getAllUsers(null, ['_id', 'name'])
    this.state = {
      selectedUserOption: null
    }
  }

  onButtonClick = (event: *, done: boolean => void) => {
    const { selectedUserOption } = this.state
    if (selectedUserOption) {
      swal({
        title: 'Hard Delete User',
        text: `Are you sure you want to delete ${selectedUserOption.toString()}?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.props.hardDeleteUser(selectedUserOption.id).then(() => done(true))
        } else {
          done(false)
        }
      })
    } else {
      done(false)
    }
  }

  handleDropdownChange = (name: string, opt: DropdownItem<string>) => {
    this.setState({ selectedUserOption: opt })
  }

  render(): React.Element<*> {
    return (
      <Wrapper>
        <DropdownWrapper>
          <Dropdown
            name="delete-user"
            items={this.props.users.map(u => new DropdownItem(u._id, `${formatName(u.name)} (${u._id})`))}
            selectedItem={this.state.selectedUserOption}
            placeholder="Joe Bruin"
            onChange={this.handleDropdownChange}
          />
        </DropdownWrapper>
        <SafeButton
          buttonProps={{ warning: true, disabled: this.state.selectedUserOption == null }}
          workingText="Deleting user..."
          onClick={this.onButtonClick}
        >
          Delete User
        </SafeButton>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  users: state.admin.users
})

export default connect(mapStateToProps, actions)(DeleteUser)
