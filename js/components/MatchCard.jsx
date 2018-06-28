// @flow

import * as React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import { Text, Title } from 'components/typography'
import SecureUserImage from 'components/SecureUserImage'
import ProfileTextInfo from 'components/ProfileTextInfo'
import { colors, breakpoints } from 'styles'
import { formatQuestion, formatRelationshipType } from 'utilities/user-formatters'
import MatchmakingTimer from 'components/MatchmakingTimer'

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
  hideContactInfo?: boolean,
  countDownTime: Date
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
      <Text>Your match has not yet filled out any fun fact questions ):</Text>
    )
  }

  const { _id, bio } = props.user

  return (
    <ProfileCardDiv>
      <InfoBannerDiv>
        <MatchmakingTimer countDownTime={props.countDownTime} />
        <div>
          <SecureUserImage userId={_id} />
        </div>
        <ProfileTextInfo user={props.user} hideContactInfo={props.hideContactInfo} />
      </InfoBannerDiv>

      <DetailedInfoColumns>
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
