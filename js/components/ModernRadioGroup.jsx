// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & > * {
    margin: 4px;
  }
`

const OptionItem = styled.div`
  padding: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  border: ${props => (props.bordered ? `2px solid ${colors.blue}` : 'none')};
  color: ${colors.black};
  ${(props): string => {
    if (props.selected) {
      return `
        background-color: ${colors.blue};
        color: ${colors.white};
      `
    } else {
      return `
        &:hover {
          background-color: ${colors.lightBlue};
        }
      `
    }
  }};
`

const ItemText = styled.p`
  margin: 0;
  font-size: ${props => props.fontSize}px;
`

type OptionType<T> = {
  id: T,
  text: string
}

type PropsType<T> = {
  name: string,
  selected: T,
  options: Array<OptionType<T>>,
  onChange: T => void,
  bordered: boolean,
  fontSize: number
}

export default class ModernRadioGroup extends React.Component<PropsType<*>> {
  static defaultProps = {
    bordered: false,
    fontSize: 24
  }

  handleSelectionChange = (newSelection: *) => {
    this.props.onChange({
      name: this.props.name,
      value: newSelection
    })
  }

  renderOneOption = ({ id, text }: OptionType<*>): React.Element<*> => (
    <OptionItem
      key={id}
      selected={this.props.selected === id}
      onClick={() => this.handleSelectionChange(id)}
      bordered={this.props.bordered}
    >
      <ItemText fontSize={this.props.fontSize}>{text}</ItemText>
    </OptionItem>
  )

  render(): React.Element<*> {
    return <OptionList> {this.props.options.map(this.renderOneOption)} </OptionList>
  }
}
