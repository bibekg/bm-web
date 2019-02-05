// @flow
import * as USER_PROPS from 'constants/user-props'
import * as FormItems from '../form/ReduxFormItems'

// Components that require a FieldArray instead of a Field in redux-form
export const FIELD_ARRAY_COMPONENTS = [FormItems.FormCheckboxItem]

// Given a user object or an object of user form values, build a data mapper object
// that's used to construct form initial values and submit values
const userDataMapperCreator = (user: UserType | UserFormType) => ({
  ethnicity: [user.ethnicity, USER_PROPS.ETHNICITY],
  genderPreference: [user.genderPreference, USER_PROPS.GENDER],
  relationshipType: [user.relationshipType, USER_PROPS.RELATIONSHIP_TYPE],
  ethnicityPreference: [user.ethnicityPreference, USER_PROPS.ETHNICITY],
  yearPreference: [user.yearPreference, USER_PROPS.YEAR],
  collegePreference: [user.collegePreference, USER_PROPS.COLLEGE]
})

// Build the initial values for a FieldArray (an array of booleans) based on
// currently selected options and all possible options
// Eg. All Options = [A, B, C, D, E], Selected Options = [A, C]
// Return: [true, false, true, false, false]
const buildFieldArrayInitialValues = (name: string, state: ReduxStateType): [boolean] | null => {
  const { user } = state
  if (user === undefined || user === null) {
    return null
  }
  const userDataMapper = userDataMapperCreator(user)

  const selectedOptions = userDataMapper[name][0]
  const allOptions = userDataMapper[name][1]
  return allOptions.map(value => selectedOptions.indexOf(value) >= 0)
}

// eslint-disable-next-line flowtype/no-weak-types
export const createFormInitialValues = (state: ReduxStateType): any | null => {
  const { user } = state
  if (user === undefined || user === null) {
    return null
  }

  const questionsValues = {}
  user.answers.forEach(entry => {
    questionsValues[entry.question] = entry.answer
  })

  const initialValues = {
    /* eslint-disable eqeqeq */
    // Basic Page
    firstName: user.name.first,
    lastName: user.name.last,
    age: user.age != undefined ? user.age : USER_PROPS.MIN_AGE,
    year: user.year ? user.year.toString() : null,
    gender: user.gender,
    major: user.major,
    college: user.college,
    height: user.height != undefined ? user.height : USER_PROPS.MIN_HEIGHT,
    ethnicity: buildFieldArrayInitialValues('ethnicity', state),

    // Personal Page
    bio: user.bio,
    questions: questionsValues,

    // Preference Page
    genderPreference: buildFieldArrayInitialValues('genderPreference', state),
    agePreference: user.agePreference
      ? [user.agePreference.min, user.agePreference.max]
      : [USER_PROPS.MIN_AGE, USER_PROPS.MAX_AGE],
    relationshipType: buildFieldArrayInitialValues('relationshipType', state),
    ethnicityPreference: buildFieldArrayInitialValues('ethnicityPreference', state),
    yearPreference: buildFieldArrayInitialValues('yearPreference', state),
    collegePreference: buildFieldArrayInitialValues('collegePreference', state),
    heightPreference: user.heightPreference
      ? [user.heightPreference.min, user.heightPreference.max]
      : [USER_PROPS.MIN_HEIGHT, USER_PROPS.MAX_HEIGHT],

    // Contact Page
    phone: user.phone,
    receiveTexts: user.receiveTexts,
    instagram: user.instagram,
    snapchat: user.snapchat
  }
  /* eslint-enable eqeqeq */

  return initialValues
}

// Create form submit data for a field with value as an array
// eslint-disable-next-line
const buildSubmitFieldArray = (name: string, user: UserFormType) => {
  const userDataMapper = userDataMapperCreator(user)
  const [selectedOptions, allOptions] = userDataMapper[name]
  return allOptions.filter((value, index) => selectedOptions[index] === true)
}

export const createSubmitData = (editedUser: UserType, formValue: UserFormType): UserType => {
  const answersValues = editedUser.answers
  answersValues.forEach(faq => {
    faq.answer = formValue.questions[faq.question]
  })

  const submitValues = {
    // Basic Page
    name: {
      first: formValue.firstName,
      last: formValue.lastName
    },
    age: formValue.age,
    year: Number(formValue.year),
    gender: formValue.gender,
    major: formValue.major,
    college: formValue.college,
    height: formValue.height,
    ethnicity: buildSubmitFieldArray('ethnicity', formValue),

    // Personal Page
    bio: formValue.bio,
    answers: answersValues,

    // Preference Page
    genderPreference: buildSubmitFieldArray('genderPreference', formValue),
    agePreference: { min: formValue.agePreference[0], max: formValue.agePreference[1] },
    relationshipType: buildSubmitFieldArray('relationshipType', formValue),
    ethnicityPreference: buildSubmitFieldArray('ethnicityPreference', formValue),
    yearPreference: buildSubmitFieldArray('yearPreference', formValue),
    collegePreference: buildSubmitFieldArray('collegePreference', formValue),
    heightPreference: { min: formValue.heightPreference[0], max: formValue.heightPreference[1] },

    // Contact Page
    phone: formValue.phone,
    receiveTexts: formValue.receiveTexts,
    instagram: formValue.instagram,
    snapchat: formValue.snapchat
  }

  Object.keys(submitValues).forEach(field => {
    // eslint-disable-next-line flowtype/no-weak-types
    editedUser[field] = (submitValues: Object)[field]
  })
  return editedUser
}
