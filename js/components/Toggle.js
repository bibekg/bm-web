// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

const ToggleFrame = styled.div`
  width: 44px;
  height: 25px;
  border: 3px solid ${colors.blue};
  background: ${colors.blue};
  border-radius: 6px;
  column-count: 2;
  column-gap: 0px;
  cursor: pointer;
  opacity: ${props => (props.toggled ? 1 : 0.5)};
`

const ToggleInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: white;
  opacity: ${props => (props.toggled ? 1 : 0)};
  transition: opacity 0.3s ease;
`

type PropsType = {
  toggled: boolean,
  onClick: (SyntheticInputEvent<*>) => void
}

export default function Toggle(props: PropsType): React.Element<*> {
  return (
    <ToggleFrame toggled={props.toggled} onClick={props.onClick}>
      <ToggleInner toggled={!props.toggled} />
      <ToggleInner toggled={props.toggled} />
    </ToggleFrame>
  )
}
