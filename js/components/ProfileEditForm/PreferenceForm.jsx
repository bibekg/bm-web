// @flow
import * as React from 'react'

import Button from 'components/Button'
import * as USER_PROPS from 'constants/user-props'
import { formatRelationshipType, formatHeight, formatUserYear, formatGender } from 'utilities/user-formatters'

import { Field, FieldArray, reduxForm } from 'redux-form'
import type { FormProps } from 'redux-form'
import * as FormItems from './FormItems'
import * as FormValidators from './FormValidators'
import { FIELD_ARRAY_COMPONENTS } from './FormHelpers'

const ProfileEditFormPreferencePage = (props: FormProps): React.Element<*> => {
  const { previousPage, handleSubmit } = props

  // required fields
  const genderPreferenceField: FormCheckboxFieldType = {
    fieldName: 'genderPreference',
    component: FormItems.FormCheckboxItem,
    options: {
      itemName: 'Interested In',
      options: USER_PROPS.GENDER.map(g => ({ id: g, text: formatGender(g) })),
      anyable: true
    },
    validate: FormValidators.requiredValueArray
  }
  const agePreferenceField: FormSliderFieldType = {
    fieldName: 'agePreference',
    component: FormItems.FormSliderItem,
    options: {
      itemName: 'Age Preference',
      min: USER_PROPS.MIN_AGE,
      max: USER_PROPS.MAX_AGE,
      marks: USER_PROPS.AGE_LABELS
    }
  }
  const relationshipTypeField: FormCheckboxFieldType = {
    fieldName: 'relationshipType',
    component: FormItems.FormCheckboxItem,
    options: {
      itemName: 'Looking For',
      options: USER_PROPS.RELATIONSHIP_TYPE.map(r => ({ id: r, text: formatRelationshipType(r) })),
      anyable: true
    },
    validate: FormValidators.requiredValueArray
  }

  // non-required fields
  const ethnicityPreferenceField: FormCheckboxFieldType = {
    fieldName: 'ethnicityPreference',
    component: FormItems.FormCheckboxItem,
    options: {
      itemName: 'Ethnicity Preference',
      options: USER_PROPS.ETHNICITY.map(e => ({ id: e, text: e })),
      anyable: true
    },
    validate: FormValidators.requiredValueArray
  }

  const yearPreferenceField: FormCheckboxFieldType = {
    fieldName: 'yearPreference',
    component: FormItems.FormCheckboxItem,
    options: {
      itemName: 'Class Year Preference',
      options: USER_PROPS.YEAR.map(y => ({ id: String(y), text: formatUserYear(y) })),
      anyable: true
    },
    validate: FormValidators.requiredValueArray
  }

  const collegePreference: FormCheckboxFieldType = {
    fieldName: 'collegePreference',
    component: FormItems.FormCheckboxItem,
    options: {
      itemName: 'College Preference',
      options: USER_PROPS.COLLEGE.map(c => ({ id: c, text: c })),
      anyable: true
    },
    validate: FormValidators.requiredValueArray
  }

  const heightPreference: FormSliderFieldType = {
    fieldName: 'heightPreference',
    component: FormItems.FormSliderItem,
    options: {
      itemName: 'Height Preference',
      min: USER_PROPS.MIN_HEIGHT,
      max: USER_PROPS.MAX_HEIGHT,
      marks: USER_PROPS.HEIGHT_LABELS,
      formatter: (n: ?number) => (n ? formatHeight(n) : ''),
      showLabel: true
    }
  }

  const requiredFields = [genderPreferenceField, agePreferenceField, relationshipTypeField]
  const nonrequiredFields = [ethnicityPreferenceField, yearPreferenceField, collegePreference, heightPreference]
  // TODO: checking non-required field display option
  const fields = true ? requiredFields.concat(nonrequiredFields) : requiredFields

  return (
    <form onSubmit={handleSubmit}>
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
})(ProfileEditFormPreferencePage)
