// @flow

import * as React from 'react'
import styled from 'styled-components'
import { sizes } from 'styles'

const DOCS_ROUTE = 'api/docs'

const TOP_OFFSET = sizes.navbarHeight + sizes.adminNavbarHeight

const IFrameElement = styled.iframe`
  width: 100%;
  position: fixed;
  top: ${TOP_OFFSET};
  height: calc(100vh - ${TOP_OFFSET}px);
  flex: 1 1 auto;
  border: none;
`

export default function AdminAPIDocsView(): React.Element<*> {
  const getIFrameUrl = (): string => {
    const base = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
    return `${base}/${DOCS_ROUTE}`
  }

  return <IFrameElement title="API Docs" src={getIFrameUrl()} />
}
