// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Text, Subtitle } from 'components/typography'
import { ExpandMoreIcon } from 'components/icons'

type PropsType = {
  headerText: string,
  innerText: string
}

type StateType = {
  isOpen: boolean
}

const AccordionDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const AccordionHeaderDiv = styled.div`
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
`

const AccordionSwitchDiv = styled.div`
  transform: rotate(${props => (props.isOpen ? '180' : '0')}deg);
  transform-origin: center;
  transition: 0.2s;
`

const DropdownDiv = styled.div`
  margin-bottom: 10px;
`

export default class TextAccordion extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = { isOpen: false }
    this.toggleAccordion = this.toggleAccordion.bind(this)
  }

  // This additional function declaration is required in order to keep Flow
  // from complaining about binding the function in the constructor
  toggleAccordion: () => void
  toggleAccordion() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render(): React.Element<*> {
    const { headerText, innerText } = this.props

    return (
      <AccordionDiv>
        <AccordionHeaderDiv onClick={this.toggleAccordion}>
          <Subtitle align="left">{headerText}</Subtitle>
          <AccordionSwitchDiv isOpen={this.state.isOpen}>
            <ExpandMoreIcon fill={'#76AFFB'} size={40} />
          </AccordionSwitchDiv>
        </AccordionHeaderDiv>

        {this.state.isOpen && (
          <DropdownDiv>
            <Text paragraph>{innerText}</Text>
          </DropdownDiv>
        )}
      </AccordionDiv>
    )
  }
}
