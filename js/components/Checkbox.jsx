// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

const CheckboxFrame = styled.div`
  width: 25px;
  height: 25px;
  border: 3px solid ${colors.blue};
  padding: 3px;
`

const CheckboxInner = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.blue};
  opacity: ${props => (props.checked ? 1 : 0)};
  transition: opacity 0.3s ease;
`

type PropsType = {
  checked: boolean,
  onClick: () => void
}

export default function Checkbox(props: PropsType): React.Element<*> {
  return (
    <CheckboxFrame onClick={props.onClick}>
      <CheckboxInner checked={props.checked} />
    </CheckboxFrame>
  )
}
