// @flow

import * as React from 'react'
import styled from 'styled-components'
import { breakpoints, colors } from 'styles'
import Card from 'components/Card'
import Button from 'components/Button'
import { Header, Title, Subtitle, Text } from 'components/typography'
import { TopLightWave } from 'components/waves'
import positions from './positions'

const PageWrapper = styled.div`
  margin: 50px auto 0;
  padding: 0 10px 50px;

  @media (max-width: ${breakpoints.navFold - 1}px) {
    width: 95%;
  }
  @media (min-width: ${breakpoints.navFold}px) {
    max-width: 900px;
  }
`

const HeaderWrapper = styled.div`
  width: 90%;
  margin: auto;
`

const StyledHeader = Header.extend`
  text-align: left;
  font-size: 36px;
  letter-spacing: 3px;
`

const PositionCard = Card.extend`
  @media (max-width: ${breakpoints.navFold - 1}px) {
    padding: 20px 30px;
    margin: 10px 0;
  }
  @media (min-width: ${breakpoints.navFold}px) {
    padding: 20px 40px;
    margin: 20px 0;
  }
`

const Position = Title.extend`
  color: ${colors.lightBlue};
  text-decoration: underline;
`

const ApplyWrapper = styled.div`
  margin: 40px 0 20px 0;
`

const StyledLink = styled.a`
  color: ${colors.lightBlue};
`

const FixedTopLightWave = TopLightWave.extend`
  background-size: 100%;
  background-attachment: fixed;
  background-position: bottom;
`

export default function RecruitingPage(): React.Element<*> {
  const renderPosition = (position: PositionType) => (
    <PositionCard key={position.title}>
      <Position align="left">{position.title}</Position>
      <Text paragraph>{position.description}</Text>
      <Text bold align="left">
        Responsibilities:
      </Text>
      <ul>
        {position.responsibilities.map((responsibility: string) => (
          <li key={responsibility}>
            <Text>{responsibility}</Text>
          </li>
        ))}
      </ul>
      <ApplyWrapper>
        <StyledLink href={position.applicationLink} target="__blank">
          <Button primary>Apply</Button>
        </StyledLink>
      </ApplyWrapper>
    </PositionCard>
  )

  return (
    <FixedTopLightWave>
      <PageWrapper>
        <HeaderWrapper>
          <StyledHeader>Join the Team</StyledHeader>
          <Subtitle align="left">
            {
              "We're on a mission to spread the love at UCLA. This is hard work and we need your help to make it happen."
            }
          </Subtitle>
        </HeaderWrapper>

        {positions.map(renderPosition)}
      </PageWrapper>
    </FixedTopLightWave>
  )
}
