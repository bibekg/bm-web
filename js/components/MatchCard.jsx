// @flow

import * as React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import { Text, Title } from 'components/typography'
import SecureUserImage from 'components/SecureUserImage'
import ProfileTextInfo from 'components/ProfileTextInfo'
import { colors, breakpoints } from 'styles'
import { formatQuestion, formatRelationshipType } from 'utilities/user-formatters'
import MatchedCountdownTimer from 'components/MatchedCountdownTimer'
import { ExpandMoreIcon } from 'components/icons'

const ProfileCardDiv = Card.extend`
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
`

const InfoBannerDiv = styled.div`
  display: flex;
  & > * {
    padding: 20px;
  }

  @media (max-width: ${breakpoints.profileCard - 1}px) {
    flex-flow: column nowrap;
    align-items: center;
  }
  @media (min-width: ${breakpoints.profileCard}px) {
    flex-flow: row nowrap;
    align-items: flex-start;
  }
`

// this animation is hacky and disgusting. sorry.
// Since CSS can't transition from 0 to auto, the only nonhacky solution
// is to either listen for window height or write some crazy custom functions
// that generate+inject keyframes based on before/after states. The latter is
// performant but complicated, so instead we transition max-heights, setting
// the end max-height to a number we'll ~probably~ never reach on any screen size.
// This causes the animation speed to differ when opening/closing, but we take what
// we can get ;)

const DetailedInfoColumns = styled.div`
  display: flex;
  overflow: hidden;

  /* hopefully no screen size will ever hit max-height 1000px */
  max-height: ${props => (props.isFolded ? 0 : 1000)}px;
  transform-origin: top;
  transition: max-height 2s;

  @media (max-width: ${breakpoints.profileCard - 1}px) {
    flex-flow: column nowrap;
    align-items: flex-start;
    padding: 0px;
  }
  @media (min-width: ${breakpoints.profileCard}px) {
    flex-flow: row nowrap;
    max-height: ${props => (props.isFolded ? 0 : 1500)}px; /* or 1500px on mobile */
    padding: 0 20px ${props => (props.isFolded ? 0 : 20)}px;
    transition: max-height 2s, padding 1s;
    & > * {
      flex: 1;
      &:not(:last-child) {
        border-right: 1px solid ${colors.lightGrey};
        padding-right: 20px;
      }

      &:not(:first-child) {
        padding-left: 20px;
      }
    }
  }
`

const BoldSpanText = styled.span`
  font-weight: 400;
  text-align: left;
`

const DetailText = Text.extend`
  margin-top: 5px;
  text-align: left;
`

// Foldedness is described in a prop (foldable) and a state (isFolded). isFolded will
// start as true or false depending on if the prop is also set to true or false.
// This way, for things like AutoDate, we set foldable to true and the card will start
// as folded, and for the rest, foldable is false and isFolded isn't relevant.

type PropsType = {
  user: UserType,
  matchBasis: ?Array<UserRelationshipType>,
  hideContactInfo?: boolean,
  foldable: boolean
}

type StateType = {
  isFolded: boolean
}

const AccordionDropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AccordionSwitchDiv = styled.div`
  transform: rotate(${(state: StateType) => (state.isFolded ? '0' : '180')}deg);
  transform-origin: center;
  transition: 0.2s;
`

class MatchCard extends React.Component<PropsType, StateType> {
  static defaultProps = {
    foldable: false
  }

  constructor(props: PropsType) {
    super(props)
    this.state = {
      isFolded: props.foldable // so we start folded if foldable and not if not
    }
  }

  renderFunQuestionAnswers = (): Array<React.Element<*>> | React.Element<*> => {
    const { answers } = this.props.user
    return answers.length > 0 ? (
      answers.map((aitem): React.Element<*> => (
        <div key={aitem.question}>
          <BoldSpanText>{formatQuestion(aitem.question)}</BoldSpanText>
          <DetailText paragraph>{aitem.answer}</DetailText>
        </div>
      ))
    ) : (
      <Text>Your match has not yet filled out any fun fact questions ):</Text>
    )
  }

  handleFold = () => {
    this.setState({
      isFolded: !this.state.isFolded
    })
  }

  render(): ?React.Element<*> {
    const { _id, bio } = this.props.user

    return (
      <ProfileCardDiv>
        <InfoBannerDiv>
          <MatchedCountdownTimer />
          <div>
            <SecureUserImage userId={_id} />
          </div>
          <ProfileTextInfo user={this.props.user} hideContactInfo={this.props.hideContactInfo} />
        </InfoBannerDiv>

        <DetailedInfoColumns isFolded={this.state.isFolded}>
          <div>
            <Title align="left">About Me</Title>
            <BoldSpanText>Bio</BoldSpanText>
            {bio &&
              bio.split('\n').map(p => (
                <DetailText paragraph key={p}>
                  {p}
                </DetailText>
              ))}
            <br />
            <BoldSpanText>{`You're both looking for: `}</BoldSpanText>
            {/* this implementation assumes there is always an intersection in relationship types */}
            <DetailText paragraph>
              {this.props.matchBasis && this.props.matchBasis.length > 0
                ? this.props.matchBasis.map(formatRelationshipType).join(', ')
                : 'any'}
            </DetailText>
          </div>
          <div>{this.renderFunQuestionAnswers()}</div>
        </DetailedInfoColumns>

        {this.props.foldable && (
          <AccordionDropdown>
            <AccordionSwitchDiv isFolded={this.state.isFolded} onClick={this.handleFold}>
              <ExpandMoreIcon fill={'#76AFFB'} size={40} />
            </AccordionSwitchDiv>
          </AccordionDropdown>
        )}
      </ProfileCardDiv>
    )
  }
}

export default MatchCard
