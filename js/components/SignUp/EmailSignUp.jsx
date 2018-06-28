// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Title, Text } from 'components/typography'
import Button from 'components/Button'
import * as Form from 'components/form'
import * as actions from 'actions'
import { colors } from 'styles'
import { EMAIL_REGEXP, UCLA_EMAIL_REGEXP } from 'constants/regexp'

const Wrapper = styled.div`
  text-align: center;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EmailForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ErrorText = styled(Text)`
  color: ${colors.red};
`

type PropsType = {
  user: ?UserType,
  // eslint-disable-next-line flowtype/no-weak-types
  requestEmailVerification: (?string, ?ReduxCallbackType<*>) => void
}

type StateType = {
  email: ?string,
  done: boolean,
  error: ?Error
}

class EmailSignup extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      email: null,
      done: false,
      error: null
    }
  }

  isEmailValid = (s: string) => EMAIL_REGEXP.test(s) && UCLA_EMAIL_REGEXP.test(s)

  handleEmailChange = (event: SyntheticInputEvent<*>) => {
    this.setState({ email: event.target.value })
  }

  handleEmailEntryKey = (event: SyntheticKeyboardEvent<*>) => {
    if (event.key === 'Enter') this.submit()
  }

  submit = () => {
    const { email } = this.state
    if (email && this.isEmailValid(email)) {
      this.props.requestEmailVerification(email, err => {
        if (err) {
          this.setState({ error: err })
          return
        }
        this.setState({ done: true })
      })
    }
  }

  render(): React.Element<*> {
    const { email, done } = this.state
    const valid = email && this.isEmailValid(email)
    return done ? (
      <Redirect to="/confirmation" />
    ) : (
      <Wrapper>
        <Title>{"Let's verify your email."}</Title>
        <Text bold>
          {
            "Bruin Meet may only be used by UCLA students. Please give us your email so we can make sure you're a Bruin."
          }
        </Text>

        <EmailForm>
          <FormItem>
            <Form.Label required>UCLA Email Address</Form.Label>
            <Form.TextInput
              name="email"
              placeholder="joebruin@ucla.edu"
              onChange={this.handleEmailChange}
              onKeyPress={this.handleEmailEntryKey}
            />
          </FormItem>

          <Button primary onClick={this.submit} disabled={!valid}>
            Finish
          </Button>
        </EmailForm>

        {this.state.error && <ErrorText>Uh oh! Something went wrong on our end... please try again.</ErrorText>}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user
})

export default connect(mapStateToProps, actions)(EmailSignup)
