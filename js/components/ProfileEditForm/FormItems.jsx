// @flow
import * as React from 'react'
import styled from 'styled-components'
import { breakpoints } from 'styles'

import * as Form from 'components/form'
import Slider from 'components/Slider'
import Dropdown, { DropdownItem } from 'components/Dropdown'
import Button from 'components/Button'

const FormItemWrapper = styled.div`
  margin: 20px 0;
`

const FormItemChildrenWrapper = styled.div`
  & > * {
    margin: 10px 0;
  }
`

export const ButtonWrapper = styled.div`
  text-align: center;
`

export const PageButton = styled(Button)`
  display: inline-block;
  margin-left: 25px;
  margin-right: 25px;
  @media (max-width: ${breakpoints.navFold - 1}px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`

export const FieldValidationError = styled.span`
  border: none;
  font-weight: 700;
  color: #700;

  &:before {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    content: '\\F06A';
    margin-right: 5px;
  }
`

export const FormItem = (props: FormItemPropsType) => (
  <FormItemWrapper>
    <Form.Label>{props.name}</Form.Label>
    <FormItemChildrenWrapper>{props.children}</FormItemChildrenWrapper>
  </FormItemWrapper>
)

export const FormTextInputItem = ({
  input,
  options: { itemName, ...componentOptions }
}: FormTextInputItemArgumentType) => (
  <FormItem name={itemName}>
    <Form.TextInput {...input} {...componentOptions} type="text" />
  </FormItem>
)

export const FormSliderItem = ({ input, options: { itemName, ...componentOptions } }: FormSliderItemArgumentType) => (
  <FormItem name={itemName}>
    <Slider {...input} {...componentOptions} />
  </FormItem>
)

export const FormRadioGroupItem = ({
  input,
  options: { itemName, ...componentOptions }
}: FormRadioGroupItemArgumentType) => (
  <FormItem name={itemName}>
    <Form.RadioGroup {...input} {...componentOptions} selected={input.value} />
  </FormItem>
)

export const FormCheckboxItem = ({
  fields,
  meta: { error },
  options: { itemName, ...componentOptions },
  formProps
}: FormCheckboxItemArgumentType) => (
  <FormItem name={itemName}>
    <Form.CheckboxGroup name={fields.name} {...componentOptions} fields={fields} formProps={formProps} />
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
  meta: { touched, error },
  options: { itemName }
}: FormTextareaItemArgumentType) => (
  <FormItem name={itemName}>
    <Form.Textarea {...input} rows={5} />
    {touched && error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)
