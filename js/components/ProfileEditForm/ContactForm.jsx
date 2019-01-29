// @flow
import * as React from 'react'

import * as Form from 'components/form'
import { Text } from 'components/typography'

import { Field, FieldArray, reduxForm } from 'redux-form'
import type { FormProps } from 'redux-form'
import * as FormItems from './FormItems'
import * as FormValidators from './FormValidators'
import { FIELD_ARRAY_COMPONENTS } from './FormHelpers'

const DisclaimerText = Text.extend`
  text-align: center;
  padding-bottom: 10px;
`

const ProfileEditFormContactPage = (props: FormProps): React.Element<*> => {
  const { previousPage, handleSubmit } = props

  // "helper components" not wrapped by <FormItem>, due to our special structure of
  // adding multiple nodes inside a FormItem in this page
  const FormTextInputItemRaw = ({ input, meta: { touched, error }, options }) => (
    <div>
      <Form.TextInput {...input} {...options} type="text" />
      {touched && error && <FormItems.FieldValidationError>{error}</FormItems.FieldValidationError>}
    </div>
  )
  const FormCheckboxInputItemRaw = ({ input, options }) => <Form.CheckboxInput {...input} {...options} />

  // required fields
  // note they are not directly mapped to redux-form Fields due to the special structure
  const phoneFieldOptions = {
    itemName: 'Phone Number',
    placeholder: '5551239876'
  }
  const receiveTextFieldOptions = {
    value: { id: 'receiveTexts', text: 'Receive text notifications' }
  }

  // non-required fields
  const instagramField: FormTextInputFieldType = {
    fieldName: 'instagram',
    component: FormItems.FormTextInputItem,
    options: {
      itemName: 'Instagram',
      placeholder: 'joeBruin_ig'
    }
  }
  const snapchatField: FormTextInputFieldType = {
    fieldName: 'snapchat',
    component: FormItems.FormTextInputItem,
    options: {
      itemName: 'Snapchat',
      placeholder: 'joeBruin_snap'
    }
  }

  const requiredFields = [
    <DisclaimerText key="disclaimer">
      No worries! Your contact information will not be shared until you and your match like each other
    </DisclaimerText>,
    <FormItems.FormItem name="Phone Number" key="form">
      <Field
        name="phone"
        component={FormTextInputItemRaw}
        validate={FormValidators.phoneNumberFormat}
        options={phoneFieldOptions}
      />
      <Field
        name="receiveTexts"
        component={FormCheckboxInputItemRaw}
        options={receiveTextFieldOptions}
        type="checkbox"
      />
      <Text>
        {
          'You will always receive an email when you get a new match but you can also choose to be notified via a text message.'
        }
      </Text>
    </FormItems.FormItem>
  ]
  const nonrequiredFields = [instagramField, snapchatField].map(
    field =>
      FIELD_ARRAY_COMPONENTS.indexOf(field.component) >= 0 ? (
        <FieldArray key={field.fieldName} name={field.fieldName} options={field.options} component={field.component} />
      ) : (
        <Field key={field.fieldName} name={field.fieldName} options={field.options} component={field.component} />
      )
  )
  // TODO: checking non-required field display option
  const fields = true ? requiredFields.concat(nonrequiredFields) : requiredFields

  return (
    <form onSubmit={handleSubmit}>
      {fields}

      <FormItems.ButtonWrapper>
        <FormItems.PageButton primary onClick={previousPage}>
          Previous
        </FormItems.PageButton>
        <FormItems.PageButton primary type="submit">
          Next
        </FormItems.PageButton>
      </FormItems.ButtonWrapper>
    </form>
  )
}

export default reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormContactPage)
