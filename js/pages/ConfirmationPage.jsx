// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Text } from 'components/typography'
import { TopWave } from 'components/waves'
import { colors } from 'styles'
import * as actions from 'actions'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const TopWaveDiv = TopWave.extend`
  height: 30vh;
`

const ContentDiv = styled.div`
  background-color: ${colors.waveBlue};
  padding: 0 25px;
  min-height: 76vh;
  width: 100%;
  ${'' /*  Bridges unexplainable white gap below wave */} position: relative;
  top: -1px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const ConfirmationTitle = styled.h1`
  color: white;
  font-size: 50px;
  font-weight: 300;
  line-height: ${50 * 1.2}px;
  margin-bottom: 10px;
`

const ConfirmationText = styled.p`
  font-size: 20px;
  font-weight: 300;
  max-width: 400px;
  color: ${colors.white};
`

const ResendText = Text.extend`
  color: ${props => (props.error ? colors.red : colors.white)};
  font-size: 16px;
`

const ResendSpan = styled.span`
  font-weight: bold;
  cursor: pointer;
`

const Footnote = Text.extend`
  color: ${colors.white};
  font-size: 14px;
  margin-top: 20px;
  max-width: 410px;
`

const Strong = styled.span`
  font-weight: 400;
  color: ${colors.white};
`

type PropsType = {
  isLoggedIn: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  requestEmailVerification: (?string, ?ReduxCallbackType<*>) => void
}

type StateType = {
  resendRequested: boolean,
  resendResponse: null | true | Error
}

class ConfirmationPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      resendRequested: false,
      resendResponse: null
    }
  }

  requestAnotherEmail = () => {
    this.props.requestEmailVerification(null, (err, res) => {
      if (err) {
        this.setState({ resendResponse: err })
      }

      if (res && res.data) {
        if (res.data.status === 'success') {
          this.setState({ resendResponse: true })
          return
        } else if (res.data.status === 'failure') {
          this.setState({ resendResponse: new Error(res.message) })
          return
        }
      }

      this.setState({ resendResponse: new Error('Unknown error') })
    })
  }

  renderResend = (): ?React.Element<*> => {
    const { resendResponse } = this.state

    if (typeof resendResponse === 'boolean') {
      return <ResendText>Sent another email. Check your inbox.</ResendText>
    } else if (resendResponse instanceof Error) {
      return <ResendText error>{resendResponse.message}</ResendText>
    } else {
      return (
        <ResendText>
          {"Didn't get it? "}
          <ResendSpan tabIndex={0} role="button" onClick={this.requestAnotherEmail}>
            Resend.
          </ResendSpan>
        </ResendText>
      )
    }
  }

  render(): React.Element<*> {
    return (
      <WrapperDiv>
        <TopWaveDiv />
        <ContentDiv>
          <ConfirmationTitle align="left">
            Welcome to Bruin<Strong>Meet</Strong>
          </ConfirmationTitle>
          <ConfirmationText align="left">
            We sent a verification email to your UCLA email address. Please verify your account to continue.
          </ConfirmationText>
          {this.props.isLoggedIn && this.renderResend()}
          <Footnote>
            *Please note, if the confirmation link does not work, try clicking again or opening in a different browser.
          </Footnote>
        </ContentDiv>
      </WrapperDiv>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, actions)(ConfirmationPage)
