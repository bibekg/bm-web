// @flow

import * as React from 'react'
import * as actions from 'actions'
import { connect } from 'react-redux'
import { breakpoints } from 'styles'
import { Title, Text } from 'components/typography'
import Button from 'components/Button'
import { Textarea } from 'components/form'
import Card from 'components/Card'

const StyledCard = Card.extend`
  text-align: center;

  @media (min-width: ${breakpoints.feedbackFold}px) {
    padding: 30px 50px;
  }
  @media (max-width: ${breakpoints.feedbackFold - 1}px) {
    padding: 30px;
  }
`

const FeedbackTextarea = Textarea.extend`
  height: 130px;
  margin: 20px 0;
`

type PropsType = {
  // eslint-disable-next-line flowtype/no-weak-types
  postFeedback: (FeedbackCategoryType, string, ?ReduxCallbackType<*>) => void
}

type StateType = {
  feedbackContent: string,
  feedbackSent: boolean,
  message: string | null
}

class FeedbackCard extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      feedbackContent: '',
      feedbackSent: false,
      message: ''
    }
  }

  submit = () => {
    if (this.state.feedbackContent === '') {
      this.setState({
        message: 'Uh oh! Feedback must have content'
      })
    } else {
      this.props.postFeedback('general', this.state.feedbackContent, err => {
        if (err) {
          this.setState({
            message: 'There was an error. Please try again!'
          })
          return
        }
        this.setState({
          message: 'This card will pop up again later. Feel free to leave us another message.',
          feedbackSent: true,
          feedbackContent: ''
        })
      })
    }
  }

  handleValueChange = (event: SyntheticInputEvent<*>) => {
    this.setState({
      feedbackContent: event.target.value
    })
  }

  render(): React.Element<*> {
    const cardTitle = this.state.feedbackSent ? 'Thanks for your feedback!' : 'Give us your feedback'
    return (
      <StyledCard>
        <Title>{cardTitle}</Title>
        {this.state.message && <Text>{this.state.message}</Text>}
        {!this.state.feedbackSent && (
          <div>
            <FeedbackTextarea
              value={this.state.feedbackContent}
              onChange={this.handleValueChange}
              placeholder="Let us know how you feel!"
            />
            <Button onClick={this.submit} primary>
              Submit
            </Button>
          </div>
        )}
      </StyledCard>
    )
  }
}

export default connect(null, actions)(FeedbackCard)
