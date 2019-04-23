// @flow
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react'
import styled from 'styled-components'
import RecentMatchCard from 'components/RecentMatchCard'

const MatchActionWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`

type PropsType = {
  user: UserType,
  matches: Array<MatchType>
}

type StateType = {
  availability: Array<Date>,
  showDislikeFeedbackModal: boolean
}

export default class RecentMatchesActionControl extends React.Component<PropsType, StateType> {
  render(): React.Element<*> {
    const { matches } = this.props
    return (
      <div>
        {matches.map(match => (
          <div key={match._id}>
            <MatchActionWrapper>
              <RecentMatchCard user={match.participants.match.user} matchBasis={match.matchBasis} foldable />
            </MatchActionWrapper>
          </div>
        ))}
      </div>
    )
  }
}
