// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import AdminNavbar from 'components/AdminNavbar'
import AdminMainView from 'components/AdminMainView'
import AdminMatchmakingView from 'components/AdminMatchmakingView'
import AdminAPIDocsView from 'components/AdminAPIDocsView'
import AdminComponentsView from 'components/AdminComponentsView'
import AdminToolsView from 'components/AdminToolsView'
import { sizes } from 'styles'
import * as actions from 'actions'

const AdminPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;
  flex: 1 1 auto;
`

// position: -webkit-sticky for Safari browser support
const NavWrapper = styled.div`
  z-index: 1;
  position: -webkit-sticky;
  position: sticky;
  height: ${sizes.adminNavbarHeight}px;
`

const ContentWrapper = styled.div`
  z-index: 0;
  flex: 1 1 auto;
  display: flex;
  flex-flow: column;
`

type PropsType = {
  getAdminStats: () => void
}

class AdminPage extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props)
    props.getAdminStats()
  }

  render(): React.Element<*> {
    return (
      <AdminPageWrapper>
        <NavWrapper>
          <AdminNavbar />
        </NavWrapper>
        <ContentWrapper>
          <Route exact path="/admin" component={AdminMainView} />
          <Route exact path="/admin/matchmaking" component={AdminMatchmakingView} />
          <Route exact path="/admin/apidocs" component={AdminAPIDocsView} />
          <Route exact path="/admin/components" component={AdminComponentsView} />
          <Route exact path="/admin/tools" component={AdminToolsView} />
        </ContentWrapper>
      </AdminPageWrapper>
    )
  }
}

export default connect(() => ({}), actions, null, { pure: false })(AdminPage)
