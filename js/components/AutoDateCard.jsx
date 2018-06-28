// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import styled from 'styled-components'
import { Title, Text } from 'components/typography'
import Button from 'components/Button'
import Card from 'components/Card'
import { breakpoints, colors } from 'styles'
import AvailabilitySelector from 'components/AvailabilitySelector'

const StyledCard = Card.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpoints.profileCard}px) {
    padding: 30px;
    margin: 40px 0;
    & > button {
      margin: 10px;
    }
  }
  @media (max-width: ${breakpoints.profileCard - 1}px) {
    padding: 20px 105x;
    margin: 20px 0;
    & > button {
      margin: 10px 5px;
    }
  }
`

const ErrorMessage = Text.extend`
  color: ${colors.red};
`

const SelectorWrapper = styled.div`
  width: 100%;
  @media (min-width: ${breakpoints.profileCard}px) {
    padding: 0 20px;
  }
  @media (max-width: ${breakpoints.profileCard - 1}px) {
    padding: 0;
  }
`

type PropsType = {
  availability: Array<Date>,
  // eslint-disable-next-line flowtype/no-weak-types
  postDateAvailability: (Array<Date>, ?ReduxCallbackType<*>) => void,
  getUser: () => void
}

type StateType = {
  availabilityDraft: Array<Date>,
  errorMessage: ?string
}

class AutoDateCard extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      availabilityDraft: props.availability,
      errorMessage: null
    }
  }

  submit = () => {
    this.props.postDateAvailability(this.state.availabilityDraft, err => {
      if (err) {
        this.setState({ errorMessage: 'There was an error. Please try again!' })
      }
    })
  }

  handleAvailabilityChange = (newAvailability: Array<Date>) => {
    this.setState({ availabilityDraft: newAvailability })
  }

  render(): React.Element<*> {
    return (
      <StyledCard>
        <Title>When are you available for a date?</Title>
        {this.state.errorMessage && <ErrorMessage>{this.state.errorMessage}</ErrorMessage>}
        <SelectorWrapper>
          <AvailabilitySelector availability={this.state.availabilityDraft} onChange={this.handleAvailabilityChange} />
        </SelectorWrapper>
        <Button onClick={this.submit} primary>
          Submit
        </Button>
      </StyledCard>
    )
  }
}

export default connect(null, actions)(AutoDateCard)
