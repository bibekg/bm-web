// @flow
import * as React from 'react'

import * as USER_PROPS from 'constants/user-props'

import { Field, reduxForm } from 'redux-form'
import type { FormProps } from 'redux-form'
import * as FormItems from '../form/ReduxFormItems'
import * as FormValidators from './FormValidators'

const ProfileEditFormPersonalPage = (props: FormProps): React.Element<*> => {
  const { handleSubmit, invalid, createNavButtons } = props

  const bioField = {
    fieldName: 'bio',
    options: {
      itemName: 'Bio',
      required: true
    },
    validate: FormValidators.requiredValue
  }
  const questionFields = []
  Object.entries(USER_PROPS.QUESTIONS).forEach(entry => {
    questionFields.push({
      fieldName: `questions[${entry[0]}]`,
      options: {
        itemName: entry[1],
        required: true
      },
      validate: FormValidators.requiredValue
    })
  })
  // The z-index trick with flex-direction: column-reverse
  // See BasicForm.jsx for details
  const fields = [bioField, ...questionFields].reverse()

  return (
    <form onSubmit={handleSubmit}>
      <FormItems.FormPageWrapper>
        {fields.map(field => (
          <Field
            key={field.fieldName}
            name={field.fieldName}
            options={field.options}
            component={FormItems.FormTextareaItem}
            validate={field.validate}
          />
        ))}
      </FormItems.FormPageWrapper>
      {createNavButtons(invalid)}
    </form>
  )
}

export default reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormPersonalPage)
