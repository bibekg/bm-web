// @flow

import * as React from 'react'
import styled from 'styled-components'
import Downshift from 'downshift'
import { Text } from 'components/typography'
import { TextInput } from 'components/form'
import { colors, mixins } from 'styles'
import ExpandMoreIcon from 'components/icons/ExpandMoreIcon'

const DropdownWrapper = styled.div`
  & > * {
    width: 100%;
  }
  font-size: 18px;
  position: relative;
  z-index: 1;
`

const DropdownInput = TextInput.extend`
  cursor: pointer;
  border: 2px solid ${props => (props.isOpen ? colors.blue : colors.lightGrey)};
  border-radius: 5px 5px ${props => (props.isOpen ? '0px 0px' : '5px 5px')};
  transition: 0.2s ease border;
  padding: 10px;
`

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  max-height: 150px;
  overflow: auto;
  z-index: 2;
  border: 2px solid ${colors.blue};
  border-top: none;
  border-radius: 0 0 5px 5px;
  background-color: ${colors.white};
  & > * {
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGrey};
    }
  }
  transform: scaleY(${props => (props.isOpen ? 1 : 0)});
  transition: 0.2s ease transform;
  transform-origin: top;

  ${mixins.scrollbarMixin(colors.lightGrey)};
`

const DropdownItemDiv = styled.div`
  background-color: ${props => (props.highlighted ? colors.paleBlue : colors.white)};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  padding: 8px;
  cursor: ${props => (props.noPointer ? 'default' : 'pointer')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`

const ExpandIconDiv = styled.div`
  width: fit-content;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-45%) translateX(-5px);
  opacity: ${props => (props.isOpen ? 0 : 1)};
  transition: 0.2s ease opacity;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.9);
`

/**
 * The object that is used to represent each item that gets passed into this Dropdown.
 * Constructed using an id (of any type, used for referencing), and a text string (rendered in the dropdown)
 */
export class DropdownItem<T> {
  id: T
  text: string

  constructor(id: T, text?: string) {
    this.id = id
    if (text === undefined) {
      if (typeof id === 'string') {
        this.text = id
      } else {
        throw new Error('DropdownItem received no text and could not cast provided id to string')
      }
    } else {
      this.text = text
    }
  }

  toString(): string {
    return this.text
  }
}

type PropsType = {
  name: string,
  items: Array<DropdownItem<*>>,
  selectedItem: ?DropdownItem<*>,
  placeholder: string,
  onChange: (string, DropdownItem<*>) => void
}

type StateType = {
  startingSearch: boolean,
  prevSelectedItem: ?DropdownItem<*>
}

export default class Dropdown extends React.Component<PropsType, StateType> {
  downshiftComponent: ?typeof Downshift

  state = {
    startingSearch: false,
    prevSelectedItem: null
  }

  static defaultProps = {
    placeholder: ''
  }

  openMenu = () => {
    if (this.downshiftComponent) {
      this.downshiftComponent.openMenu()
    }

    this.setState({
      startingSearch: true
    })

    if (this.downshiftComponent) {
      this.downshiftComponent.setState({ inputValue: '' })
    }
  }

  closeMenu = () => {
    if (this.downshiftComponent) {
      this.downshiftComponent.closeMenu()
    }

    this.setState({ startingSearch: false })
    if (this.downshiftComponent && this.downshiftComponent.state.inputValue === '') {
      this.downshiftComponent.selectItem(this.state.prevSelectedItem)
    }
  }

  clearSelection = () => {
    if (this.downshiftComponent) {
      this.downshiftComponent.clearSelection()
    }
  }

  handleInputValueChange = () => {
    this.setState({ startingSearch: false })
  }

  handleValueChange = (newItem: DropdownItem<*>) => {
    this.closeMenu()
    this.props.onChange(this.props.name, newItem)
    this.setState({
      prevSelectedItem: newItem
    })
  }

  // eslint-disable-next-line
  renderDownshift = (options: Object): React.Element<*> => {
    const { isOpen, getInputProps, getItemProps, inputValue, selectedItem, highlightedIndex, getRootProps } = options

    const itemsToRender = this.state.startingSearch
      ? this.props.items
      : this.props.items.filter(
          i =>
            !inputValue ||
            i
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())
        )

    return (
      <DropdownWrapper {...getRootProps({ refKey: 'innerRef' })}>
        <DropdownInput
          {...getInputProps({
            placeholder: this.props.placeholder,
            onClick: this.openMenu,
            name: this.props.name,
            isOpen // needed for variable-based styling of styled component
          })}
        />
        <ExpandIconDiv isOpen={isOpen} onClick={this.openMenu}>
          <ExpandMoreIcon fill={colors.grey} />
        </ExpandIconDiv>
        <StyledDropdown isOpen={isOpen}>
          {itemsToRender.length === 0 ? (
            <DropdownItemDiv noPointer>
              <Text>No results found.</Text>
            </DropdownItemDiv>
          ) : (
            itemsToRender.map((item, index) => (
              <DropdownItemDiv
                {...getItemProps({ item })}
                key={item.id}
                highlighted={highlightedIndex === index}
                selected={selectedItem && selectedItem.id === item.id}
              >
                <Text bold>{item.toString()}</Text>
              </DropdownItemDiv>
            ))
          )}
        </StyledDropdown>
      </DropdownWrapper>
    )
  }

  render(): React.Element<*> {
    return (
      <Downshift
        ref={c => {
          this.downshiftComponent = c
        }}
        onChange={this.handleValueChange}
        onInputValueChange={this.handleInputValueChange}
        itemToString={item => (item ? item.toString() : '')}
        render={this.renderDownshift}
        onOuterClick={this.closeMenu}
        selectedItem={this.props.selectedItem}
      />
    )
  }
}
