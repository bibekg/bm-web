// @flow
/* global FB */

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import swal from 'sweetalert'
import * as Form from 'components/form'
import { Title, Text } from 'components/typography'
import Modal from 'components/Modal'
import Button from 'components/Button'
import * as actions from 'actions'

const Header = styled.div`
  margin: 20px 0;
  padding: 0 5%;
  text-align: center;
`

const FormWrapper = styled.div`
  padding: 0 5%;
`

const FormItemWrapper = styled.div`
  margin: 10px 20px 0;
`

const SubmitButtonDiv = styled.div`
  margin: 10px;
  text-align: center;
`

type FormItemPropsType = {
  required?: boolean,
  name: string,
  children: React.Node
}

const FormItem = (props: FormItemPropsType) => (
  <FormItemWrapper>
    <Form.Label required={props.required}>{props.name}</Form.Label>
    {props.children}
  </FormItemWrapper>
)

const DEACTIVATE_OPTIONS = [
  { id: 'tempDeactivation', text: 'This is temporary, I will be back' },
  { id: 'matchQuality', text: "Matches weren't good enough" },
  { id: 'notLooking', text: 'I am not looking for a relationship' },
  { id: 'joke', text: 'I joined as a joke' },
  { id: 'frequency', text: "Matches weren't frequent enough" },
  { id: 'foundRelationship', text: 'I found a relationship through BruinMeet' },
  { id: 'other', text: 'Other: ' }
]

type PropsType = {
  user: UserType,
  onOutClick: () => void,
  deactivateUser: (() => void) => void,
  updateAuth: (boolean, ?string, ?string) => void,
  // eslint-disable-next-line flowtype/no-weak-types
  postFeedback: (FeedbackCategoryType, string, ?ReduxCallbackType<*>) => void
}

type StateType = {
  feedback: Array<string>,
  otherFeedback: string,
  deactivationError: ?Error
}

const toggleArrayValue = <T>(arr: Array<T>, value: T): Array<T> => {
  if (arr.indexOf(value) === -1) {
    return [...arr, value]
  } else {
    return arr.filter(item => item !== value)
  }
}

class DeactivateModal extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      feedback: [],
      otherFeedback: '',
      deactivationError: null
    }
  }

  handleValueChange = (event: SyntheticInputEvent<*>) => {
    const { name, value } = event.target

    if (name === 'deactivation') {
      // Checkbox callback
      this.setState(prevState => ({
        feedback: toggleArrayValue(prevState.feedback, value)
      }))
    } else {
      // Other textarea callback

      // If user types something in the textbox for the first time, auto check the "Other" checkbox
      // Or, if user deleted everything from the textbox, uncheck "Other"
      if (
        (this.state.otherFeedback === '' && this.state.feedback.indexOf('other') === -1) ||
        (event.target.value === '' && this.state.feedback.indexOf('other') !== -1)
      ) {
        this.setState(prevState => ({
          feedback: toggleArrayValue(prevState.feedback, 'other')
        }))
      }

      // Now actually set the new state
      this.setState({
        otherFeedback: event.target.value
      })
    }
  }

  handleDeactivation = () => {
    let feedbackArr = this.state.feedback
    // if user filled out the otherfeedback textarea, add it to feedback
    if (this.state.otherFeedback.length !== 0) {
      feedbackArr.push(this.state.otherFeedback)
    } else {
      // if feedback length is zero and the "other" checkbox is checked, pretend it isn't (i.e. remove "other" from list)
      feedbackArr = feedbackArr.filter(item => item !== 'other')
    }

    this.props.postFeedback('deactivation', feedbackArr.join('|'), null)

    this.props.deactivateUser((err?: Error, res?: ServerResponseType) => {
      if (err) {
        this.setState({ deactivationError: new Error('There was a problem deactivating your account') })
      } else if (res && res.data.status === 'success') {
        // Log user out here; this way account will still be deactivated even if e.g. user closes tab
        this.props.updateAuth(false, null, null)
        this.props.clearMatch()
        FB.logout()

        swal({
          title: 'Successfully deactivated account',
          text: `We're sorry to see you go!`,
          icon: 'success'
        }).then(click => {
          if (click) {
            // This will only close the swal notification
            swal.close()
          }
        })
      } else {
        this.setState({ deactivationError: new Error('There was a problem deactivating your account') })
      }
    })
  }

  renderForm(): React.Element<*> {
    return (
      <FormWrapper>
        <FormItem required name="Reason for Leaving">
          <Form.CheckboxGroup
            name="deactivation"
            options={DEACTIVATE_OPTIONS}
            selectedOptions={this.state.feedback}
            onChange={this.handleValueChange}
          />
        </FormItem>
        <Form.Textarea
          value={this.state.otherFeedback}
          onChange={this.handleValueChange}
          placeholder="Type any other feedback you have here!"
        />
      </FormWrapper>
    )
  }

  isFormValid(): boolean {
    // if "Other" is the only checked checkbox and there's nothing in the box, the form isn't valid
    if (this.state.feedback.indexOf('other') !== -1) {
      if (this.state.feedback.length === 1 && this.state.otherFeedback.length === 0) {
        return false
      }
    }

    return this.state.feedback.length !== 0
  }

  render(): ?React.Element<*> {
    const isFormValid = this.isFormValid()
    return (
      <Modal onOutClick={this.props.onOutClick}>
        <Header>
          <Title>Is this goodbye?</Title>
          <Text>Deactivating your account will disable your profile and remove you from the match pool!</Text>
        </Header>
        {this.renderForm()}
        <SubmitButtonDiv>
          <Button primary disabled={!isFormValid} onClick={this.handleDeactivation}>
            Deactivate
          </Button>
        </SubmitButtonDiv>
      </Modal>
    )
  }
}

export default connect(() => ({}), {
  deactivateUser: actions.deactivateUser,
  updateAuth: actions.updateAuth,
  clearMatch: actions.clearMatch,
  postFeedback: actions.postFeedback
})(DeactivateModal)
