// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Title, Text } from 'components/typography'
import LogInButton from 'components/LogInButton'
import FeatureCard from 'components/FeatureCard'
import HowItWorksItem from 'components/HowItWorksItem'
import { TopWave, BottomWave } from 'components/waves'
import { breakpoints, colors } from 'styles'
import features from './feature-data'
import descriptions from './how-it-works-data'
import img from './img/landing-clouds.svg'

const FOLDING_BREAKPOINT = 700

const LandingText = styled(Text).attrs({
  paragraph: true
})`
  color: ${colors.blue};
  margin: 10px 0;
  @media (min-width: ${FOLDING_BREAKPOINT}px) {
    font-size: ${props => (props.large ? 48 : 32)}px;
    line-height: 40px;
  }
  @media (max-width: ${FOLDING_BREAKPOINT - 1}px) {
    font-size: ${props => (props.large ? 32 : 24)}px;
  }
`

const CloudBackground = styled.div`
  height: 80vh;
  padding: 5%;
  box-sizing: border-box;
  background-image: url(${img});
  background-size: cover;
  /* background-attachment: fixed; */
`

const TagDiv = styled.div`
  position: absolute;
  top: 35vh;
`

const MessageWrapper = styled.div`
  box-sizing: border-box;
  margin: auto;
  text-align: center;

  @media (min-width: ${FOLDING_BREAKPOINT}px) {
    width: 75%;
    padding: 5%;
  }
  @media (max-width: ${FOLDING_BREAKPOINT - 1}px) {
    width: 90%;
    padding: 40px 10px;
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

const HowItWorksWrapper = styled.div`
  width: 90%;
  max-width: 1050px;
  margin: auto;
`

type PropsType = {
  isLoggedIn: boolean
}

const LandingPage = (props: PropsType): ?React.Element<*> => {
  const renderFeature = ({ image, title, description }) => (
    <FeatureCard key={title} image={image} title={title} text={description} />
  )

  const renderDiscItem = ({ image, title, description, arrangement }) => (
    <HowItWorksItem key={title} image={image} title={title} text={description} arrangement={arrangement} />
  )

  if (props.isLoggedIn === null) {
    return null
  } else if (props.isLoggedIn) {
    return <Redirect to="/main" />
  } else {
    return (
      <div>
        <CloudBackground>
          <TagDiv>
            <LandingText large>Make the First Move</LandingText>
            <LandingText>Find Your True Bruin.</LandingText>
            <br />
            <LogInButton plain override="signup" />
          </TagDiv>
        </CloudBackground>
        <MessageWrapper>
          <Title>From Us To You</Title>
          <br />
          <Text paragraph>
            {
              "BruinMeet makes dating fun and easy. Spending all day swiping through people isn't what dating should be. Instead of swiping or crazy algorithms, we believe the best way to tell if there's a spark is to meet in person."
            }
          </Text>
        </MessageWrapper>
        <HowItWorksWrapper>
          <Title>How It Works</Title>
          {descriptions.map(renderDiscItem)}
        </HowItWorksWrapper>
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
