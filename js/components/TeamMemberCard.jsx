// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'
import { Subtitle, Text } from 'components/typography'
import Card from 'components/Card'

type PropsType = {
  member: MemberDataType
}

const NameText = Subtitle.extend`
  margin-bottom: 0;
  line-height: 10px;
`

const MemberCard = Card.extend`
  min-width: 400px;
  max-width: 500px;
  min-height: 200px;
`

const PositionText = Text.extend`
  font-style: italic;
  line-height: 20px;
`

const DescriptionText = Text.extend`
  line-height: 20px;
`

const MemberImage = styled.img`
  border-radius: 50%;
  border: 7px solid ${colors.lightBlue};
  width: 50%;
  max-width: 140px;
  padding: 5px;
  margin-bottom: 10px;
  margin-right: 30px;
  float: left;
`

const TextData = styled.div`
  padding-left: 20px;
`

export default function TeamMemberCard(props: PropsType): React.Element<*> {
  const { name, position, description, image } = props.member
  return (
    <MemberCard>
      <MemberImage src={image} />
      <TextData>
        <NameText align="left">{`${name.first} ${name.last}`}</NameText>
        <PositionText>{position}</PositionText>
        <DescriptionText>{description}</DescriptionText>
      </TextData>
    </MemberCard>
  )
}
