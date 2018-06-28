// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Header, Subtitle } from 'components/typography'
import AdminStatsPanel from './AdminStatsPanel'

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10vh;
  text-align: center;
`

export default function AdminMainView(): React.Element<*> {
  return (
    <ViewWrapper>
      <Header>Stats</Header>
      <Subtitle>{'The key to building a good product is knowing who your users are and what they want.'}</Subtitle>
      <AdminStatsPanel />
    </ViewWrapper>
  )
}
