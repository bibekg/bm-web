// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

type PropsType = {
  image: string,
  title: string,
  text: string,
  arrangement: string
}

const Row = styled.div`
  display: flex;
  flex-direction: ${props => props.arragement};
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 20px, 0, 30px;
`

const RowItem = styled.div`
  padding: 15px 50px;
  flex: 1 50%;

  @media (max-width: 800px) {
    flex: 1 100%;
  }
`

const Subtitle = styled.h2`
  font-size: 35px;
  line-height: 30px;
  color: ${props => props.color || colors.grey};

  @media (max-width: 700px) {
    font-size: 18px;
  }
`

const Text = styled.p`
  font-size: ${props => (props.size ? props.size : 20)}px;
  ${props => (props.bold ? 'font-weight: bold;' : '')};
  line-height: ${props => 15 * (props.paragraph ? 2.0 : 1.37)}px;
  color: ${props => (props.color ? props.color : colors.grey)};
  ${props => props.center && 'text-align: center;'} letter-spacing: 0.8px;
  margin: 5px 0;
`

export default function HowItWorksItem(props: PropsType): React.Element<*> {
  return (
    <Row arragement={props.arrangement}>
      <RowItem>
        <img src={props.image} alt={props.title} width="100%" />
      </RowItem>
      <RowItem>
        <Subtitle>{props.title}</Subtitle>
        <Text paragraph>{props.text}</Text>
      </RowItem>
    </Row>
  )
}
