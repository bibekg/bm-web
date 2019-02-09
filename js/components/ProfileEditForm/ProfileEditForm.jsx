// @flow
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { isValid } from 'redux-form'
import type { FormProps } from 'redux-form'
import { Subtitle } from 'components/typography'
import * as actions from 'actions'
import { colors, breakpoints } from 'styles'

import ProfileEditFormBasicPage from './BasicForm'
import ProfileEditFormPersonalPage from './PersonalForm'
import ProfileEditFormPreferencePage from './PreferenceForm'
import ProfileEditFormContactPage from './ContactForm'
import { createSubmitData } from './FormHelpers'
import { ButtonWrapper, NavButton } from '../form/ReduxFormItems'

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

const PageMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  @media (max-width: ${breakpoints.navFold - 1}px) {
    margin-top: 20px;
  }
`

/* eslint-disable no-nested-ternary */
const PageButton = styled.div`
  color: ${props => (props.active ? (props.valid ? colors.blue : colors.red) : colors.grey)};
  font-weight: ${props => (props.active ? 600 : 300)};
  margin-left: 20px;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
    ${props =>
      props.valid &&
      `
      font-weight: 600;
    `};
  }

  @media (max-width: ${breakpoints.navFold - 1}px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`
/* eslint-enable no-nested-ternary */

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
    const editedUserUpdated = createSubmitData(editedUser, formValue)

    if (editedUserUpdated) {
      this.props
        .editUser(editedUserUpdated)
        .then(() => {
          this.setState({ editedUser: editedUserUpdated, editComplete: true })
        })
        .catch(err => {
          if (err.name === 'InvalidValues') {
            this.setState({ errorMessage: `Uh oh! You entered an invalid value for: ${err.invalidValues.join(', ')}` })
          } else {
            this.setState({ errorMessage: 'Unknown server error.' })
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
          personal: 'Tell us more about yourself.',
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

  renderPageMenu(isFormValid: boolean): React.Node {
    const { pageIndex } = this.state
    const page = pageIndex != null ? this.PAGES[pageIndex] : null
    const labels = ['Basic', 'Preferences', 'Contact', 'Personal']

    const renderPageButton = (p: string) => (
      <PageButton
        active={page === p.toLowerCase()}
        key={p}
        onClick={() => isFormValid && this.selectPage(p.toLowerCase())}
        valid={isFormValid}
      >
        {p}
      </PageButton>
    )

    return <PageMenu>{labels.map(renderPageButton)}</PageMenu>
  }

  // create the navigation buttons on the bottom of each page
  createNavButtons = (invalid: boolean): React.Node => {
    const { paginate } = this.props
    const { pageIndex } = this.state

    if (paginate === 'menu') {
      return (
        <ButtonWrapper>
          <NavButton primary type="submit" disabled={invalid}>
            Save
          </NavButton>
        </ButtonWrapper>
      )
    } else if (paginate === 'process') {
      const previousButton =
        pageIndex > 0 ? (
          <NavButton primary onClick={this.previousPage}>
            Previous
          </NavButton>
        ) : null
      const nextButton = (
        <NavButton primary type="submit" disabled={invalid}>
          {pageIndex < this.PAGES.length - 1 ? 'Next' : 'Save'}
        </NavButton>
      )
      return (
        <ButtonWrapper>
          {previousButton}
          {nextButton}
        </ButtonWrapper>
      )
    }
    return null
  }

  render(): ?React.Element<*> {
    const { redirect, paginate, isFormValid } = this.props
    const { editComplete, pageIndex } = this.state

    if (editComplete) return <Redirect push to={redirect} />

    const options = {
      requiredFieldsOnly: this.props.requiredFieldsOnly,
      createNavButtons: this.createNavButtons
    }

    const onSubmitNonFinalPage = paginate === 'menu' ? this.submitForm : this.nextPage
    const onSubmitFinalPage = this.submitForm
    const profileEditFormPage = [
      <ProfileEditFormBasicPage onSubmit={onSubmitNonFinalPage} {...options} />,
      <ProfileEditFormPreferencePage previousPage={this.previousPage} onSubmit={onSubmitNonFinalPage} {...options} />,
      <ProfileEditFormContactPage previousPage={this.previousPage} onSubmit={onSubmitNonFinalPage} {...options} />,
      <ProfileEditFormPersonalPage previousPage={this.previousPage} onSubmit={onSubmitFinalPage} {...options} />
    ]

    return (
      <FormWrapper>
        {paginate === 'process' && <Subtitle>{this.getPageMessage()}</Subtitle>}
        {paginate === 'menu' && this.renderPageMenu(isFormValid)}
        {profileEditFormPage[pageIndex]}
      </FormWrapper>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user,
  isFormValid: isValid('profileEdit')(state)
})

export default connect(mapStateToProps, actions)(ProfileEditForm)
