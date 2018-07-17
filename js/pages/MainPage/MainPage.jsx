// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors } from 'styles'
import PageContainer from 'components/PageContainer'
import FeedbackCard from 'components/FeedbackCard'
import MatchActionControl from 'components/MatchActionControl'
import FunProfileModal from 'components/FunProfileModal'
import UnmatchedCountdownTimer from 'components/UnmatchedCountdownTimer'
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
  getMatch: () => void
}

type StateType = {
  availability: Array<Date>
}

class MainPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    props.getMatch()
  }

  render(): React.Element<*> {
    const { user, match } = this.props

    return (
      <div>
        {user && user.answers.length !== Object.keys(USER_PROPS.QUESTIONS).length && <FunProfileModal />}
        <ContentWrapper>
          <MatchActionWrapper>
            {user && match ? <MatchActionControl user={user} match={match} /> : <UnmatchedCountdownTimer />}
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
