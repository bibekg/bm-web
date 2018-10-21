// @flow
/* eslint-disable no-underscore-dangle */

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import swal from 'sweetalert'
import { Subtitle, Text } from 'components/typography'
import Button from 'components/Button'
import Modal from 'components/Modal'
import * as Form from 'components/form'
import SecureUserImage from 'components/SecureUserImage'
import * as actions from 'actions'
import { copy } from 'product-copy'

const FeedbackCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding-bottom: 30px;
`

const FormWrapper = styled.div`
  padding: 0 5%;
  display: block;
  justify-content: left;
  text-align: left;
`

const FormItemWrapper = styled.div`
  margin: 10px 20px 0;
`

const CommentsTextarea = styled(Form.Textarea)`
  margin-bottom: 20px;
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

const FEEDBACK_OPTIONS = [
  { id: 'lack-detail', text: 'Profile not detailed enough' },
  { id: 'unclear-image', text: 'Image not clear enough' },
  { id: 'unmet-prefs', text: "They didn't fit my preferences" },
  { id: 'other', text: 'Other' }
]

type PropsType = {
  user: UserType,
  match: MatchType,
  onOutClick: () => void,
  submitDislikeMatchFeedback: (DislikeMatchFeedbackType, ReduxCallbackType<*>) => void
}

type StateType = {
  feedback: Array<DislikeReasonsType>,
  comments: string
}

const toggleArrayValue = <T>(arr: Array<T>, value: T): Array<T> => {
  if (arr.indexOf(value) === -1) {
    return [...arr, value]
  } else {
    return arr.filter(item => item !== value)
  }
}

class DislikeMatchFeedbackModal extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      feedback: [],
      comments: ''
    }
  }

  handleChange = (event: SyntheticInputEvent<*>) => {
    const { name, value } = event.target

    if (name === 'feedback') {
      this.setState(prevState => ({
        feedback: toggleArrayValue(prevState.feedback, value)
      }))
    } else if (name === 'comments') {
      // If user types something in the textbox for the first time, auto check the "Other" checkbox
      // Or, if user deleted everything from the textbox, uncheck "Other"
      if (
        (this.state.comments === '' && this.state.feedback.indexOf('other') === -1) ||
        (value === '' && this.state.feedback.indexOf('other') !== -1)
      ) {
        this.setState(prevState => ({
          feedback: toggleArrayValue(prevState.feedback, 'other')
        }))
      }

      // Now actually set the new state
      this.setState({
        comments: event.target.value
      })
    }
  }

  isFormValid(): boolean {
    // if "Other" is the only checked checkbox and there's nothing in the box, the form isn't valid
    if (this.state.feedback.indexOf('other') !== -1) {
      if (this.state.feedback.length === 1 && this.state.comments.length === 0) {
        return false
      }
    }
    // Otherwise just check if anything is checked
    return this.state.feedback.length !== 0
  }

  submit = () => {
    let dislikeReasons = this.state.feedback
    if (this.state.comments.length === 0) {
      // if comment length is zero and the "other" checkbox is checked, remove it from list
      dislikeReasons = dislikeReasons.filter(item => item !== 'other')
    }

    const params: DislikeMatchFeedbackType = {
      // eslint-disable-next-line no-underscore-dangle
      matchId: this.props.match._id,
      dislikeReasons,
      dislikeComments: this.state.comments.length === 0 ? undefined : this.state.comments
    }

    this.props.submitDislikeMatchFeedback(params, error => {
      if (error) {
        swal({
          title: 'Error',
          text: 'Something went wrong on our end. Sorry!',
          icon: 'error'
        }).then(click => {
          if (click) {
            swal.close()
          }
        })
      } else {
        swal({
          text: 'Thanks for the feedback!',
          icon: 'success'
        }).then(click => {
          if (click) {
            swal.close()
          }
        })
      }
    })

    // Close the modal (MatchActionControl will handle any other changes)
    this.props.onOutClick()
  }

  render(): React.Element<*> {
    return (
      <Modal onOutClick={this.props.onOutClick}>
        <FeedbackCardWrapper>
          <Subtitle>{copy.dislike_match.apology}</Subtitle>
          <SecureUserImage size={100} userId={this.props.match.participants.match.user._id} />
          <Text>{copy.dislike_match.feedback}</Text>

          <FormWrapper>
            <FormItem name="Options">
              <Form.CheckboxGroup
                name="feedback"
                options={FEEDBACK_OPTIONS}
                selectedOptions={this.state.feedback}
                onChange={this.handleChange}
              />
            </FormItem>
            <CommentsTextarea
              name="comments"
              value={this.state.comments}
              onChange={this.handleChange}
              placeholder="Type any other feedback you have here!"
            />
          </FormWrapper>

          <Text>{copy.dislike_match.response}</Text>
          <Button primary disabled={!this.isFormValid()} onClick={this.submit}>
            Submit
          </Button>
        </FeedbackCardWrapper>
      </Modal>
    )
  }
}

export default connect(() => ({}), actions)(DislikeMatchFeedbackModal)
