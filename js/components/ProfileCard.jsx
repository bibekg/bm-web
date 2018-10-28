// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Card from 'components/Card'
import Button from 'components/Button'
import { Text, Title } from 'components/typography'
import SecureUserImage from 'components/SecureUserImage'
import ProfileTextInfo from 'components/ProfileTextInfo'
import {
  formatHeight,
  formatUserYear,
  formatRelationshipType,
  formatGender,
  formatQuestion
} from 'utilities/user-formatters'
import { colors, breakpoints } from 'styles'
import DeactivateModal from 'components/DeactivateModal'
import { copy } from 'product-copy'

const ProfileCardDiv = Card.extend`
  padding: 30px;
  display: flex;
  flex-direction: column;
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

const ProfileActionButtonsDiv = styled.div`
  display: flex;
  ${props =>
    props.activeChangeInitated
      ? `
      flex-flow: column nowrap;
      text-align: center;
    `
      : `
      flex-flow: row nowrap;
  `} margin-top: 20px;
  & > * {
    &:not(:last-child) {
      margin-right: 15px;
    }
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
`

const AboutText = Text.extend`
  margin-top: 5px;
  text-align: left;
`

type PropsType = {
  user: UserType
}

type StateType = {
  deactivation: boolean
}

class ProfileCard extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      deactivation: false
    }
  }

  closeDeactivateModal = () => {
    this.setState({
      deactivation: false
    })
  }

  handleDeactivation = () => {
    this.setState({
      deactivation: true
    })
  }

  renderProfileActionButtons(active: boolean): React.Element<*> {
    return (
      <ProfileActionButtonsDiv>
        <Link to="/profile/edit">
          <Button primary>Edit</Button>
        </Link>
        <Button primary={!active} onClick={this.handleDeactivation}>
          Deactivate
        </Button>
      </ProfileActionButtonsDiv>
    )
  }

  renderFunQuestionAnswers = (): Array<React.Element<*>> | React.Element<*> => {
    const { answers } = this.props.user
    return answers.length > 0 ? (
      answers.map(aitem => (
        <div key={aitem.question}>
          <BoldSpanText>{formatQuestion(aitem.question)}</BoldSpanText>
          <AboutText paragraph>{aitem.answer}</AboutText>
        </div>
      ))
    ) : (
      <div>
        <Text>{copy.profileCard.funQuestionsMissing}</Text>
        <Text>{copy.profileCard.funQuestionsCallToAction}</Text>
      </div>
    )
  }

  render(): ?React.Element<*> {
    const {
      _id,
      active,
      bio,
      genderPreference,
      yearPreference,
      agePreference,
      relationshipType,
      heightPreference
    } = this.props.user

    return (
      <ProfileCardDiv>
        {this.state.deactivation && <DeactivateModal onOutClick={this.closeDeactivateModal} />}
        <InfoBannerDiv>
          <div>
            <SecureUserImage editable userId={_id} />
          </div>
          <div>
            <ProfileTextInfo user={this.props.user} />
            {this.renderProfileActionButtons(active)}
          </div>
        </InfoBannerDiv>

        <DetailedInfoColumns>
          <div>
            <Title align="left">About Me</Title>
            <BoldSpanText>Bio</BoldSpanText>
            {bio &&
              bio.split('\n').map(p => (
                <AboutText paragraph key={p}>
                  {p}
                </AboutText>
              ))}
            <div>{this.renderFunQuestionAnswers()}</div>
          </div>
          <div>
            <Title align="left">Looking For</Title>
            <Text>
              <BoldSpanText>Gender: </BoldSpanText>
              {genderPreference ? genderPreference.map(formatGender).join(', ') : 'any'}
            </Text>

            <Text>
              <BoldSpanText>Year: </BoldSpanText>
              {yearPreference && yearPreference.length > 0
                ? yearPreference
                    .sort((a, b) => a - b)
                    .map(formatUserYear)
                    .join(', ')
                : 'any'}
            </Text>

            <Text>
              <BoldSpanText>Age: </BoldSpanText>
              {agePreference ? `${agePreference.min} - ${agePreference.max}` : 'any - any'}
            </Text>

            <Text>
              <BoldSpanText>Relationship Type: </BoldSpanText>
              {relationshipType && relationshipType.length > 0
                ? relationshipType.map(formatRelationshipType).join(', ')
                : 'any'}
            </Text>

            <Text>
              <BoldSpanText>Height: </BoldSpanText>
              {heightPreference
                ? `${formatHeight(heightPreference.min)} - ${formatHeight(heightPreference.max)}`
                : 'any - any'}
            </Text>
          </div>
        </DetailedInfoColumns>
      </ProfileCardDiv>
    )
  }
}

export default ProfileCard
