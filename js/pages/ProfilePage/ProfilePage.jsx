// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors } from 'styles'
import { Header } from 'components/typography'
import PageContainer from 'components/PageContainer'
import ProfileCard from 'components/ProfileCard'

const PageWrapper = PageContainer().extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.paleBlue};
`
const CardWrapper = styled.div`
  margin-top: 25px;
`

type PropsType = {
  user: ?UserType
}

function ProfilePage(props: PropsType): React.Element<*> {
  return (
    <PageWrapper>
      {props.user && (
        <div>
          <Header>Your Profile</Header>
          <CardWrapper>
            <ProfileCard user={props.user} />
          </CardWrapper>
        </div>
      )}
    </PageWrapper>
  )
}

const mapStateToProps = (state: ReduxStateType) => ({
  user: state.user
})

export default connect(mapStateToProps, {})(ProfilePage)
