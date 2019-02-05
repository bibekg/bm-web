// @flow
import * as React from 'react'

import * as Form from 'components/form'
import { Text } from 'components/typography'

import { Field, FieldArray, reduxForm } from 'redux-form'
import type { FormProps } from 'redux-form'
import * as FormItems from '../form/ReduxFormItems'
import * as FormValidators from './FormValidators'
import { FIELD_ARRAY_COMPONENTS } from './FormHelpers'

const DisclaimerText = Text.extend`
  text-align: center;
  padding-bottom: 10px;
`

// "helper components" not wrapped by <FormItem>, due to our special structure of
// adding multiple nodes inside a FormItem in this page
const FormTextInputItemRaw = ({ input, meta: { error }, options }) => (
  <div>
    <Form.TextInput {...input} {...options} type="text" />
    {error && <FormItems.FieldValidationError>{error}</FormItems.FieldValidationError>}
  </div>
)
const FormCheckboxInputItemRaw = ({ input, options }) => <Form.CheckboxInput {...input} {...options} />

const ProfileEditFormContactPage = (props: FormProps): React.Element<*> => {
  const { handleSubmit, invalid, requiredFieldsOnly, createNavButtons } = props

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
        type="text"
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
  // The z-index trick with flex-direction: column-reverse
  // See BasicForm.jsx for details
  const fields = (requiredFieldsOnly ? requiredFields : requiredFields.concat(nonrequiredFields)).reverse()

  return (
    <form onSubmit={handleSubmit}>
      <FormItems.FormPageWrapper>{fields}</FormItems.FormPageWrapper>
      {createNavButtons(invalid)}
    </form>
  )
}

export default reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormContactPage)
