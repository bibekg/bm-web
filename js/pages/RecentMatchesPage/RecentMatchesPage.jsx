// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { colors } from 'styles'
import PageContainer from 'components/PageContainer'
import { Title } from 'components/typography'
import * as actions from 'actions'
import RecentMatchesActionControl from '../../components/RecentMatchesActionControl'

const ContentWrapper = PageContainer().extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.paleBlue};
`

type PropsType = {
  user: UserType,
  recent: ?Array<MatchType>,
  getRecentMatches: () => void
}

type StateType = {
  availability: Array<Date>
}

class RecentMatchesPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    props.getRecentMatches()
  }

  static RecentMatchesTitle = (): React.Element<*> => <Title>{'Recent Matches'}</Title>

  render(): React.Element<*> {
    const { user, recent } = this.props
    return (
      <div>
        <ContentWrapper>
          <RecentMatchesPage.RecentMatchesTitle />
          {recent && user && <RecentMatchesActionControl user={user} matches={recent} />}
        </ContentWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user,
  recent: state.recent
})

export default connect(mapStateToProps, actions)(RecentMatchesPage)
