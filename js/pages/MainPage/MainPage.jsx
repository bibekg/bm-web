// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors } from 'styles'
import PageContainer from 'components/PageContainer'
import FeedbackCard from 'components/FeedbackCard'
import MatchActionControl from 'components/MatchActionControl'
import FunProfileModal from 'components/FunProfileModal'
import MatchCountdownTimer from 'components/MatchCountdownTimer'
import * as USER_PROPS from 'constants/user-props'
import * as actions from 'actions'

const ContentWrapper = PageContainer().extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.paleBlue};
`

const MatchActionWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`

const FeedbackCardWrapper = styled.div`
  width: 100%;
`

type PropsType = {
  user: ?UserType,
  match: ?MatchType,
  getMatch: () => void,
  getCountdownTime: (callback: ReduxCallbackType<Date>) => void
}

type StateType = {
  availability: Array<Date>,
  countDownTime: Date
}

class MainPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      countDownTime: new Date()
    }
    props.getMatch()
    props.getCountdownTime((err, countDownTime) => {
      if (!err)
        this.setState({
          countDownTime
        })
    })
  }

  render(): React.Element<*> {
    const { user, match } = this.props

    return (
      <div>
        {user && user.answers.length !== Object.keys(USER_PROPS.QUESTIONS).length && <FunProfileModal />}
        <ContentWrapper>
          <MatchActionWrapper>
            {user && match ? (
              <MatchActionControl user={user} match={match} countDownTime={this.state.countDownTime} />
            ) : (
              <MatchCountdownTimer countDownTime={this.state.countDownTime} />
            )}
          </MatchActionWrapper>

          <FeedbackCardWrapper>
            <FeedbackCard />
          </FeedbackCardWrapper>
        </ContentWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user,
  match: state.match
})

export default connect(mapStateToProps, actions)(MainPage)
