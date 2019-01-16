// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Header, Title, Subtitle, Text } from 'components/typography'
import Button from 'components/Button'
import * as Form from 'components/form'
import Dropdown, { DropdownItem } from 'components/Dropdown'
import Break from 'components/Break'
import Toggle from 'components/Toggle'
import type { OptionType } from 'components/Dropdown'
import * as Icons from 'components/icons'
import Modal from 'components/Modal'

const PageWrapper = styled.div`
  padding: 20px 5%;
  padding-bottom: 100px;
`

/**
 * Component used to demo all our reusable components
 */

type PropsType = {}

type StateType = {
  dropdownItems: Array<OptionType>,
  selectedDropdownItem: ?OptionType,
  showModal: boolean,
  toggleEnabled: boolean,
  checked: boolean
}

export default class AdminComponentsView extends React.Component<PropsType, StateType> {
  handleCheckboxChange: (SyntheticInputEvent<*>) => void
  handleToggleChange: (SyntheticInputEvent<*>) => void
  constructor(props: PropsType) {
    super(props)
    this.state = {
      dropdownItems: [
        new DropdownItem('a', 'Jarvis'),
        new DropdownItem('b', 'Jane'),
        new DropdownItem('c', 'Joe'),
        new DropdownItem('d', 'Jack'),
        new DropdownItem('e', 'Jon'),
        new DropdownItem('f', 'JP'),
        new DropdownItem('g', 'Jim'),
        new DropdownItem('h', 'Jessie'),
        new DropdownItem('i', 'Jackie'),
        new DropdownItem('j', 'Jared'),
        new DropdownItem('k', 'Jamal')
      ],
      selectedDropdownItem: null,
      showModal: false,
      toggleEnabled: true,
      checked: true
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleToggleChange = this.handleToggleChange.bind(this)
  }

  handleDropdownChange = (name: string, newItem: OptionType) => {
    this.setState({
      selectedDropdownItem: newItem
    })
  }

  handleToggleChange() {
    this.setState({
      toggleEnabled: !this.state.toggleEnabled
    })
  }

  handleCheckboxChange() {
    this.setState({
      checked: !this.state.checked
    })
  }

  render(): React.Element<*> {
    return (
      <PageWrapper>
        <Header>Header</Header>
        <Title>Title</Title>
        <Subtitle>Subtitle</Subtitle>
        <Text>
          {
            "This is regular text. Here's some lorem ipsum for full effect. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit cursus nisi, vel egestas turpis ullamcorper at. Pellentesque velit felis, porttitor et commodo non, pulvinar quis tellus. Phasellus at neque vitae odio eleifend laoreet. Etiam tincidunt consequat mauris, in pharetra tortor volutpat sit amet."
          }
        </Text>
        <Text bold>This is bold text.</Text>
        <Text paragraph>
          {
            "This is paragraph text. That means the line height is a bit higher than above. Here's some lorem ipsum for full effect. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit cursus nisi, vel egestas turpis ullamcorper at. Pellentesque velit felis, porttitor et commodo non, pulvinar quis tellus. Phasellus at neque vitae odio eleifend laoreet. Etiam tincidunt consequat mauris, in pharetra tortor volutpat sit amet."
          }
        </Text>

        <Break verticalSpacing="50px" />

        <Button>Default Button</Button>
        <Button primary>Primary Button</Button>
        <Button warning>Warning Button</Button>
        <Button disabled>Disabled Button</Button>

        <Break verticalSpacing="50px" />

        <Form.CheckboxInput
          name="Checkbox"
          checked={this.state.checked}
          value={{ id: '', text: 'Checkbox' }}
          onChange={this.handleCheckboxChange}
        />
        <Break verticalSpacing="10px" invisible />
        <Toggle enabled={this.state.toggleEnabled} onClick={this.handleToggleChange} />

        <Break verticalSpacing="50px" />

        <div>
          <Dropdown
            name="dropdownJNames"
            items={this.state.dropdownItems}
            selectedItem={this.state.selectedDropdownItem}
            placeholder="Dropdown of J-names"
            onChange={this.handleDropdownChange}
          />
        </div>

        <Break verticalSpacing="50px" />

        <div>
          <Title align="left">These are some icons</Title>
          <Icons.EmailIcon />
          <Icons.InstagramIcon />
          <Icons.SmartphoneIcon />
          <Icons.SnapchatIcon />
          <Icons.ExpandMoreIcon />
        </div>

        <Break verticalSpacing="50px" />
        <Button
          onClick={() =>
            this.setState({
              showModal: true
            })
          }
        >
          Open Modal
        </Button>
        {this.state.showModal && (
          <Modal
            onOutClick={() =>
              this.setState({
                showModal: false
              })
            }
          >
            This is a modal
          </Modal>
        )}
      </PageWrapper>
    )
  }
}
