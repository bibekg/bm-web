// @flow

import * as React from 'react'
import styled from 'styled-components'
import RadioInput from './RadioInput'
import type { OptionType } from './RadioInput'

const RadioGroupDiv = styled.div`
  padding: 10px 0;
  margin-bottom: 30px;
`

type PropsType = {
  required: boolean,
  name: string,
  options: Array<OptionType>,
  selected: string,
  onChange: (SyntheticInputEvent<*>) => void
}

export default function RadioGroup(props: PropsType): React.Element<*> {
  return (
    <RadioGroupDiv>
      {props.options.map(option => (
        <RadioInput
          required={props.required}
          key={option.id}
          name={props.name}
          value={option}
          checked={option.id === props.selected}
          onChange={props.onChange}
        />
      ))}
    </RadioGroupDiv>
  )
}

RadioGroup.defaultProps = {
  required: false
}
