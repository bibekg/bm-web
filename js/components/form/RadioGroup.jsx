// @flow

import * as React from 'react'
import RadioInput from './RadioInput'
import type { OptionType } from './RadioInput'

type PropsType = {
  required: boolean,
  name: string,
  options: Array<OptionType>,
  selected: string,
  onChange: (SyntheticInputEvent<*>) => void
}

export default function RadioGroup(props: PropsType): React.Element<*> {
  return (
    <div>
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
    </div>
  )
}

RadioGroup.defaultProps = {
  required: false
}
