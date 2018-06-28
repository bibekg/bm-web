// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

type PropsType = {
  onClick: () => void,
  isOpen: boolean
}

const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 25px;
  width: 80px;

  & > div {
    &:nth-child(1) {
      transform: ${props => (props.isOpen ? 'translateY(6px) rotateZ(-45deg)' : 'translateY(-3px)')};
    }
    &:nth-child(2) {
      opacity: ${props => (props.isOpen ? '0' : '1')};
    }
    &:nth-child(3) {
      transform: ${props => (props.isOpen ? 'translateY(-4px) rotateZ(45deg)' : 'translateY(3px)')};
    }
  }
`

const Bar = styled.div`
  width: 30px;
  height: 3px;
  border-radius: 3px;
  background-color: ${colors.white};
  transition: all 0.5s ease;
  transform-origin: center;
  margin-top: 2px;
`

export default function NavButton(props: PropsType): React.Element<*> {
  return (
    <HamburgerMenu onClick={props.onClick} isOpen={props.isOpen}>
      <Bar />
      <Bar />
      <Bar />
    </HamburgerMenu>
  )
}
