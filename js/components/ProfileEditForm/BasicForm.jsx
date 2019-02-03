// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// import Button from 'components/Button'
import * as USER_PROPS from 'constants/user-props'
import { formatHeight, formatUserYear, formatGender } from 'utilities/user-formatters'
import { DropdownItem } from 'components/Dropdown'

import { Field, FieldArray, reduxForm } from 'redux-form'
import type { FormProps } from 'redux-form'
import * as FormItems from './FormItems'
import { FIELD_ARRAY_COMPONENTS, createFormInitialValues } from './FormHelpers'
import * as FormValidators from './FormValidators'

const FormBasicPageWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

let ProfileEditFormBasicPage = (props: FormProps): React.Element<*> => {
  const { handleSubmit, invalid, requiredFieldsOnly, createNavButtons } = props

  const firstNameField: FormTextInputFieldType = {
    fieldName: 'firstName',
    component: FormItems.FormTextInputItem,
    options: {
      itemName: 'First Name',
      placeholder: 'Joe'
    },
    validate: FormValidators.requiredValue
  }
  const lastNameField: FormTextInputFieldType = {
    fieldName: 'lastName',
    component: FormItems.FormTextInputItem,
    options: {
      itemName: 'Last Name',
      placeholder: 'Bruin'
    },
    validate: FormValidators.requiredValue
  }
  const ageField: FormSliderFieldType = {
    fieldName: 'age',
    component: FormItems.FormSliderItem,
    options: {
      itemName: 'Age',
      min: USER_PROPS.MIN_AGE,
      max: USER_PROPS.MAX_AGE,
      marks: USER_PROPS.AGE_LABELS,
      formatter: (n: ?number) => String(n),
      showLabel: true
    }
  }
  const yearField: FormRadioGroupFieldType = {
    fieldName: 'year',
    component: FormItems.FormRadioGroupItem,
    options: {
      itemName: 'Year',
      options: USER_PROPS.YEAR.map(y => ({ id: String(y), text: formatUserYear(y) }))
    }
  }
  const genderField: FormRadioGroupFieldType = {
    fieldName: 'gender',
    component: FormItems.FormRadioGroupItem,
    options: {
      itemName: 'Gender',
      options: USER_PROPS.GENDER.map(g => ({ id: g, text: formatGender(g) }))
    }
  }

  const majorField: FormDropdownFieldType = {
    fieldName: 'major',
    component: FormItems.FormDropdownItem,
    options: {
      itemName: 'Major',
      items: USER_PROPS.MAJOR.map(c => new DropdownItem(c, c)),
      placeholder: USER_PROPS.MAJOR[0]
    }
  }
  const collegeField: FormDropdownFieldType = {
    fieldName: 'college',
    component: FormItems.FormDropdownItem,
    options: {
      itemName: 'College',
      items: USER_PROPS.COLLEGE.map(c => new DropdownItem(c, c)),
      placeholder: USER_PROPS.COLLEGE[0]
    }
  }
  const heightField: FormSliderFieldType = {
    fieldName: 'height',
    component: FormItems.FormSliderItem,
    options: {
      itemName: 'Height',
      min: USER_PROPS.MIN_HEIGHT,
      max: USER_PROPS.MAX_HEIGHT,
      marks: USER_PROPS.HEIGHT_LABELS,
      formatter: (n: ?number) => (n ? formatHeight(n) : ''),
      showLabel: true
    }
  }
  const ethnicityField: FormCheckboxFieldType = {
    fieldName: 'ethnicity',
    component: FormItems.FormCheckboxItem,
    options: {
      itemName: 'Ethnicity',
      options: USER_PROPS.ETHNICITY.map(e => ({ id: e, text: e }))
    }
  }

  const requiredFields = [firstNameField, lastNameField, ageField, yearField, genderField]
  const nonrequiredFields = [majorField, collegeField, heightField, ethnicityField]
  // A trick to set the z-index of a later DOM element to be lower
  // than the z-index of a previous element
  // so the Dropdown menu of the previous element would not be overlapped by the field of the next element
  // Use "flex-direction: column-reverse" with all fields in the reversed order
  const fields = (requiredFieldsOnly ? requiredFields : requiredFields.concat(nonrequiredFields)).reverse()

  return (
    <form onSubmit={handleSubmit}>
      <FormBasicPageWrapper>
        {fields.map(
          field =>
            FIELD_ARRAY_COMPONENTS.indexOf(field.component) >= 0 ? (
              <FieldArray
                key={field.fieldName}
                name={field.fieldName}
                options={field.options}
                component={field.component}
                validate={field.validate}
                formProps={props}
              />
            ) : (
              <Field
                key={field.fieldName}
                name={field.fieldName}
                options={field.options}
                component={field.component}
                validate={field.validate}
              />
            )
        )}
      </FormBasicPageWrapper>
      {createNavButtons(invalid)}
    </form>
  )
}

ProfileEditFormBasicPage = reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormBasicPage)

export default connect(
  // eslint-disable-next-line flowtype/no-weak-types
  (state: ReduxStateType): { [string]: any | null } => ({
    initialValues: createFormInitialValues(state)
  }),
  {}
)(ProfileEditFormBasicPage)
