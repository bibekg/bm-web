// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import clone from 'clone'
import styled from 'styled-components'
import { Title, Text } from 'components/typography'
import * as Form from 'components/form'
import * as USER_PROPS from 'constants/user-props'
import Button from 'components/Button'
import Modal from 'components/Modal'
import * as actions from 'actions'

const FormItemWrapper = styled.div`
  margin: 20px 0;
`

const FormWrapper = styled.div`
  margin: 30px 20px;
`

const Header = styled.div`
  padding: 0 10%;
  text-align: center;
`

const SubmitButtonDiv = styled.div`
  text-align: center;
  margin-bottom: 40px;
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

type PropsType = {
  user: UserType,
  editUser: (UserType, () => void) => void
}

type StateType = {
  editedAnswers: Array<{ question: string, answer: string }>,
  errorMessage: ?string
}

class FunProfileModal extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      editedAnswers: clone(props.user.answers),
      errorMessage: null
    }
  }

  handleQuestionValueChange = (event: SyntheticInputEvent<*>) => {
    const { name, value } = event.target

    const edited = this.state.editedAnswers.filter(item => item.question !== name)
    if (value !== '') {
      edited.push({
        question: name,
        answer: value
      })
    }

    this.setState({ editedAnswers: edited })
  }

  getFunQuestionsFormItems(): Array<React.Element<*>> {
    const { editedAnswers } = this.state

    if (!editedAnswers) {
      return []
    }

    const items = Object.keys(USER_PROPS.QUESTIONS).map((qitem): React.Element<*> => {
      const question = USER_PROPS.QUESTIONS[qitem]
      const answerObject = editedAnswers.find(aqPair => aqPair.question === qitem)
      return (
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

  isFormValid(): boolean {
    const { editedAnswers } = this.state
    return editedAnswers.length === Object.keys(USER_PROPS.QUESTIONS).length
  }

  submit = () => {
    const { editedAnswers } = this.state
    const editedUser = { ...this.props.user, ...{ answers: editedAnswers } }

    if (this.isFormValid() && editedAnswers) {
      this.props.editUser(editedUser, err => {
        if (err) {
          const { status, invalidValues } = err.response.data
          if (status === 'invalid' && invalidValues) {
            this.setState({ errorMessage: `Uh oh! You entered an invalid value for: ${invalidValues.join(', ')}` })
          } else {
            this.setState({ errorMessage: 'Unknown server error.' })
          }
        }
      })
    }
  }

  render(): ?React.Element<*> {
    const isFormValid = this.isFormValid()
    return (
      <Modal>
        <Header>
          <Title>Introducing Fun Profile Questions!</Title>
          <Text>
            {
              "Share a little bit more about yourself with your match. Unfortunately, this pop-up won't go away until you do."
            }
          </Text>
        </Header>
        <FormWrapper>{this.getFunQuestionsFormItems()}</FormWrapper>
        <SubmitButtonDiv>
          <Button primary disabled={!isFormValid} onClick={this.submit}>
            Save
          </Button>
        </SubmitButtonDiv>
      </Modal>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user
})

export default connect(mapStateToProps, actions)(FunProfileModal)
