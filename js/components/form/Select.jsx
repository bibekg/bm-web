// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

const StyledSelect = styled.select`
  padding: 10px;
  background-color: ${colors.white};
  border: 2px solid ${colors.blue};
  display: block;
`

type PropsType = {
  name: string,
  options: Array<string>,
  value: ?string,
  onChange?: (SyntheticInputEvent<*>) => void
}

export default function Select(props: PropsType): React.Element<*> {
  return (
    <StyledSelect type="select" name={props.name} value={props.value} onChange={props.onChange}>
      <option value={''} />
      {props.options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  )
}
