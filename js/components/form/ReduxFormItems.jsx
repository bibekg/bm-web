// @flow
import * as React from 'react'
import styled from 'styled-components'
import { colors, breakpoints } from 'styles'

import * as Form from 'components/form'
import Slider from 'components/Slider'
import Dropdown, { DropdownItem } from 'components/Dropdown'
import Button from 'components/Button'
import { FieldInvalidIcon } from 'components/icons'

export const FormPageWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

const FormItemWrapper = styled.div`
  margin: 10px 0;
`

const FormItemChildrenWrapper = styled.div`
  & > * {
    margin-top: 10px;
  }
`

export const ButtonWrapper = styled.div`
  padding-top: 10px;
  text-align: center;
`

// Navigation button at the bottom of each page
export const NavButton = styled(Button)`
  display: inline-block;
  margin-left: 25px;
  margin-right: 25px;
  @media (max-width: ${breakpoints.navFold - 1}px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`

export const FieldValidationError = styled(({ className, children }) => (
  <span className={className}>
    <FieldInvalidIcon size={12} />
    {children}
  </span>
))`
  border: none;
  font-weight: 700;
  color: ${colors.red};
  display: block;
  padding-bottom: 15px;

  & > * {
    margin-right: 5px;
  }
`

export const FormItem = (props: FormItemPropsType) => (
  <FormItemWrapper>
    <Form.Label required={props.required}>{props.name}</Form.Label>
    <FormItemChildrenWrapper>{props.children}</FormItemChildrenWrapper>
  </FormItemWrapper>
)

export const FormTextInputItem = ({
  input,
  meta: { error },
  options: { itemName, required, ...componentOptions }
}: FormTextInputItemArgumentType) => (
  <FormItem name={itemName} required={required}>
    <Form.TextInput {...input} {...componentOptions} type="text" />
    {error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)

export const FormSliderItem = ({
  input,
  meta: { error },
  options: { itemName, required, ...componentOptions }
}: FormSliderItemArgumentType) => (
  <FormItem name={itemName} required={required}>
    <Slider {...input} {...componentOptions} />
    {error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)

export const FormRadioGroupItem = ({
  input,
  meta: { error },
  options: { itemName, required, ...componentOptions }
}: FormRadioGroupItemArgumentType) => (
  <FormItem name={itemName} required={required}>
    <Form.RadioGroup {...input} {...componentOptions} selected={input.value} />
    {error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)

export const FormCheckboxItem = ({
  fields,
  meta: { error },
  options: { itemName, required, ...componentOptions },
  formProps
}: FormCheckboxItemArgumentType) => (
  <FormItem name={itemName} required={required}>
    <Form.CheckboxGroup name={fields.name} {...componentOptions} fields={fields} formProps={formProps} inForm />
    {error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)

export const FormDropdownItem = ({
  input,
  options: { itemName, ...componentOptions }
}: FormDropdownItemArgumentType) => (
  <FormItem name={itemName}>
    <Dropdown
      {...input}
      {...componentOptions}
      selectedItem={new DropdownItem(input.value, input.value)}
      onChange={(dropdownName, newItem) => {
        input.onChange(newItem.text)
      }}
    />
  </FormItem>
)

export const FormTextareaItem = ({
  input,
  meta: { error },
  options: { itemName, required }
}: FormTextareaItemArgumentType) => (
  <FormItem name={itemName} required={required}>
    <Form.Textarea {...input} rows={5} />
    {error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)
