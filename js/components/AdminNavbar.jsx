// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors, shadow } from 'styles'

const NavWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-shadow: ${shadow};
  background-color: ${colors.white};
`

const NavItem = styled(Link)`
  padding: 15px;
  color: ${colors.blue};
  text-decoration: none;
`

type PropsType = {
  showAdminTools: boolean
}

export default function AdminNavbar({ showAdminTools }: PropsType): React.Element<*> {
  return (
    <NavWrapper>
      <NavItem to="/admin">Main</NavItem>
      <NavItem to="/admin/apidocs">API Docs</NavItem>
      <NavItem to="/admin/components">Components</NavItem>
      {showAdminTools && <NavItem to="/admin/tools">Admin Tools</NavItem>}
    </NavWrapper>
  )
}
