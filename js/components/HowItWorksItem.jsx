// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Text } from 'components/typography'
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
  padding: 20px, 0, 50px;
  margin-bottom: 25px;

  @media (max-width: 800px) {
    justify-content: center;
  }
`

const RowItem = styled.div`
  padding: 15px 50px;
  flex: 1 50%;
  max-width: 600px;

  @media (max-width: 800px) {
    flex: 1 100%;
  }
  @media (max-width: 600px) {
    padding: 15px 10px;
  }
`

const RowWords = RowItem.extend`
  padding-top: 60px;
  max-width: 500px;
  @media (max-width: 800px) {
    padding-top: 15px;
  }
`

const RowText = Text.extend`
  line-height: 30px;
`

const Subtitle = styled.h2`
  font-size: 35px;
  line-height: 30px;
  color: ${props => props.color || colors.grey};

  @media (max-width: 700px) {
    font-size: 24px;
  }
`

export default function HowItWorksItem(props: PropsType): React.Element<*> {
  return (
    <Row arragement={props.arrangement}>
      <RowItem>
        <img src={props.image} alt={props.title} width="100%" />
      </RowItem>
      <RowWords>
        <Subtitle>{props.title}</Subtitle>
        <RowText size="20" paragraph>
          {props.text}
        </RowText>
      </RowWords>
    </Row>
  )
}
