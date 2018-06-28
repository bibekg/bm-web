// @flow

import * as React from 'react'
import Card from 'components/Card'
import { Subtitle, Text } from 'components/typography'

type PropsType = {
  image: string,
  title: string,
  text: string
}

const FCard = Card.extend`
  margin: -50px 20px 20px 20px;
  flex: 1;

  @media (max-width: 700px) {
    margin: 10px 0px;
  }
`

export default function FeatureCard(props: PropsType): React.Element<*> {
  return (
    <FCard>
      <Subtitle>{props.title}</Subtitle>
      <img src={props.image} alt={props.title} width="120px" height="120px" />
      <Text paragraph>{props.text}</Text>
    </FCard>
  )
}
