// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'
import CheckboxInput from './CheckboxInput'
import type { OptionType } from './CheckboxInput'

const CheckboxGroupDiv = styled.div`
  padding: 10px 0;
`

type PropsType = {
  name: string,
  anyable: boolean,
  options: Array<OptionType>,
  // selectedOptions: Array<string>,
  onChange: (SyntheticInputEvent<*>) => void,
  // onToggleAny: (boolean, string) => void,
  innerRef?: HTMLElement => void
}

export default function CheckboxGroup(props: PropsType): React.Element<*> {
  /*
  const handleAnyClick = () => {
    const { selectedOptions, options, onToggleAny, name } = props
    onToggleAny(allSelected, name)
  }
  */

  const { innerRef, name, options } = props
  // eslint-disable-next-line no-shadow
  const CheckboxInputField = ({ input, entry, name }) => (
    <CheckboxInput {...input} key={entry.id} name={name} value={entry} />
  )
  return (
    <CheckboxGroupDiv innerRef={innerRef}>
      {options.map((option, index): React.Element<*> => (
        <Field
          key={option.id}
          name={`${name}[${index}]`}
          component={CheckboxInputField}
          entry={option}
          type="checkbox"
        />
      ))}
      {/* {anyable && (
        <CheckboxInput
          name={name}
          index={options.length}
          value={{ id: 'any', text: 'Any' }}
          checked={options.length === selectedOptions.length}
          onChange={handleAnyClick}
        />
      )} */}
    </CheckboxGroupDiv>
  )
}

CheckboxGroup.defaultProps = {
  anyable: false
  // onToggleAny: () => {}
}
