// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Text, Subtitle } from 'components/typography'

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
  margin: 60px 0;

  @media (max-width: 800px) {
    justify-content: center;
  }
`

const RowItem = styled.div`
  padding: 15px 50px;
  flex: 1 50%;
  max-width: 700px;

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

const HowItWorksImage = styled.img`
  width: 100%;
  border-radius: 20px;
`

const RowText = Text.extend`
  line-height: 30px;
`

const RowSubtitle = Subtitle.extend`
  text-align: left;
  font-size: 35px;

  @media (max-width: 700px) {
    font-size: 24px;
  }
`

export default function HowItWorksItem(props: PropsType): React.Element<*> {
  return (
    <Row arragement={props.arrangement}>
      <RowItem>
        <HowItWorksImage src={props.image} alt={props.title} />
      </RowItem>
      <RowWords>
        <RowSubtitle>{props.title}</RowSubtitle>
        <RowText size="20" paragraph>
          {props.text}
        </RowText>
      </RowWords>
    </Row>
  )
}
