// @flow

import * as React from 'react'
import styled from 'styled-components'
import CheckboxInput from './CheckboxInput'
import type { OptionType } from './CheckboxInput'

const CheckboxGroupDiv = styled.div`
  padding: 10px 0;
`

type PropsType = {
  name: string,
  anyable: boolean,
  options: Array<OptionType>,
  selectedOptions: Array<string>,
  onChange: (SyntheticInputEvent<*>) => void,
  onToggleAny: (boolean, string) => void,
  innerRef?: HTMLElement => void
}

export default function CheckboxGroup(props: PropsType): React.Element<*> {
  const handleAnyClick = () => {
    const { selectedOptions, options, onToggleAny, name } = props
    const allSelected = selectedOptions.length === options.length
    onToggleAny(allSelected, name)
  }

  const { innerRef, name, selectedOptions, onChange, options, anyable } = props
  return (
    <CheckboxGroupDiv innerRef={innerRef}>
      {options.map(option => (
        <CheckboxInput
          key={option.id}
          name={name}
          value={option}
          checked={selectedOptions.indexOf(option.id) !== -1}
          onChange={onChange}
        />
      ))}
      {anyable && (
        <CheckboxInput
          name={name}
          value={{ id: 'any', text: 'Any' }}
          checked={options.length === selectedOptions.length}
          onChange={handleAnyClick}
        />
      )}
    </CheckboxGroupDiv>
  )
}

CheckboxGroup.defaultProps = {
  anyable: false,
  onToggleAny: () => {}
}
