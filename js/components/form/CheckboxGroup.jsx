// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'
import type { FormProps } from 'redux-form'
import type { Fields } from 'redux-form/lib/FieldArrayProps.types.js.flow'
import CheckboxInput from './CheckboxInput'
import type { OptionType } from './CheckboxInput'

const CheckboxGroupDiv = styled.div`
  padding-top: 10px;
`

type PropsType = {
  name: string,
  anyable?: boolean,
  options: Array<OptionType>,
  innerRef?: HTMLElement => void,
  fields: Fields,
  formProps: FormProps
}

export default function CheckboxGroup(props: PropsType): React.Element<*> {
  const { innerRef, name, options, anyable, fields, formProps } = props

  const isAnyChecked = (): boolean => {
    for (let i = 0; i < options.length; i += 1) {
      if (fields.get(i) === false) {
        return false
      }
    }
    return true
  }

  const handleAnyClick = () => {
    for (let i = 0; i < options.length; i += 1) {
      const fieldPath = `${name}[${i}]`
      formProps.change(fieldPath, !isAnyChecked())
    }
  }

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
      {anyable && (
        <CheckboxInput
          name={name}
          value={{ id: 'any', text: 'Any' }}
          checked={isAnyChecked()}
          onChange={handleAnyClick}
        />
      )}
    </CheckboxGroupDiv>
  )
}

CheckboxGroup.defaultProps = {
  anyable: false
}
