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
import { copy } from 'product-copy'
import FoldSwitch from 'components/FoldSwitch'

const ProfileCardDiv = Card.extend`
  padding: 30px;
  padding-bottom: ${props => (props.foldable ? 0 : 30)}px;
  display: flex;
  flex-direction: column;
  position: relative;
`

const InfoBannerDiv = styled.div`
  display: flex;
  align-items: center;
  & > * {
    padding: 20px;
  }

  @media (max-width: ${breakpoints.profileCard - 1}px) {
    flex-flow: column nowrap;
  }
  @media (min-width: ${breakpoints.profileCard}px) {
    flex-flow: row nowrap;
  }
`

const DetailedInfoColumns = styled.div`
  display: flex;

  @media (max-width: ${breakpoints.profileCard - 1}px) {
    flex-flow: column nowrap;
    align-items: flex-start;
    padding: 0px;
  }
  @media (min-width: ${breakpoints.profileCard}px) {
    flex-flow: row nowrap;
    padding: 20px;

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
      <Text>{copy.matchCard.missingFunQuestions}</Text>
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
      <ProfileCardDiv foldable={this.props.foldable}>
        <InfoBannerDiv>
          <MatchedCountdownTimer />
          <div>
            <SecureUserImage userId={_id} />
          </div>
          <ProfileTextInfo user={this.props.user} hideContactInfo={this.props.hideContactInfo} />
        </InfoBannerDiv>

        {!this.state.isFolded && (
          <DetailedInfoColumns>
            <div>
              <Title align="left">{copy.matchCard.about}</Title>
              <BoldSpanText>{copy.matchCard.bio}</BoldSpanText>
              {bio &&
                bio.split('\n').map(p => (
                  <DetailText paragraph key={p}>
                    {p}
                  </DetailText>
                ))}
              <br />
              <BoldSpanText>{copy.matchCard.looking}</BoldSpanText>
              {/* this implementation assumes there is always an intersection in relationship types */}
              <DetailText paragraph>
                {this.props.matchBasis && this.props.matchBasis.length > 0
                  ? this.props.matchBasis.map(formatRelationshipType).join(', ')
                  : 'any'}
              </DetailText>
            </div>
            <div>{this.renderFunQuestionAnswers()}</div>
          </DetailedInfoColumns>
        )}

        {this.props.foldable && (
          <FoldSwitch isFolded={this.state.isFolded} onClick={this.handleFold} text={copy.foldSwitch.text} />
        )}
      </ProfileCardDiv>
    )
  }
}

export default MatchCard
