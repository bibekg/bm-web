// @flow

import * as React from 'react'
import styled from 'styled-components'
import { sizes } from 'styles'
import { BASE_API_URL } from 'constants/api-endpoints'

const IFRAME_URL = `${BASE_API_URL}/docs`

const IFrameElement = styled.iframe`
  width: 100%;
  position: fixed;
  top: ${sizes.adminNavbarHeight};
  height: calc(100vh - ${sizes.adminNavbarHeight}px);
  flex: 1 1 auto;
  border: none;
`

export default function AdminAPIDocsView(): React.Element<*> {
  return <IFrameElement title="API Docs" src={IFRAME_URL} />
}
