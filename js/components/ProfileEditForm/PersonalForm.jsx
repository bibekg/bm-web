// @flow
import * as React from 'react'

import Button from 'components/Button'
import * as USER_PROPS from 'constants/user-props'

import { Field, reduxForm } from 'redux-form'
import type { FormProps } from 'redux-form'
import * as FormItems from './FormItems'
import * as FormValidators from './FormValidators'

const ProfileEditFormPersonalPage = (props: FormProps): React.Element<*> => {
  const { previousPage, handleSubmit } = props

  const bioField = {
    fieldName: 'bio',
    options: {
      itemName: 'Bio'
    },
    validate: FormValidators.requiredValue
  }
  const questionFields = []
  Object.entries(USER_PROPS.QUESTIONS).forEach(entry => {
    questionFields.push({
      fieldName: `questions[${entry[0]}]`,
      options: {
        itemName: entry[1]
      }
    })
  })
  let fields = []
  fields.push(bioField)
  fields = fields.concat(questionFields)

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <Field
          key={field.fieldName}
          name={field.fieldName}
          options={field.options}
          component={FormItems.FormTextareaItem}
          validate={field.validate}
        />
      ))}

      <Button primary onClick={previousPage}>
        Previous
      </Button>
      <Button primary type="submit">
        Next
      </Button>
    </form>
  )
}

export default reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormPersonalPage)
