// @flow

import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Header, Title, Text, Subtitle } from 'components/typography'
import LogInButton from 'components/LogInButton'
// import FeatureCard from 'components/FeatureCard'
import HowItWorksItem from 'components/HowItWorksItem'
// import { TopWave, BottomWave } from 'components/waves'
import { breakpoints, colors } from 'styles'
// import features from './feature-data'
import descriptions from './how-it-works-data'
import LandingClouds1 from './img/landing-clouds-1.svg'
import LandingClouds2 from './img/landing-clouds-2.svg'
import BackgroundClouds from './img/background-clouds.svg'
import video from './video/bruinmeet.mp4'
import poster from './video/poster.png'

const FOLDING_BREAKPOINT = 700

const LighterHeader = styled(Header)`
  font-weight: lighter;
`

const LandingText = styled(Text).attrs({
  paragraph: true
})`
  color: ${colors.blue};
  margin: 10px 0;
  line-height: 40px;
  @media (min-width: ${FOLDING_BREAKPOINT}px) {
    font-size: ${props => (props.large ? 50 : 40)}px;
  }

  @media (max-width: ${FOLDING_BREAKPOINT - 1}px) {
    font-size: ${props => (props.large ? 40 : 30)}px;
  }
`

const LandingCloudBackground = styled.div`
  height: 80vh;
  padding: 5%;
  box-sizing: border-box;
  background-image: url(${Math.random >= 0.5 ? LandingClouds1 : LandingClouds2});
  background-size: cover;
  background-position: top right;

  @media (min-width: ${breakpoints.navFold}px) {
    min-height: 600px;
  }

  @media (max-width: ${breakpoints.navFold - 1}px) {
    background-position: top 80px right;
  }
`
const VideoCloudBackground = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
  box-sizing: border-box;
  background-image: url(${BackgroundClouds});
  background-size: cover;
  background-position: top right;
  background-color: #f4faff;
`

const TagDiv = styled.div`
  position: relative;
  top: 40%;

  @media (max-width: ${breakpoints.navFold - 1}px) {
    top: 10%;
  }
`

const VideoWrapper = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LandingVideo = styled.video`
  max-width: 80%;
  height: auto;

  @media (max-width: ${FOLDING_BREAKPOINT - 1}px) {
    max-width: 100%;
  }
`

const HowItWorksWrapper = styled.div`
  width: 90%;
  max-width: 1150px;
  margin: auto;
`

const HowItWorksTitle = Title.extend`
  font-size: 42px;

  @media (max-width: 700px) {
    font-size: 30px;
  }
`

type PropsType = {
  isLoggedIn: boolean
}

const LandingPage = (props: PropsType): ?React.Element<*> => {
  // const renderFeature = ({ image, title, description }) => (
  //   <FeatureCard key={title} image={image} title={title} text={description} />
  // )

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
        <LandingCloudBackground>
          <TagDiv>
            <LandingText large>Make the First Move</LandingText>
            <LandingText>Find Your True Bruin.</LandingText>
            <br />
            <LogInButton plain override="signup" />
          </TagDiv>
        </LandingCloudBackground>
        <VideoCloudBackground>
          <LighterHeader>BruinMeet in Action</LighterHeader>
          <VideoWrapper>
            <LandingVideo controls preload="metadata" poster={poster}>
              <source src={video} type="video/mp4" />
              Your browser does not support this video.
            </LandingVideo>
          </VideoWrapper>
          <Subtitle color={colors.lightishGrey}>
            {
              "BruinMeet makes dating fun and easy. Spending all day swiping through people isn't what dating should be. Instead of swiping or crazy algorithms, we believe the best way to tell if there's a spark is to meet in person."
            }
          </Subtitle>
        </VideoCloudBackground>
        <HowItWorksWrapper>
          <HowItWorksTitle>How It Works</HowItWorksTitle>
          {descriptions.map(renderDiscItem)}
        </HowItWorksWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, {})(LandingPage)
