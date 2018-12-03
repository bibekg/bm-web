// @flow
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Field, FieldArray, reduxForm } from 'redux-form'
import type { FormProps, FieldProps, FieldArrayProps } from 'redux-form'
import type { InputProps } from 'redux-form/lib/FieldProps.types.js.flow'
import { Text, Subtitle } from 'components/typography'
import Button from 'components/Button'
import Slider from 'components/Slider'
import * as Form from 'components/form'
import Dropdown, { DropdownItem } from 'components/Dropdown'
import type { OptionType } from 'components/form/CheckboxInput'
import * as actions from 'actions'
import * as USER_PROPS from 'constants/user-props'
import { colors, breakpoints } from 'styles'
import { formatHeight, formatRelationshipType, formatUserYear, formatGender } from 'utilities/user-formatters'

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  form {
    margin-top: 25px;
    width: 100%;
  }
`

const FormItemWrapper = styled.div`
  margin: 20px 0;
`

const FormItemChildrenWrapper = styled.div`
  & > * {
    margin: 10px 0;
  }
`

const DropdownWrapper = styled.div`
  & > * {
    position: relative;
    &:nth-child(1) {
      z-index: 2;
    }
    &:nth-child(2) {
      z-index: 1;
    }
  }
  position: relative;
  z-index: 1;
`

const PageMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 50px;
  @media (max-width: ${breakpoints.navFold - 1}px) {
    margin-top: 20px;
    margin-bottom: 40px;
  }
`

const PageButton = styled.div`
  color: ${props => (props.active ? colors.blue : colors.grey)};
  font-weight: ${props => (props.active ? 400 : 300)};
  margin-left: 20px;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
    font-weight: 400;
  }

  @media (max-width: ${breakpoints.navFold - 1}px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`

const DisclaimerText = Text.extend`
  text-align: center;
  padding-bottom: 10px;
`

const FieldValidationError = styled.span`
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

type FormPageType = 'basic' | 'personal' | 'preferences' | 'contact'

type PropsType = {
  paginate?: null | 'menu' | 'process',
  requiredFieldsOnly: boolean,
  redirect: string,
  // Props mapped from Redux state
  user: ?UserType
} & FormProps

type StateType = {
  editedUser: UserType,
  editComplete: boolean,
  errorMessage: ?string,
  pageIndex: ?number
}

// +----------------------+
// |    Form Item Types   |
// +----------------------+
type FormItemPropsType = {
  name: string,
  children: React.Node
}

type FormTextInputItemOptionsType = {
  itemName: string,
  placeholder?: string
}

type FormSliderItemOptionsType = {
  itemName: string,
  min: number,
  max: number,
  marks?: { [string]: string },
  formatter?: (?number) => string,
  showLabel?: boolean
}

type FormRadioGroupItemOptionsType = {
  itemName: string,
  options: Array<OptionType>
}

type FormCheckboxItemOptionsType = {
  itemName: string,
  anyable?: boolean,
  options: Array<OptionType>
}

type FormDropdownItemOptionsType = {
  itemName: string,
  items: Array<DropdownItem<*>>,
  placeholder: string
}

type FormTextareaItemOptionsType = {
  itemName: string
}

// +-----------------+
// |    Form Items   |
// +-----------------+
const FormItem = (props: FormItemPropsType) => (
  <FormItemWrapper>
    <Form.Label>{props.name}</Form.Label>
    <FormItemChildrenWrapper>{props.children}</FormItemChildrenWrapper>
  </FormItemWrapper>
)

type FormTextInputItemArgumentType = {
  input: InputProps,
  options: FormTextInputItemOptionsType
}

const FormTextInputItem = ({ input, options: { itemName, ...componentOptions } }: FormTextInputItemArgumentType) => (
  <FormItem name={itemName}>
    <Form.TextInput {...input} {...componentOptions} type="text" />
  </FormItem>
)

type FormSliderItemArgumentType = {
  input: InputProps,
  options: FormSliderItemOptionsType
}

const FormSliderItem = ({ input, options: { itemName, ...componentOptions } }: FormSliderItemArgumentType) => (
  <FormItem name={itemName}>
    <Slider {...input} {...componentOptions} />
  </FormItem>
)

type FormRadioGroupItemArgumentType = {
  input: InputProps,
  options: FormRadioGroupItemOptionsType
}

const FormRadioGroupItem = ({ input, options: { itemName, ...componentOptions } }: FormRadioGroupItemArgumentType) => (
  <FormItem name={itemName}>
    <Form.RadioGroup {...input} {...componentOptions} selected={input.value} />
  </FormItem>
)

type FormCheckboxItemArgumentType = FieldArrayProps & { options: FormCheckboxItemOptionsType, formProps: FormProps }

const FormCheckboxItem = ({
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

type FormDropdownItemArgumentType = {
  input: InputProps,
  options: FormDropdownItemOptionsType
}

const FormDropdownItem = ({ input, options: { itemName, ...componentOptions } }: FormDropdownItemArgumentType) => (
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

type FormTextareaItemArgumentType = FieldProps & { options: FormTextareaItemOptionsType }

const FormTextareaItem = ({ input, meta: { touched, error }, options: { itemName } }: FormTextareaItemArgumentType) => (
  <FormItem name={itemName}>
    <Form.Textarea {...input} rows={5} />
    {touched && error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)

// +-----------------+
// |     Helpers     |
// +-----------------+
// Components that require a FieldArray instead of a Field in redux-form
const FIELD_ARRAY_COMPONENTS = [FormCheckboxItem]

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

// Build the initial values for a FieldArray based on
// currently selected options and all possible options
const buildFieldArrayInitialValues = (name: string, state: ReduxStateType): [boolean] | null => {
  const { user } = state
  if (user === undefined || user === null) {
    console.warn('No user object found.')
    return null
  }
  const userDataMapper = userDataMapperCreator(user)

  const selectedOptions = userDataMapper[name][0]
  const allOptions = userDataMapper[name][1]
  return allOptions.map(value => selectedOptions.indexOf(value) >= 0)
}

// eslint-disable-next-line flowtype/no-weak-types
const createFormInitialValues = (state: ReduxStateType): any | null => {
  const { user } = state
  if (user === undefined || user === null) {
    console.warn('No user object found.')
    return null
  }

  const questionsValues = {}
  user.answers.forEach(entry => {
    questionsValues[entry.question] = entry.answer
  })

  const initialValues = {
    // Basic Page
    firstName: user.name.first,
    lastName: user.name.last,
    age: user.age,
    year: user.year ? user.year.toString() : null,
    gender: user.gender,
    major: user.major,
    college: user.college,
    height: user.height,
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
    heightPreference: user.heightPreference ? [user.heightPreference.min, user.heightPreference.max] : [],

    // Contact Page
    phone: user.phone,
    receiveTexts: user.receiveTexts,
    instagram: user.instagram,
    snapchat: user.snapchat
  }

  return initialValues
}

// Create form submit data for a field with value as an array
// eslint-disable-next-line
const buildSubmitFieldArray = (name: string, user: UserFormType) => {
  const userDataMapper = userDataMapperCreator(user)
  const [selectedOptions, allOptions] = userDataMapper[name]
  return allOptions.filter((value, index) => selectedOptions[index] === true)
}

const createSubmitData = (editedUser: UserType, formValue: UserFormType): UserType => {
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
    heightPreference: formValue.heightPreference,

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

// -------------------
// |   Validators    |
// -------------------
// eslint-disable-next-line eqeqeq
const requiredValue = value => (value == undefined || value.length === 0 ? 'This field cannot be empty.' : undefined)

const requiredValueArray = (value: [boolean]) =>
  value.filter(v => v === true).length === 0 ? 'You must select at least one item.' : undefined

// eslint-disable-next-line eqeqeq
const phoneNumberFormat = value => (value == undefined || !/^\d{10}$/.test(value) ? 'Invalid phone number.' : undefined)

// +-----------------+
// |    Basic Form   |
// +-----------------+
type FormTextInputFieldType = {
  fieldName: string,
  component: FormTextInputItemArgumentType => React.Element<*>,
  options: FormTextInputItemOptionsType,
  validate?: string => string | null
}

type FormSliderFieldType = {
  fieldName: string,
  component: FormSliderItemArgumentType => React.Element<*>,
  options: FormSliderItemOptionsType,
  validate?: string => string | null
}

type FormRadioGroupFieldType = {
  fieldName: string,
  component: FormRadioGroupItemArgumentType => React.Element<*>,
  options: FormRadioGroupItemOptionsType,
  validate?: string => string | null
}

type FormDropdownFieldType = {
  fieldName: string,
  component: FormDropdownItemArgumentType => React.Element<*>,
  options: FormDropdownItemOptionsType,
  validate?: string => string | null
}

type FormCheckboxFieldType = {
  fieldName: string,
  component: FormCheckboxItemArgumentType => React.Element<*>,
  options: FormCheckboxItemOptionsType,
  // eslint-disable-next-line flowtype/no-weak-types
  validate?: ([any]) => ?string
}

let ProfileEditFormBasicPage = (props: FormProps): React.Element<*> => {
  const { handleSubmit } = props

  const firstNameField: FormTextInputFieldType = {
    fieldName: 'firstName',
    component: FormTextInputItem,
    options: {
      itemName: 'First Name',
      placeholder: 'Joe'
    }
  }
  const lastNameField: FormTextInputFieldType = {
    fieldName: 'lastName',
    component: FormTextInputItem,
    options: {
      itemName: 'Last Name',
      placeholder: 'Bruin'
    }
  }
  const ageField: FormSliderFieldType = {
    fieldName: 'age',
    component: FormSliderItem,
    options: {
      itemName: 'Age',
      min: USER_PROPS.MIN_AGE,
      max: USER_PROPS.MAX_AGE,
      marks: USER_PROPS.AGE_LABELS,
      formatter: (n: ?number) => String(n)
    }
  }
  const yearField: FormRadioGroupFieldType = {
    fieldName: 'year',
    component: FormRadioGroupItem,
    options: {
      itemName: 'Year',
      options: USER_PROPS.YEAR.map(y => ({ id: String(y), text: formatUserYear(y) }))
    }
  }
  const genderField: FormRadioGroupFieldType = {
    fieldName: 'gender',
    component: FormRadioGroupItem,
    options: {
      itemName: 'Gender',
      options: USER_PROPS.GENDER.map(g => ({ id: g, text: formatGender(g) }))
    }
  }

  const majorField: FormDropdownFieldType = {
    fieldName: 'major',
    component: FormDropdownItem,
    options: {
      itemName: 'Major',
      items: USER_PROPS.MAJOR.map(c => new DropdownItem(c, c)),
      placeholder: USER_PROPS.MAJOR[0]
    }
  }
  const collegeField: FormDropdownFieldType = {
    fieldName: 'college',
    component: FormDropdownItem,
    options: {
      itemName: 'College',
      items: USER_PROPS.COLLEGE.map(c => new DropdownItem(c, c)),
      placeholder: USER_PROPS.COLLEGE[0]
    }
  }
  const heightField: FormSliderFieldType = {
    fieldName: 'height',
    component: FormSliderItem,
    options: {
      itemName: 'Height',
      min: USER_PROPS.MIN_HEIGHT,
      max: USER_PROPS.MAX_HEIGHT,
      marks: USER_PROPS.HEIGHT_LABELS,
      formatter: (n: ?number) => (n ? formatHeight(n) : '')
    }
  }
  const ethnicityField: FormCheckboxFieldType = {
    fieldName: 'ethnicity',
    component: FormCheckboxItem,
    options: {
      itemName: 'Ethnicity',
      options: USER_PROPS.ETHNICITY.map(e => ({ id: e, text: e }))
    }
  }

  const requiredFields = [firstNameField, lastNameField, ageField, yearField, genderField]
  const nonrequiredFields = [heightField, ethnicityField]

  return (
    <form onSubmit={handleSubmit}>
      {/* Required Fields */}
      {requiredFields.map(
        field =>
          FIELD_ARRAY_COMPONENTS.indexOf(field.component) >= 0 ? (
            <FieldArray
              key={field.fieldName}
              name={field.fieldName}
              options={field.options}
              component={field.component}
              formProps={props}
            />
          ) : (
            <Field key={field.fieldName} name={field.fieldName} options={field.options} component={field.component} />
          )
      )}

      {/* Non-required Fields */}
      <DropdownWrapper>
        <Field name="major" options={majorField.options} component={FormDropdownItem} />
        <Field name="college" options={collegeField.options} component={FormDropdownItem} />
      </DropdownWrapper>
      {nonrequiredFields.map(
        field =>
          FIELD_ARRAY_COMPONENTS.indexOf(field.component) >= 0 ? (
            <FieldArray
              key={field.fieldName}
              name={field.fieldName}
              options={field.options}
              component={field.component}
              formProps={props}
            />
          ) : (
            <Field key={field.fieldName} name={field.fieldName} options={field.options} component={field.component} />
          )
      )}

      <Button primary type="submit">
        Next
      </Button>
    </form>
  )
}

ProfileEditFormBasicPage = reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormBasicPage)

ProfileEditFormBasicPage = connect(
  // eslint-disable-next-line flowtype/no-weak-types
  (state: ReduxStateType): { [string]: any | null } => ({
    initialValues: createFormInitialValues(state)
  }),
  {}
)(ProfileEditFormBasicPage)

// +-----------------+
// |  Personal Form  |
// +-----------------+
let ProfileEditFormPersonalPage = (props: FormProps): React.Element<*> => {
  const { previousPage, handleSubmit } = props

  const bioField = {
    fieldName: 'bio',
    options: {
      itemName: 'Bio'
    },
    validate: requiredValue
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
          component={FormTextareaItem}
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

ProfileEditFormPersonalPage = reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormPersonalPage)

// +-----------------+
// | Preference Form |
// +-----------------+
let ProfileEditFormPreferencePage = (props: FormProps): React.Element<*> => {
  const { previousPage, handleSubmit } = props

  // required fields
  const genderPreferenceField: FormCheckboxFieldType = {
    fieldName: 'genderPreference',
    component: FormCheckboxItem,
    options: {
      itemName: 'Interested In',
      options: USER_PROPS.GENDER.map(g => ({ id: g, text: formatGender(g) })),
      anyable: true
    },
    validate: requiredValueArray
  }
  const agePreferenceField: FormSliderFieldType = {
    fieldName: 'agePreference',
    component: FormSliderItem,
    options: {
      itemName: 'Age Preference',
      min: USER_PROPS.MIN_AGE,
      max: USER_PROPS.MAX_AGE,
      marks: USER_PROPS.AGE_LABELS
    }
  }
  const relationshipTypeField: FormCheckboxFieldType = {
    fieldName: 'relationshipType',
    component: FormCheckboxItem,
    options: {
      itemName: 'Looking For',
      options: USER_PROPS.RELATIONSHIP_TYPE.map(r => ({ id: r, text: formatRelationshipType(r) })),
      anyable: true
    },
    validate: requiredValueArray
  }

  // non-required fields
  const ethnicityPreferenceField: FormCheckboxFieldType = {
    fieldName: 'ethnicityPreference',
    component: FormCheckboxItem,
    options: {
      itemName: 'Ethnicity Preference',
      options: USER_PROPS.ETHNICITY.map(e => ({ id: e, text: e })),
      anyable: true
    },
    validate: requiredValueArray
  }

  const yearPreferenceField: FormCheckboxFieldType = {
    fieldName: 'yearPreference',
    component: FormCheckboxItem,
    options: {
      itemName: 'Class Year Preference',
      options: USER_PROPS.YEAR.map(y => ({ id: String(y), text: formatUserYear(y) })),
      anyable: true
    },
    validate: requiredValueArray
  }

  const collegePreference: FormCheckboxFieldType = {
    fieldName: 'collegePreference',
    component: FormCheckboxItem,
    options: {
      itemName: 'College Preference',
      options: USER_PROPS.COLLEGE.map(c => ({ id: c, text: c })),
      anyable: true
    },
    validate: requiredValueArray
  }

  const heightPreference: FormSliderFieldType = {
    fieldName: 'heightPreference',
    component: FormSliderItem,
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

ProfileEditFormPreferencePage = reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormPreferencePage)

// +-----------------+
// |   Contact Form  |
// +-----------------+
let ProfileEditFormContactPage = (props: FormProps): React.Element<*> => {
  const { previousPage, handleSubmit } = props

  // "helper components" not wrapped by <FormItem>, due to our special structure of
  // adding multiple nodes inside a FormItem in this page
  const FormTextInputItemRaw = ({ input, meta: { touched, error }, options }) => (
    <div>
      <Form.TextInput {...input} {...options} type="text" />
      {touched && error && <FieldValidationError>{error}</FieldValidationError>}
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
    component: FormTextInputItem,
    options: {
      itemName: 'Instagram',
      placeholder: 'joeBruin_ig'
    }
  }
  const snapchatField: FormTextInputFieldType = {
    fieldName: 'snapchat',
    component: FormTextInputItem,
    options: {
      itemName: 'Snapchat',
      placeholder: 'joeBruin_snap'
    }
  }

  const requiredFields = [
    <DisclaimerText key="disclaimer">
      No worries! Your contact information will not be shared until you and your match like each other
    </DisclaimerText>,
    <FormItem name="Phone Number" key="form">
      <Field name="phone" component={FormTextInputItemRaw} validate={phoneNumberFormat} options={phoneFieldOptions} />
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
    </FormItem>
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

      <Button primary onClick={previousPage}>
        Previous
      </Button>
      <Button primary type="submit">
        Save
      </Button>
    </form>
  )
}

ProfileEditFormContactPage = reduxForm({
  form: 'profileEdit',
  destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true // unregister fields on unmount
})(ProfileEditFormContactPage)

class ProfileEditForm extends React.Component<PropsType, StateType> {
  formElement: ?HTMLFormElement
  relTypeCheckboxGroup: ?HTMLElement
  genderPreferenceCheckboxGroup: ?HTMLElement
  handleValueChange: (SyntheticInputEvent<*>) => void

  PAGES = ['basic', 'preferences', 'contact', 'personal']

  static defaultProps = {
    paginate: null,
    requiredFieldsOnly: false,
    redirect: '/main'
  }

  constructor(props: PropsType) {
    super(props)
    this.state = {
      editedUser: props.user,
      editComplete: false,
      errorMessage: null,
      pageIndex: props.paginate ? 0 : null
    }
  }

  submitForm = formValue => {
    const { editedUser } = this.state
    this.setState({ editedUser: createSubmitData(editedUser, formValue) })

    if (editedUser) {
      this.props.editUser(editedUser, err => {
        if (err) {
          const { status, invalidValues } = err.response.data
          if (status === 'invalid' && invalidValues) {
            this.setState({ errorMessage: `Uh oh! You entered an invalid value for: ${invalidValues.join(', ')}` })
          } else {
            this.setState({ errorMessage: 'Unknown server error.' })
          }
        } else {
          this.setState({ editComplete: true })
        }
      })
    }
  }

  getPageMessage(): string {
    const { pageIndex } = this.state
    const page = pageIndex != null ? this.PAGES[pageIndex] : null
    return page
      ? {
          basic: 'Tell us about yourself.',
          personal: 'Tell us more about yourself',
          preferences: "Tell us what you're looking for.",
          contact: 'Let your matches know how to contact you.'
        }[page]
      : ''
  }

  nextPage = () => {
    const { pageIndex } = this.state
    if (pageIndex != null && pageIndex + 1 < this.PAGES.length) {
      this.setState({ pageIndex: pageIndex + 1 })
      window.scrollTo(0, 0)
    }
  }

  previousPage = () => {
    const { pageIndex } = this.state
    if (pageIndex != null && pageIndex - 1 >= 0) {
      this.setState({ pageIndex: pageIndex - 1 })
      window.scrollTo(0, 0)
    }
  }

  selectPage(selected: FormPageType) {
    const pageIndex = this.PAGES.indexOf(selected)
    if (selected && pageIndex > -1) {
      this.setState({ pageIndex })
      window.scrollTo(0, 0)
    }
  }

  renderPageMenu(): React.Node {
    const { pageIndex } = this.state
    const page = pageIndex != null ? this.PAGES[pageIndex] : null
    const labels = ['Basic', 'Preferences', 'Contact', 'Personal']

    const renderPageButton = (p: string) => (
      <PageButton active={page === p.toLowerCase()} key={p} onClick={() => this.selectPage(p.toLowerCase())}>
        {p}
      </PageButton>
    )

    return <PageMenu>{labels.map(renderPageButton)}</PageMenu>
  }

  render(): ?React.Element<*> {
    const { redirect, paginate } = this.props
    const { editComplete, pageIndex } = this.state

    if (editComplete) return <Redirect push to={redirect} />

    const profileEditFormPage = [
      <ProfileEditFormBasicPage onSubmit={this.nextPage} />,
      <ProfileEditFormPersonalPage previousPage={this.previousPage} onSubmit={this.nextPage} />,
      <ProfileEditFormPreferencePage previousPage={this.previousPage} onSubmit={this.nextPage} />,
      <ProfileEditFormContactPage previousPage={this.previousPage} onSubmit={this.submitForm} />
    ]

    return (
      <FormWrapper>
        {paginate === 'process' && <Subtitle>{this.getPageMessage()}</Subtitle>}
        {paginate === 'menu' && this.renderPageMenu()}
        {profileEditFormPage[pageIndex]}
      </FormWrapper>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user
})

export default connect(mapStateToProps, actions)(ProfileEditForm)
