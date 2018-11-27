// @flow
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Field, FieldArray, reduxForm } from 'redux-form'
import type { FormProps, FieldProps, FieldArrayProps } from 'redux-form'
import type { InputProps } from 'redux-form/lib/FieldProps.types.js.flow'
import type { Fields } from 'redux-form/lib/FieldArrayProps.types.js.flow'
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

const FormTextInputItem = ({
  input,
  options: { itemName, ...componentOptions }
}: {
  input: InputProps,
  options: FormTextInputItemOptionsType
}) => (
  <FormItem name={itemName}>
    <Form.TextInput {...input} {...componentOptions} type="text" />
  </FormItem>
)

const FormSliderItem = ({
  input,
  options: { itemName, ...componentOptions }
}: {
  input: InputProps,
  options: FormSliderItemOptionsType
}) => (
  <FormItem name={itemName}>
    <Slider {...input} {...componentOptions} />
  </FormItem>
)

const FormRadioGroupItem = ({
  input,
  options: { itemName, ...componentOptions }
}: {
  input: InputProps,
  options: FormRadioGroupItemOptionsType
}) => (
  <FormItem name={itemName}>
    <Form.RadioGroup {...input} {...componentOptions} selected={input.value} />
  </FormItem>
)

const FormCheckboxItem = ({
  fields,
  meta: { error },
  options: { itemName, ...componentOptions },
  formProps
}: FieldArrayProps & { options: FormCheckboxItemOptionsType, formProps: FormProps }) => (
  <FormItem name={itemName}>
    <Form.CheckboxGroup name={fields.name} {...componentOptions} fields={fields} formProps={formProps} />
    {error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)

const FormDropdownItem = ({
  input,
  options: { itemName, ...componentOptions }
}: {
  input: InputProps,
  options: FormDropdownItemOptionsType
}) => (
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

const FormTextareaItem = ({
  input,
  meta: { touched, error },
  options: { itemName }
}: FieldProps & { options: FormTextareaItemOptionsType }) => (
  <FormItem name={itemName}>
    <Form.Textarea {...input} rows={5} />
    {touched && error && <FieldValidationError>{error}</FieldValidationError>}
  </FormItem>
)

// +-----------------+
// |     Helpers     |
// +-----------------+
const FIELD_ARRAY_COMPONENTS = [FormCheckboxItem]

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
const buildFieldArrayInitialValues = (name: string, state: ReduxStateType): [boolean] => {
  const userDataMapper = {
    ethnicity: [state.user.ethnicity, USER_PROPS.ETHNICITY],
    genderPreference: [state.user.genderPreference, USER_PROPS.GENDER],
    relationshipType: [state.user.relationshipType, USER_PROPS.RELATIONSHIP_TYPE],
    ethnicityPreference: [state.user.ethnicityPreference, USER_PROPS.ETHNICITY],
    yearPreference: [state.user.yearPreference, USER_PROPS.YEAR],
    collegePreference: [state.user.collegePreference, USER_PROPS.COLLEGE]
  }

  const selectedOptions = userDataMapper[name][0]
  const allOptions = userDataMapper[name][1]
  return allOptions.map(value => selectedOptions.indexOf(value) >= 0)
}

// eslint-disable-next-line arrow-body-style
const createFormInitialValues = (state: ReduxStateType): { [string]: string } => {
  const questionsValues = {}
  state.user.answers.forEach(entry => {
    questionsValues[entry.question] = entry.answer
  })

  const initialValues = {
    // Basic Page
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    age: state.user.age,
    year: state.user.year.toString(),
    gender: state.user.gender,
    major: state.user.major,
    college: state.user.college,
    height: state.user.height,
    ethnicity: buildFieldArrayInitialValues('ethnicity', state),

    // Personal Page
    bio: state.user.bio,
    questions: questionsValues,

    // Preference Page
    genderPreference: buildFieldArrayInitialValues('genderPreference', state),
    agePreference: state.user.agePreference
      ? [state.user.agePreference.min, state.user.agePreference.max]
      : [USER_PROPS.MIN_AGE, USER_PROPS.MAX_AGE],
    relationshipType: buildFieldArrayInitialValues('relationshipType', state),
    ethnicityPreference: buildFieldArrayInitialValues('ethnicityPreference', state),
    yearPreference: buildFieldArrayInitialValues('yearPreference', state),
    collegePreference: buildFieldArrayInitialValues('collegePreference', state),
    heightPreference: state.user.heightPreference
      ? [state.user.heightPreference.min, state.user.heightPreference.max]
      : [],

    // Contact Page
    phone: state.user.phone,
    receiveTexts: state.user.receiveTexts,
    instagram: state.user.instagram,
    snapchat: state.user.snapchat
  }

  return initialValues
}

// eslint-disable-next-line
const buildSubmitFieldArray = (name: string, user) => {
  const userDataMapper = userDataMapperCreator(user)
  const [selectedOptions, allOptions] = userDataMapper[name]
  return allOptions.filter((value, index) => selectedOptions[index] === true)
}

const createSubmitData = (editedUser: UserType, formValue: FormValueType): UserType => {
  const answersValues = editedUser.answers
  answersValues.forEach(faq => {
    faq.answer = formValue.questions[faq.question]
  })

  const submitValues = {
    // Basic Page
    firstName: formValue.firstName,
    lastName: formValue.lastName,
    age: formValue.age,
    year: Number(formValue.year),
    gender: formValue.gender,
    major: formValue.major,
    college: formValue.college,
    height: formValue.height,
    ethnicity: buildSubmitFieldArray('ethnicity', formValue),

    // Personal Page
    bio: formValue.bio,
    questions: answersValues,

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

  Object.keys(editedUser).forEach(field => {
    // eslint-disable-next-line
    if (submitValues[field] != undefined) {
      editedUser[field] = submitValues[field]
    }
  })
  return editedUser
}

// -------------------
// |   Validators    |
// -------------------
// eslint-disable-next-line eqeqeq
const requiredValue = value => (value == undefined || value.length === 0 ? 'This field cannot be empty.' : undefined)

const requiredValueArray = value =>
  value.filter(v => v === true).length === 0 ? 'You must select at least one item.' : undefined

// eslint-disable-next-line eqeqeq
const phoneNumberFormat = value => (value == undefined || !/^\d{10}$/.test(value) ? 'Invalid phone number.' : undefined)

// +-----------------+
// |    Basic Form   |
// +-----------------+
let ProfileEditFormBasicPage = (props: FormProps): React.Element<*> => {
  const { handleSubmit } = props

  const firstNameField: { options: FormTextInputItemOptionsType } = {
    fieldName: 'firstName',
    component: FormTextInputItem,
    options: {
      itemName: 'First Name',
      placeholder: 'Joe'
    }
  }
  const lastNameField: { options: FormTextInputItemOptionsType } = {
    fieldName: 'lastName',
    component: FormTextInputItem,
    options: {
      itemName: 'Last Name',
      placeholder: 'Bruin'
    }
  }
  const ageField: { options: FormSliderItemOptionsType } = {
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
  const yearField: { options: FormRadioGroupItemOptionsType } = {
    fieldName: 'year',
    component: FormRadioGroupItem,
    options: {
      itemName: 'Year',
      options: USER_PROPS.YEAR.map(y => ({ id: String(y), text: formatUserYear(y) }))
    }
  }
  const genderField: { options: FormRadioGroupItemOptionsType } = {
    fieldName: 'gender',
    component: FormRadioGroupItem,
    options: {
      itemName: 'Gender',
      options: USER_PROPS.GENDER.map(g => ({ id: g, text: formatGender(g) }))
    }
  }

  const majorField: { options: FormDropdownItemOptionsType } = {
    fieldName: 'major',
    component: FormDropdownItem,
    options: {
      itemName: 'Major',
      items: USER_PROPS.MAJOR.map(c => new DropdownItem(c, c)),
      placeholder: USER_PROPS.MAJOR[0]
    }
  }
  const collegeField: { options: FormDropdownItemOptionsType } = {
    fieldName: 'college',
    component: FormDropdownItem,
    options: {
      itemName: 'College',
      items: USER_PROPS.COLLEGE.map(c => new DropdownItem(c, c)),
      placeholder: USER_PROPS.COLLEGE[0]
    }
  }
  const heightField: { options: FormSliderItemOptionsType } = {
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
  const ethnicityField: { options: FormCheckboxItemOptionsType } = {
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
      {/* TODO: yearField: handle int-string conversion for initial value & onChange */}

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
  (state: ReduxStateType): { [string]: { string: string } } => ({
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
  const genderPreferenceField = {
    fieldName: 'genderPreference',
    component: FormCheckboxItem,
    options: {
      itemName: 'Interested In',
      options: USER_PROPS.GENDER.map(g => ({ id: g, text: formatGender(g) })),
      anyable: true
    },
    validate: requiredValueArray
  }
  const agePreferenceField = {
    fieldName: 'agePreference',
    component: FormSliderItem,
    options: {
      itemName: 'Age Preference',
      min: USER_PROPS.MIN_AGE,
      max: USER_PROPS.MAX_AGE,
      marks: USER_PROPS.AGE_LABELS
    }
  }
  const relationshipTypeField = {
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
  const ethnicityPreferenceField: { options: FormCheckboxItemOptionsType } = {
    fieldName: 'ethnicityPreference',
    component: FormCheckboxItem,
    options: {
      itemName: 'Ethnicity Preference',
      options: USER_PROPS.ETHNICITY.map(e => ({ id: e, text: e })),
      anyable: true
    },
    validate: requiredValueArray
  }

  const yearPreferenceField: { options: FormCheckboxItemOptionsType } = {
    fieldName: 'yearPreference',
    component: FormCheckboxItem,
    options: {
      itemName: 'Class Year Preference',
      options: USER_PROPS.YEAR.map(y => ({ id: String(y), text: formatUserYear(y) })),
      anyable: true
    },
    validate: requiredValueArray
  }

  const collegePreference: { options: FormCheckboxItemOptionsType } = {
    fieldName: 'collegePreference',
    component: FormCheckboxItem,
    options: {
      itemName: 'College Preference',
      options: USER_PROPS.COLLEGE.map(c => ({ id: c, text: c })),
      anyable: true
    },
    validate: requiredValueArray
  }

  const heightPreference: { options: FormSliderItemOptionsType } = {
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
  const instagramField: { options: FormTextInputItemOptionsType } = {
    fieldName: 'instagram',
    component: FormTextInputItem,
    options: {
      itemName: 'Instagram',
      placeholder: 'joeBruin_ig'
    }
  }
  const snapchatField: { options: FormTextInputItemOptionsType } = {
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
    <FormItem required name="Phone Number" key="form">
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

  validateRelationshipTypeField() {
    // HACK: HTML5 does not provide a built-in way to see if a checkbox group
    // has at least one option chosen. Need to manually verify a
    // relationshipType option is selected
    // THIS IS VERY BRITTLE SINCE THE CheckboxGroup COMPONENT IS A DIV AND NOT
    // AN INPUT, REQUIRING THE SYNTAX checkboxes[i].children[0].checked
    // If the internals of CheckboxGroup changes, this will likely break
    if (this.relTypeCheckboxGroup) {
      const checkboxes = Array.from(this.relTypeCheckboxGroup.children)
      let relTypeChosen = false
      for (let i = 0; i < checkboxes.length; i += 1) {
        if (checkboxes[i].children[0].checked) {
          relTypeChosen = true
          break
        }
      }
      this.setState({ relTypeChosen })
    }
  }

  validateGenderPreferenceField() {
    // HACK: See comment for validateRelationshipTypeField
    if (this.genderPreferenceCheckboxGroup) {
      const checkboxes = Array.from(this.genderPreferenceCheckboxGroup.children)
      let genderPreferenceChosen = false
      for (let k = 0; k < checkboxes.length; k += 1) {
        if (checkboxes[k].children[0].checked) {
          genderPreferenceChosen = true
          break
        }
      }
      this.setState({ genderPreferenceChosen })
    }
  }

  isFormValid = (): boolean => {
    if (!this.formElement) return true

    // Check relTypeChosen and genderPreferenceChosen first. This allows us to short-circuit
    // the validation and avoid needlessly iterating through the form in some cases.
    if (!this.state.relTypeChosen || !this.state.genderPreferenceChosen) return false

    for (let i = 0; i < this.formElement.length; i += 1) {
      if (this.formElement[i] && this.formElement[i].validity && this.formElement[i].validity.valid === false) {
        return false
      }
    }
    return true
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

  // eslint-disable-next-line
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
