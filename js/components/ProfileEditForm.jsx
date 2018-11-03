// @flow
// DEVELOPEMENT ONLY ESLINT DISABLES
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Field, FieldArray, reduxForm } from 'redux-form'
import type { FormProps } from 'redux-form'
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

const FormPageWrapper = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
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

const NavigationButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  & > * {
    margin: 5px;
  }
`

const ErrorDisplay = styled.div`
  text-align: center;
  color: ${colors.red};
  margin: 10px 0;
`

const DisclaimerText = Text.extend`
  text-align: center;
  padding-bottom: 10px;
`

type FormPageType = 'basic' | 'personal' | 'preferences' | 'contact'

type PropsType = {
  paginate?: null | 'menu' | 'process',
  requiredFieldsOnly: boolean,
  redirect: string,
  // Props mapped from Redux state
  user: ?UserType,
  editUser: (UserType, () => void) => void
} & FormProps

type StateType = {
  editedUser: ?UserType,
  editComplete: boolean,
  errorMessage: ?string,
  pageIndex: ?number,
  relTypeChosen: boolean,
  genderPreferenceChosen: boolean
}

const toggleArrayValue = <T>(arr: Array<T>, value: T): Array<T> => {
  if (arr.indexOf(value) === -1) {
    return [...arr, value]
  } else {
    return arr.filter(item => item !== value)
  }
}

type FormItemPropsType = {
  required?: boolean,
  name: string,
  children: React.Node
}

const FormItem = (props: FormItemPropsType) => (
  <FormItemWrapper>
    <Form.Label required={props.required}>{props.name}</Form.Label>
    <FormItemChildrenWrapper>{props.children}</FormItemChildrenWrapper>
  </FormItemWrapper>
)

const FormTextInputItem = ({ input, options, name }) => (
  <FormItem name={options.itemName} key={options.itemKey}>
    <Form.TextInput required {...input} name={name} placeholder={options.placeholder} type="text" />
  </FormItem>
)

const FormSliderItem = ({ input, options }) => (
  <FormItem name={options.itemName} key={options.itemKey}>
    <Slider
      {...input}
      min={options.valueMin}
      max={options.valueMax}
      marks={options.valueLabels}
      formatter={options.valueFormatter}
      showLabel
    />
  </FormItem>
)

const FormRadioGroupItem = ({ input, options }) => (
  <FormItem required name={options.itemName} key={options.itemKey}>
    <Form.RadioGroup required {...input} options={options.radioGroupOptions} selected={input.value} />
  </FormItem>
)

const FormCheckboxItem = ({ fields, options }) => (
  <FormItem name={options.itemName} key={options.itemKey}>
    <Form.CheckboxGroup anyable name={fields.name} options={options.checkboxGroupOptions} />
  </FormItem>
)

const FormDropdownItem = ({ input, options, name }) => (
  <FormItem name={options.itemName} key={options.itemKey}>
    <Dropdown
      {...input}
      name={name}
      items={options.dropdownItems}
      selectedItem={new DropdownItem(input.value, input.value)}
      placeholder={options.placeholder}
      onChange={(dropdownName, newItem) => {
        input.onChange(newItem.text)
      }}
    />
  </FormItem>
)

const FormTextareaItem = ({ input, options, name }) => (
  <FormItem required name={options.question}>
    <Form.Textarea required {...input} name={name} rows={5} />
  </FormItem>
)

// +-----------------+
// |    Basic Form   |
// +-----------------+
// eslint-disable-next-line arrow-body-style
const createBasicFormInitialValues = (state: ReduxStateType): { [string]: string } => {
  const initialValues = {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    age: state.user.age,
    year: state.user.year.toString(),
    gender: state.user.gender,
    major: state.user.major,
    college: state.user.college,
    height: state.user.height,
    ethnicity: USER_PROPS.ETHNICITY.map(value => state.user.ethnicity.indexOf(value) >= 0)
  }

  state.user.answers.forEach(entry => {
    initialValues[entry.question] = entry.answer
  })

  return initialValues
}

let ProfileEditFormBasicPage = (props: FormProps): React.Element<*> => {
  const { handleSubmit } = props

  const firstNameOptions = {
    itemName: 'First Name',
    itemKey: 'first',
    placeholder: 'Joe'
  }
  const lastNameOptions = {
    itemName: 'Last Name',
    itemKey: 'last',
    placeholder: 'Bruin'
  }
  const ageOptions = {
    itemName: 'Age',
    itemKey: 'age',
    valueMin: USER_PROPS.MIN_AGE,
    valueMax: USER_PROPS.MAX_AGE,
    valueLabels: USER_PROPS.AGE_LABELS,
    valueFormatter: (n: ?number) => String(n)
  }
  const yearOptions = {
    itemName: 'Year',
    itemKey: 'year',
    radioGroupOptions: USER_PROPS.YEAR.map(y => ({ id: String(y), text: formatUserYear(y) }))
  }
  const genderOptions = {
    itemName: 'Gender',
    itemKey: 'gender',
    radioGroupOptions: USER_PROPS.GENDER.map(g => ({ id: g, text: formatGender(g) }))
  }

  const majorOptions = {
    itemName: 'Major',
    itemKey: 'major',
    dropdownItems: USER_PROPS.MAJOR.map(c => new DropdownItem(c, c)),
    placeholder: USER_PROPS.MAJOR[0]
  }
  const collegeOptions = {
    itemName: 'College',
    itemKey: 'college',
    dropdownItems: USER_PROPS.COLLEGE.map(c => new DropdownItem(c, c)),
    placeholder: USER_PROPS.COLLEGE[0]
  }
  const heightOptions = {
    itemName: 'Height',
    itemKey: 'height',
    valueMin: USER_PROPS.MIN_HEIGHT,
    valueMax: USER_PROPS.MAX_HEIGHT,
    valueLabels: USER_PROPS.HEIGHT_LABELS,
    valueFormatter: (n: ?number) => (n ? formatHeight(n) : '')
  }
  const ethnicityOptions = {
    itemName: 'Ethnicity',
    itemKey: 'ethnicity',
    checkboxGroupOptions: USER_PROPS.ETHNICITY.map(e => ({ id: e, text: e }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field name="firstName" options={firstNameOptions} component={FormTextInputItem} />
      <Field name="lastName" options={lastNameOptions} component={FormTextInputItem} />
      <Field name="age" options={ageOptions} component={FormSliderItem} />
      {/* TODO: handle int-string conversion for initial value & onChange */}
      <Field name="year" options={yearOptions} component={FormRadioGroupItem} />
      <Field name="gender" options={genderOptions} component={FormRadioGroupItem} />

      {/* Non-required fields */}
      <DropdownWrapper>
        <Field name="major" options={majorOptions} component={FormDropdownItem} />
        <Field name="college" options={collegeOptions} component={FormDropdownItem} />
      </DropdownWrapper>
      <Field name="height" options={heightOptions} component={FormSliderItem} />
      <FieldArray name="ethnicity" options={ethnicityOptions} component={FormCheckboxItem} />

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
    initialValues: createBasicFormInitialValues(state)
  }),
  {}
)(ProfileEditFormBasicPage)

// +-----------------+
// |  Personal Form  |
// +-----------------+
// eslint-disable-next-line arrow-body-style
const createPersonalFormInitialValues = (state: ReduxStateType): { [string]: string } => {
  const initialValues = {}
  state.user.answers.forEach(entry => {
    initialValues[entry.question] = entry.answer
  })
  return initialValues
}

let ProfileEditFormPersonalPage = (props: FormProps): React.Element<*> => {
  const { handleSubmit } = props

  const bioOptions = { name: 'bio', question: 'Bio' }
  const questionsOptions = []
  Object.entries(USER_PROPS.QUESTIONS).forEach(entry => {
    questionsOptions.push({ name: entry[0], question: entry[1] })
  })
  let fieldOptions = []
  fieldOptions.push(bioOptions)
  fieldOptions = fieldOptions.concat(questionsOptions)

  console.log(fieldOptions)

  return (
    <form onSubmit={handleSubmit}>
      {fieldOptions.map(option => (
        <Field key={option.name} name={option.name} options={option} component={FormTextareaItem} />
      ))}

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

// +-----------------+
// |   Contact Form  |
// +-----------------+

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
      pageIndex: props.paginate ? 0 : null,
      relTypeChosen: Boolean(props.user && props.user.relationshipType && props.user.relationshipType.length > 0),
      genderPreferenceChosen: Boolean(
        props.user && props.user.genderPreference && props.user.genderPreference.length > 0
      )
    }
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  componentWillReceiveProps(nextProps: PropsType) {
    // Component is about to receive the user object for the first time
    if (!this.props.user && nextProps.user) {
      this.setState({
        editedUser: nextProps.user,
        relTypeChosen: nextProps.user.relationshipType && nextProps.user.relationshipType.length > 0,
        genderPreferenceChosen: nextProps.user.genderPreference && nextProps.user.genderPreference.length > 0
      })
    }

    // Component will receive a profile picture update (most likely because the
    // user changed it via the UserImage component on this form
    if (this.props.user.profilePic !== nextProps.user.profilePic) {
      this.updateUser({ profilePic: nextProps.user.profilePic })
    }
  }

  // Essentially a setState() wrapper for the editedUser portion of state
  // eslint-disable-next-line flowtype/no-weak-types
  updateUser = (obj: Object, callback: ?() => void) => {
    if (callback) {
      this.setState({ editedUser: { ...this.state.editedUser, ...obj } }, callback)
    } else {
      this.setState({ editedUser: { ...this.state.editedUser, ...obj } })
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

  handleToggleAny = (allSelected, name) => {
    const allOptions = {
      ethnicityPreference: USER_PROPS.ETHNICITY,
      yearPreference: USER_PROPS.YEAR,
      relationshipType: USER_PROPS.RELATIONSHIP_TYPE,
      genderPreference: USER_PROPS.GENDER,
      collegePreference: USER_PROPS.COLLEGE
    }[name]

    if (allOptions) {
      let cb = null
      if (name === 'genderPreference') {
        cb = this.validateGenderPreferenceField
      }

      if (name === 'relationshipType') {
        cb = this.validateRelationshipTypeField
      }

      this.updateUser({ [name]: allSelected ? [] : allOptions }, cb)
    }
  }

  // For all fields controlled with a Form component (e.g. TextInput, Textarea,
  // etc.), this handler will suffice
  handleValueChange(event: SyntheticInputEvent<*>) {
    const { editedUser } = this.state
    if (!editedUser) return
    const { name, value } = event.target

    if (name === 'relationshipType') {
      this.validateRelationshipTypeField()
    }

    if (name === 'genderPreference') {
      this.validateGenderPreferenceField()
    }

    const oldKey = editedUser[name]
    switch (name) {
      // Text input numeric fields
      case 'year':
        this.updateUser({ [name]: Number(value) })
        break

      // Checkbox-as-boolean fields
      case 'receiveTexts':
        this.updateUser({ [name]: !oldKey })
        break

      // Checkbox numeric fields
      case 'yearPreference':
        if (oldKey) {
          this.updateUser({ [name]: toggleArrayValue(oldKey.map(Number), Number(value)) })
        }
        break

      // Checkbox string fields
      case 'ethnicity':
      case 'ethnicityPreference':
      case 'relationshipType':
      case 'genderPreference':
      case 'collegePreference':
        if (oldKey) {
          this.updateUser({ [name]: toggleArrayValue(oldKey, value) })
        }
        break

      case 'first':
      case 'last':
        if (this.state.editedUser) {
          this.setState({
            editedUser: {
              ...this.state.editedUser,
              name: {
                ...this.state.editedUser.name,
                [name]: value
              }
            }
          })
        }

        break

      // Remaining fields work fine with direct value assignment
      case 'bio':
      case 'gender':
      case 'instagram':
      case 'major':
      case 'phone':
      case 'snapchat':
        this.updateUser({ [name]: value })
        break

      default:
        // eslint-disable-next-line no-console
        console.warn(`Unexpected field name: ${name}`)
        break
    }
  }

  // Fields that use the non-Form components need to handle their change events
  // separately since the handler argument is not a SyntheticInputEvent<*>
  handleAgeChange = (value: ?number) => {
    this.updateUser({ age: value })
  }

  handleHeightChange = (value: ?number) => {
    this.updateUser({ height: value })
  }

  handleAgePreferenceChange = (values: Array<number>) => {
    this.updateUser({ agePreference: { min: values[0], max: values[1] } })
  }

  handleHeightPreferenceChange = (values: Array<number>) => {
    this.updateUser({ heightPreference: { min: values[0], max: values[1] } })
  }

  handleQuestionValueChange = (event: SyntheticInputEvent<*>) => {
    const { editedUser } = this.state
    if (!editedUser) return

    const { answers } = editedUser
    if (!answers) return

    const { name, value } = event.target

    const editedAnswers = answers.filter(item => item.question !== name)
    if (value !== '') {
      editedAnswers.push({
        question: name,
        answer: value
      })
    }

    this.updateUser({ answers: editedAnswers })
  }

  handleDropdownChange = (name: string, selectedItem: OptionType) => {
    const { editedUser } = this.state
    if (!editedUser || !(name in editedUser)) return

    if (!selectedItem) return
    this.updateUser({ [name]: selectedItem.text })
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

  submit = () => {
    const { editedUser } = this.state
    if (this.isFormValid() && editedUser) {
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

  getPersonalFormItems(): Array<React.Element<*>> {
    const { editedUser } = this.state
    if (!editedUser) {
      return []
    }

    const items = [
      <FormItem required name="Bio" key="bio">
        <Form.Textarea required name="bio" rows={5} value={editedUser.bio || ''} onChange={this.handleValueChange} />
      </FormItem>
    ]

    Object.keys(USER_PROPS.QUESTIONS).forEach(qitem => {
      const question = USER_PROPS.QUESTIONS[qitem]
      const answerObject = editedUser.answers.find(aqPair => aqPair.question === qitem)
      items.push(
        <FormItem required name={question} key={qitem}>
          <Form.Textarea
            required
            name={qitem}
            rows={5}
            value={answerObject ? answerObject.answer : ''}
            onChange={this.handleQuestionValueChange}
          />
        </FormItem>
      )
    })

    return items
  }

  getPreferencesFormItems(): Array<React.Element<*>> {
    const { requiredFieldsOnly } = this.props
    const { editedUser } = this.state

    if (!editedUser) {
      return []
    }

    const items = [
      <FormItem required name="Interested In" key="genderPreference">
        <Form.CheckboxGroup
          anyable
          name="genderPreference"
          options={USER_PROPS.GENDER.map(g => ({ id: g, text: formatGender(g) }))}
          innerRef={(c: HTMLElement) => {
            this.genderPreferenceCheckboxGroup = c
          }}
          selectedOptions={editedUser ? editedUser.genderPreference : []}
          onChange={this.handleValueChange}
          onToggleAny={this.handleToggleAny}
        />
      </FormItem>,
      <FormItem required name="Age Preference" key="agePreference">
        <Slider
          min={USER_PROPS.MIN_AGE}
          max={USER_PROPS.MAX_AGE}
          marks={USER_PROPS.AGE_LABELS}
          value={
            editedUser.agePreference
              ? [editedUser.agePreference.min, editedUser.agePreference.max]
              : [USER_PROPS.MIN_AGE, USER_PROPS.MAX_AGE]
          }
          showLabel
          noneLabel="any"
          onChange={this.handleAgePreferenceChange}
        />
      </FormItem>,
      <FormItem required name="Looking for" key="relationshipType">
        <Form.CheckboxGroup
          anyable
          name="relationshipType"
          innerRef={(c: HTMLElement) => {
            this.relTypeCheckboxGroup = c
          }}
          options={USER_PROPS.RELATIONSHIP_TYPE.map(r => ({ id: r, text: formatRelationshipType(r) }))}
          selectedOptions={editedUser.relationshipType ? editedUser.relationshipType.map(String) : []}
          onChange={this.handleValueChange}
          onToggleAny={this.handleToggleAny}
        />
      </FormItem>
    ]

    if (!requiredFieldsOnly) {
      const nonReqItems = [
        <FormItem name="Ethnicity Preference" key="ethnicityPreference">
          <Form.CheckboxGroup
            anyable
            name="ethnicityPreference"
            options={USER_PROPS.ETHNICITY.map(e => ({ id: e, text: e }))}
            selectedOptions={editedUser.ethnicityPreference ? editedUser.ethnicityPreference.map(String) : []}
            onChange={this.handleValueChange}
            onToggleAny={this.handleToggleAny}
          />
        </FormItem>,
        <FormItem name="Class Year Preference" key="yearPreference">
          <Form.CheckboxGroup
            anyable
            name="yearPreference"
            options={USER_PROPS.YEAR.map(y => ({ id: String(y), text: formatUserYear(y) }))}
            selectedOptions={editedUser.yearPreference ? editedUser.yearPreference.map(String) : []}
            onChange={this.handleValueChange}
            onToggleAny={this.handleToggleAny}
          />
        </FormItem>,
        <FormItem name="College Preference" key="collegePreference">
          <Form.CheckboxGroup
            anyable
            name="collegePreference"
            options={USER_PROPS.COLLEGE.map(c => ({ id: c, text: c }))}
            selectedOptions={editedUser.collegePreference ? editedUser.collegePreference.map(String) : []}
            onChange={this.handleValueChange}
            onToggleAny={this.handleToggleAny}
          />
        </FormItem>,
        <FormItem name="Height Preference" key="heightPreference">
          <Slider
            min={USER_PROPS.MIN_HEIGHT}
            max={USER_PROPS.MAX_HEIGHT}
            value={
              editedUser.heightPreference ? [editedUser.heightPreference.min, editedUser.heightPreference.max] : []
            }
            marks={USER_PROPS.HEIGHT_LABELS}
            formatter={(n: ?number) => (n ? formatHeight(n) : '')}
            showLabel
            noneLabel="any"
            onChange={this.handleHeightPreferenceChange}
          />
        </FormItem>
      ]
      nonReqItems.forEach(item => items.push(item))
    }

    return items
  }

  getContactFormItems(): Array<React.Element<*>> {
    const { requiredFieldsOnly } = this.props
    const { editedUser } = this.state

    if (!editedUser) {
      return []
    }

    const items = [
      <DisclaimerText key="0">
        No worries! Your contact information will not be shared until you and your match like each other
      </DisclaimerText>,
      <FormItem required name="Phone Number" key="phone">
        <Form.TextInput
          required
          type="text"
          name="phone"
          pattern="^\d{10}$"
          placeholder="5551239876"
          value={editedUser.phone || ''}
          onChange={this.handleValueChange}
        />
        <div>
          <Form.CheckboxInput
            name="receiveTexts"
            value={{ id: 'receiveTexts', text: 'Receive text notifications' }}
            checked={editedUser.receiveTexts}
            onChange={this.handleValueChange}
          />
          <Text>
            {
              'You will always receive an email when you get a new match but you can also choose to be notified via a text message.'
            }
          </Text>
        </div>
      </FormItem>
    ]

    if (!requiredFieldsOnly) {
      const nonReqItems = [
        <FormItem name="Instagram" key="instagram">
          <Form.TextInput
            type="text"
            name="instagram"
            placeholder="joeBruin_ig"
            value={editedUser.instagram || ''}
            onChange={this.handleValueChange}
          />
        </FormItem>,
        <FormItem name="Snapchat" key="snapchat">
          <Form.TextInput
            type="text"
            name="snapchat"
            placeholder="joeBruin_snap"
            value={editedUser.snapchat || ''}
            onChange={this.handleValueChange}
          />
        </FormItem>
      ]
      nonReqItems.forEach(item => items.push(item))
    }

    return items
  }

  getPageItems(): Array<React.Element<*>> {
    const { pageIndex } = this.state
    const page = pageIndex != null ? this.PAGES[pageIndex] : null
    return page
      ? {
          basic: this.getBasicFormItems(),
          preferences: this.getPreferencesFormItems(),
          personal: this.getPersonalFormItems(),
          contact: this.getContactFormItems()
        }[page]
      : []
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

  renderNextButton(): React.Element<*> {
    return (
      <Button primary onClick={this.nextPage}>
        Next
      </Button>
    )
  }

  renderPreviousButton(): React.Element<*> {
    return (
      <Button primary onClick={this.previousPage}>
        Previous
      </Button>
    )
  }

  renderSubmitButton(isFormValid: boolean): React.Element<*> {
    return (
      <Button primary disabled={!isFormValid} onClick={this.submit}>
        Save
      </Button>
    )
  }

  renderNavButtons(isFormValid: boolean): React.Node {
    const { paginate } = this.props
    if (paginate === 'process') {
      const { pageIndex } = this.state
      const page = pageIndex != null ? this.PAGES[pageIndex] : null
      return page
        ? {
            basic: this.renderNextButton(),
            preferences: [
              React.cloneElement(this.renderPreviousButton(), { key: 'previous' }),
              React.cloneElement(this.renderNextButton(), { key: 'next' })
            ],
            contact: [
              React.cloneElement(this.renderPreviousButton(), { key: 'previous' }),
              React.cloneElement(this.renderNextButton(), { key: 'next' })
            ],
            personal: [
              React.cloneElement(this.renderPreviousButton(), { key: 'previous' }),
              React.cloneElement(this.renderSubmitButton(isFormValid), { key: 'submit' })
            ]
          }[page]
        : []
    } else {
      return this.renderSubmitButton(isFormValid)
    }
  }

  renderPageMenu(): React.Node {
    const { pageIndex } = this.state
    const page = pageIndex != null ? this.PAGES[pageIndex] : null
    const labels = ['Basic', 'Preferences', 'Contact', 'Personal']

    const renderPageButton = (p: *) => (
      <PageButton active={page === p.toLowerCase()} key={p} onClick={() => this.selectPage(p.toLowerCase())}>
        {p}
      </PageButton>
    )

    return <PageMenu>{labels.map(renderPageButton)}</PageMenu>
  }

  render(): ?React.Element<*> {
    const { redirect, paginate } = this.props
    const { editedUser, editComplete, errorMessage, pageIndex } = this.state
    const page = pageIndex != null ? this.PAGES[pageIndex] : null
    const isFormValid = this.isFormValid()

    if (editComplete) return <Redirect push to={redirect} />

    if (pageIndex === 0) {
      return (
        <ProfileEditFormBasicPage
          onSubmit={values => {
            console.log(values)
            this.nextPage()
          }}
        />
      )
    }

    if (pageIndex === 1) {
      return (
        <ProfileEditFormPersonalPage
          onSubmit={values => {
            console.log(values)
            this.nextPage()
          }}
        />
      )
    }

    return null

    // return editedUser ? (
    //   <FormWrapper>
    //     <form
    //       ref={(form: ?HTMLFormElement) => {
    //         this.formElement = form
    //       }}
    //     >
    //       {paginate === 'process' && <Subtitle>{this.getPageMessage()}</Subtitle>}
    //       {paginate === 'menu' && this.renderPageMenu()}

    //       {/*
    //         Rendering all form items at all times but using an an `active` prop
    //         to display only the page that user is on. This is preferred over
    //         conditional rendering since that would make form items on inactive
    //         pages inaccessible for validation using this.isFormValid().
    //       */}
    //       <FormPageWrapper active={!paginate || page === 'basic'}></FormPageWrapper>
    //       <FormPageWrapper active={!paginate || page === 'personal'}>{this.getPersonalFormItems()}</FormPageWrapper>
    //       <FormPageWrapper active={!paginate || page === 'preferences'}>
    //         {this.getPreferencesFormItems()}
    //       </FormPageWrapper>
    //       <FormPageWrapper active={!paginate || page === 'contact'}>{this.getContactFormItems()}</FormPageWrapper>
    //     </form>

    //     {// If the form has invalid data supplied and user is on final page, display that error
    //     (!isFormValid &&
    //       page === 'personal' && (
    //         <ErrorDisplay>Uh oh... you either left out a required field or entered an invalid value.</ErrorDisplay>
    //       )) ||
    //       // Otherwise, if there's some error (probably with the POST request), display that error
    //       (errorMessage && <ErrorDisplay>{errorMessage}</ErrorDisplay>)}

    //     <NavigationButtons>{this.renderNavButtons(isFormValid)}</NavigationButtons>
    //   </FormWrapper>
    // ) : null
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user
})

export default connect(mapStateToProps, actions)(ProfileEditForm)
