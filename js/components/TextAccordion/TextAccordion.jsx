// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Subtitle } from 'components/typography'
import AccordionSwitch from './AccordionSwitch'
import AccordionDropdown from './AccordionDropdown'

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
  z-index: 1;
  cursor: pointer;
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
          <AccordionSwitch isOpen={this.state.isOpen} />
        </AccordionHeaderDiv>

        {this.state.isOpen && <AccordionDropdown text={innerText} />}
      </AccordionDiv>
    )
  }
}
