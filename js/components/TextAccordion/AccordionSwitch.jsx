// @flow

import * as React from 'react'
import styled from 'styled-components'
import { ExpandMoreIcon } from 'components/icons'

type PropsType = {
  isOpen: boolean
}

const AccordionSwitchDiv = styled.div`
  transform: rotate(${(props: PropsType) => (props.isOpen ? '180' : '0')}deg);
  transform-origin: center;
  transition: 0.2s;
`

export default function AccordionSwitch(props: PropsType): React.Element<*> {
  return (
    <AccordionSwitchDiv isOpen={props.isOpen}>
      <ExpandMoreIcon fill={'#76AFFB'} size={40} />
    </AccordionSwitchDiv>
  )
}
