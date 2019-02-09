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
  // The component can be either integrated in a ReduxForm or not (default to no), so
  // one of the following two set of props need to be passed in
  inForm?: boolean,

  // non-ReduxForm props
  selectedOptions?: Array<string>,
  onChange?: (SyntheticInputEvent<*>) => void,
  onToggleAny?: (boolean, string) => void,

  // ReduxForm-specific props
  fields?: Fields,
  formProps?: FormProps // props of the form that this CheckboxGroup is in
}

export default function CheckboxGroup(props: PropsType): React.Element<*> {
  const { innerRef, name, selectedOptions, onChange, options, anyable, inForm, fields, formProps } = props

  const isAnyCheckedInForm = (): boolean => {
    for (let i = 0; i < options.length; i += 1) {
      if (fields.get(i) === false) {
        return false
      }
    }
    return true
  }

  const handleAnyClick = () => {
    // eslint-disable-next-line no-shadow
    const { selectedOptions, options, onToggleAny, name } = props
    const allSelected = selectedOptions.length === options.length
    onToggleAny(allSelected, name)
  }

  const handleAnyClickInForm = () => {
    for (let i = 0; i < options.length; i += 1) {
      const fieldPath = `${name}[${i}]`
      formProps.change(fieldPath, !isAnyCheckedInForm())
    }
  }

  // A higher-order component for CheckboxInput to be used by a ReduxForm Field
  // eslint-disable-next-line no-shadow
  const CheckboxInputField = ({ input, entry, name }) => (
    <CheckboxInput {...input} key={entry.id} name={name} value={entry} />
  )

  if (inForm) {
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
            checked={isAnyCheckedInForm()}
            onChange={handleAnyClickInForm}
          />
        )}
      </CheckboxGroupDiv>
    )
  } else {
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
}

CheckboxGroup.defaultProps = {
  anyable: false,
  onToggleAny: () => {}
}
