// @flow

import * as React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import { Text, Title } from 'components/typography'
import UserImage from 'components/UserImage'
import ProfileTextInfo from 'components/ProfileTextInfo'
import { colors, breakpoints } from 'styles'
import { formatQuestion, formatRelationshipType } from 'utilities/user-formatters'
import MatchedCountdownTimer from 'components/MatchedCountdownTimer'
import { copy } from 'product-copy'

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

type PropsType = {
  user: UserType,
  matchBasis: ?Array<UserRelationshipType>,
  hideContactInfo?: boolean
}

export default function MatchCard(props: PropsType): React.Element<*> {
  const renderFunQuestionAnswers = (): Array<React.Element<*>> | React.Element<*> => {
    const { answers } = props.user
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

  const { _id, bio } = props.user

  return (
    <ProfileCardDiv>
      <InfoBannerDiv>
        <MatchedCountdownTimer />
        <div>
          <UserImage src={props.user.profilePic} />
        </div>
        <ProfileTextInfo user={props.user} hideContactInfo={props.hideContactInfo} />
      </InfoBannerDiv>

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
            {props.matchBasis && props.matchBasis.length > 0
              ? props.matchBasis.map(formatRelationshipType).join(', ')
              : 'any'}
          </DetailText>
        </div>
        <div>{renderFunQuestionAnswers()}</div>
      </DetailedInfoColumns>
    </ProfileCardDiv>
  )
}
