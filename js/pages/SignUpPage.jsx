// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from 'components/typography'
import { UpsideDownTopWave } from 'components/waves'
import Brand from 'components/Brand'
import SecureUserImage from 'components/SecureUserImage'
import PageContainer from 'components/PageContainer'
import { breakpoints, colors, sizes } from 'styles'
import * as SignUp from 'components/SignUp'
import * as actions from 'actions'

const SignUpPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const WaveDiv = UpsideDownTopWave.extend`
  width: 100%;
  @media (max-width: ${breakpoints.navFold - 1}px) {
    height: 120px;
  }
  @media (min-width: ${breakpoints.navFold}px) {
    height: 10vw;
  }
`

const FormPageContainer = PageContainer({
  noBackground: true,
  maxWidth: {
    large: `${sizes.profileEditWidth}px`
  }
}).extend`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -100px;
  width: 100%;
`

const BrandWrapper = styled.div`
  background-color: ${colors.waveBlue};
  width: 100%;
`

const UserGreeting = styled.div`
  text-align: center;
`

type PropsType = {
  user: ?UserType
}

class SignUpPage extends React.Component<PropsType> {
  static renderSignUpForm(user: UserType): React.Element<*> {
    if (!user.email) {
      return <SignUp.Email />
    } else if (!user.hasProfile) {
      // Strange Flow error here about expected rest parameters...
      // flow-disable-next-line
      return <SignUp.Main />
    } else {
      return <Redirect to="/main" />
    }
  }

  render(): ?React.Element<*> {
    const { user } = this.props
    // eslint-disable-next-line
    const userId = user && user._id
    return user ? (
      <SignUpPageWrapper>
        <BrandWrapper>
          <Brand />
        </BrandWrapper>

        <WaveDiv />

        <FormPageContainer>
          <FormWrapper>
            <UserGreeting>
              <SecureUserImage userId={userId} />
              <Title>{`Hi, ${user.name.first}.`}</Title>
            </UserGreeting>

            {SignUpPage.renderSignUpForm(user)}
          </FormWrapper>
        </FormPageContainer>
      </SignUpPageWrapper>
    ) : null
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user
})

export default connect(mapStateToProps, actions)(SignUpPage)
