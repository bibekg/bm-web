// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ModernRadioGroup from 'components/ModernRadioGroup'
import { Subtitle, Text } from 'components/typography'
import Button from 'components/Button'
import Modal from 'components/Modal'
import * as Form from 'components/form'
import SecureUserImage from 'components/SecureUserImage'
import * as actions from 'actions'
import { colors } from 'styles'
import { copy } from 'product-copy'

const FeedbackCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`

const CommentsTextarea = styled(Form.Textarea)`
  max-width: 400px;
`

type PropsType = {
  user: UserType,
  match: MatchType,
  submitMatchFeedback: (MatchFeedbackType, ReduxCallbackType<*>) => void
}

type StateType = {
  contacted: ?boolean,
  met: ?boolean,
  satisfaction: ?MatchSatisfactionType,
  comments: ?string,
  status: 'pending' | 'missing' | 'failed'
}

const CONTACTED_MATCH_OPTIONS = [{ id: true, text: 'Yes' }, { id: false, text: 'No' }]

const MET_MATCH_OPTIONS = [{ id: true, text: 'Yes' }, { id: false, text: 'No' }]

const SATISFACTION_OPTIONS = [
  { id: 1, text: '😖' },
  { id: 2, text: '😕' },
  { id: 3, text: '😐' },
  { id: 4, text: '🙂' },
  { id: 5, text: '😍' }
]

class MatchFeedbackModal extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)

    this.state = {
      contacted: null,
      met: null,
      satisfaction: null,
      comments: null,
      status: 'pending'
    }
  }

  handleModernRadioChange = ({ name, value }) => {
    if (this.state[name] !== undefined) {
      this.setState({ [name]: value })
    }
  }

  handleCommentsChange = (event: SyntheticInputEvent<*>) => {
    this.setState({ comments: event.target.value })
  }

  isReadyToSubmit = (): boolean => {
    const { contacted, met, satisfaction } = this.state
    return contacted != null && met != null && satisfaction != null
  }

  handleSubmit = () => {
    const { contacted, met, satisfaction, comments } = this.state
    if (contacted != null && met != null && satisfaction != null) {
      const s: MatchFeedbackType = {
        // eslint-disable-next-line no-underscore-dangle
        matchId: this.props.match._id,
        contacted,
        met,
        satisfaction,
        comments: comments || null
      }

      this.props.submitMatchFeedback(s, error => {
        if (error) {
          this.setState({ status: 'failed' })
        }
      })
    } else {
      this.setState({ status: 'missing' })
    }
  }

  renderSubmitMessage(): ?React.Element<*> {
    return {
      missing: <Text color={colors.red}>Please fill out all the required fields.</Text>,
      failed: <Text color={colors.red}>Something went wrong on our end. Sorry!</Text>,
      done: <Text color={colors.green}>Thanks for the feedback!</Text>,
      pending: null
    }[this.state.status]
  }

  render(): React.Element<*> {
    const { contacted, met, satisfaction, comments } = this.state
    const { match } = this.props
    const { user: matchedUser } = match.participants.match
    // eslint-disable-next-line
    const matchId = matchedUser._id

    return (
      <Modal>
        <FeedbackCardWrapper>
          <Subtitle>{copy.match_feedback.title}</Subtitle>

          <SecureUserImage size={100} userId={matchId} />

          <Form.Label>{`Did you contact ${matchedUser.name.first}?`}</Form.Label>
          <ModernRadioGroup
            name="contacted"
            bordered
            selected={contacted}
            options={CONTACTED_MATCH_OPTIONS}
            onChange={this.handleModernRadioChange}
          />

          <Form.Label>{`Did you meet with ${matchedUser.name.first}?`}</Form.Label>
          <ModernRadioGroup
            name="met"
            bordered
            selected={met}
            options={MET_MATCH_OPTIONS}
            onChange={this.handleModernRadioChange}
          />

          <Form.Label>{'How satisfied were you with your match?'}</Form.Label>
          <ModernRadioGroup
            name="satisfaction"
            fontSize={40}
            selected={satisfaction}
            options={SATISFACTION_OPTIONS}
            onChange={this.handleModernRadioChange}
          />

          <Form.Label>{'Any other comments?'}</Form.Label>
          <CommentsTextarea name="comments" rows={5} value={comments || ''} onChange={this.handleCommentsChange} />

          <Text>{copy.match_feedback.response}</Text>
          <Button primary disabled={!this.isReadyToSubmit()} onClick={this.handleSubmit}>
            Submit
          </Button>
          {this.renderSubmitMessage()}
        </FeedbackCardWrapper>
      </Modal>
    )
  }
}

export default connect(() => ({}), actions)(MatchFeedbackModal)
