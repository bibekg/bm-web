// @flow

import React from 'react'
import styled from 'styled-components'

import { Text } from 'components/typography'
import { colors, breakpoints } from 'styles'
import ContactItem from 'components/ContactItem'
import { EmailIcon, InstagramIcon, SmartphoneIcon, SnapchatIcon } from 'components/icons'
import { formatInstagramLink, formatGender, formatUserYear, formatHeight, formatName } from 'utilities/user-formatters'

const CONTACT_ITEM_ICON_SIZE = 10

const ProfileTextDiv = styled.div`
  @media (max-width: ${breakpoints.profileCard - 1}px) {
    text-align: center;
  }
  @media (min-width: ${breakpoints.profileCard}px) {
    text-align: left;
  }
`

const Name = styled.div`
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 1px;
  color: ${colors.grey};
`

const ContactInfoDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  & > * {
    margin-bottom: 5px;
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
  @media (max-width: ${breakpoints.profileCard - 1}px) {
    justify-content: center;
  }
  @media (min-width: ${breakpoints.profileCard}px) {
    justify-content: flex-start;
  }
`

const ContactItemText = styled(Text)`
  margin: 0px 0px 0px 5px;
  ${props => props.isLink && `color: ${colors.blue};`};
`

type PropsType = {
  user: UserType,
  hideContactInfo?: boolean,
  children?: *
}

function ProfileTextInfo(props: PropsType): * {
  const { name, gender, age, year, ethnicity, height, major, email, instagram, phone, snapchat } = props.user

  const tagList = [
    gender ? formatGender(gender) : null,
    age || null,
    year ? formatUserYear(year) : null,
    ethnicity && ethnicity.length > 0 ? ethnicity.join(', ') : null,
    height ? formatHeight(height) : null,
    major || null
  ]

  const infoTagLine = tagList.filter(value => value != null).join(' • ')

  return (
    <ProfileTextDiv>
      <Name>{props.hideContactInfo ? 'Name Hidden' : `${formatName(name)}`}</Name>
      <Text>{infoTagLine}</Text>

      {props.hideContactInfo ? (
        <Text bold>Contact info hidden until both matches have responded!</Text>
      ) : (
        <ContactInfoDiv>
          {phone && (
            <ContactItem>
              <SmartphoneIcon size={CONTACT_ITEM_ICON_SIZE} />
              <ContactItemText>{phone}</ContactItemText>
            </ContactItem>
          )}
          {email && (
            <ContactItem>
              <EmailIcon size={CONTACT_ITEM_ICON_SIZE} />
              <ContactItemText>{email}</ContactItemText>
            </ContactItem>
          )}
          {snapchat && (
            <ContactItem>
              <SnapchatIcon size={CONTACT_ITEM_ICON_SIZE} />
              <ContactItemText>{snapchat}</ContactItemText>
            </ContactItem>
          )}
          {instagram && (
            <ContactItem link={formatInstagramLink(instagram)}>
              <InstagramIcon size={CONTACT_ITEM_ICON_SIZE} />
              <ContactItemText isLink>{instagram}</ContactItemText>
            </ContactItem>
          )}
        </ContactInfoDiv>
      )}
    </ProfileTextDiv>
  )
}

export default ProfileTextInfo
