// @flow

import * as React from 'react'
import { NavLink } from 'react-router-dom'
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

const NavItem = styled(NavLink)`
  padding: 15px;
  color: ${colors.blue};
  text-decoration: none;
  border-bottom: 4px solid transparent;

  &.active {
    font-weight: bold;
    border-bottom-color: ${colors.blue};
  }
`

export default function AdminNavbar(): React.Element<*> {
  return (
    <NavWrapper>
      <NavItem to="/admin">Main</NavItem>
      <NavItem to="/admin/apidocs">API Docs</NavItem>
      <NavItem to="/admin/components">Components</NavItem>
      <NavItem to="/admin/tools">Admin Tools</NavItem>
    </NavWrapper>
  )
}
