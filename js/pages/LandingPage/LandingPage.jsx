// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Title, Text } from 'components/typography'
import LogInButton from 'components/LogInButton'
import FeatureCard from 'components/FeatureCard'
import { BlueWaveBackground, TopWave, BottomWave } from 'components/waves'
import { breakpoints, colors } from 'styles'
import features from './feature-data'

const FOLDING_BREAKPOINT = 700

const LandingText = styled(Text).attrs({
  paragraph: true
})`
  color: ${colors.white};
  margin: 10px 0;
  @media (min-width: ${FOLDING_BREAKPOINT}px) {
    font-size: 30px;
  }
  @media (max-width: ${FOLDING_BREAKPOINT - 1}px) {
    font-size: 26px;
  }
`
const TagDiv = styled.div`
  position: relative;
  top: 40vh;
`

const MessageWrapper = styled.div`
  box-sizing: border-box;
  margin: auto;
  text-align: center;

  @media (min-width: ${FOLDING_BREAKPOINT}px) {
    width: 75%;
    padding: 10%;
  }
  @media (max-width: ${FOLDING_BREAKPOINT - 1}px) {
    width: 90%;
    padding: 50px 10px;
  }
`

const TopWaveDiv = TopWave.extend`
  width: 100%;
  @media (min-width: ${breakpoints.navFold}px) {
    height: 10vw;
  }
  @media (max-width: ${breakpoints.navFold - 1}px) {
    height: 120px;
  }
`

const BottomWaveDiv = BottomWave.extend`
  width: 100%;
  @media (min-width: ${breakpoints.navFold}px) {
    height: 10vw;
  }
  @media (max-width: ${breakpoints.navFold - 1}px) {
    height: 120px;
  }
`

const FeatureWrapper = styled.div`
  text-align: center;
  padding: 5% 0 0 0;
`

const FeatureCardsWrapper = styled.div`
  display: flex;
  padding: 0 5%;
  background-color: #75adfa;

  @media (min-width: ${FOLDING_BREAKPOINT}px) {
    flex-direction: row;
  }
  @media (max-width: ${FOLDING_BREAKPOINT - 1}px) {
    flex-direction: column;

    > div:first-child {
      margin-top: -50px;
    }
  }
`

type PropsType = {
  isLoggedIn: boolean
}

const LandingPage = (props: PropsType): ?React.Element<*> => {
  const renderFeature = ({ image, title, description }) => (
    <FeatureCard key={title} image={image} title={title} text={description} />
  )

  if (props.isLoggedIn === null) {
    return null
  } else if (props.isLoggedIn) {
    return <Redirect to="/main" />
  } else {
    return (
      <div>
        <BlueWaveBackground>
          <TagDiv>
            <LandingText>Make the First Move.</LandingText>
            <LandingText>Find Your True Bruin.</LandingText>
            <br />
            <LogInButton override="signup" />
          </TagDiv>
        </BlueWaveBackground>
        <MessageWrapper>
          <Title>From Us To You BREH</Title>
          <br />
          <Text paragraph>
            {
              "BruinMeet makes dating fun and easy. Spending all day swiping through people isn't what dating should be. Instead of swiping or crazy algorithms, we believe the best way to tell if there's a spark is to meet in person."
            }
          </Text>
        </MessageWrapper>
        <FeatureWrapper>
          <Title>Features</Title>
          <TopWaveDiv />
          <FeatureCardsWrapper>{features.map(renderFeature)}</FeatureCardsWrapper>
          <BottomWaveDiv />
        </FeatureWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, {})(LandingPage)
