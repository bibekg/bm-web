// @flow

import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { rgba } from 'polished'
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
  border-bottom: 4px solid ${rgba(colors.blue, 0)};
  transition: 0.5s ease border-bottom-color;

  &.active {
    font-weight: bold;
    border-bottom-color: ${rgba(colors.blue, 1)};
  }
`

type PropsType = {
  showAdminTools: boolean
}

export default function AdminNavbar({ showAdminTools }: PropsType): React.Element<*> {
  return (
    <NavWrapper>
      <NavItem exact to="/admin">
        Main
      </NavItem>
      <NavItem to="/admin/apidocs">API Docs</NavItem>
      <NavItem to="/admin/components">Components</NavItem>
      {showAdminTools && <NavItem to="/admin/tools">Admin Tools</NavItem>}
    </NavWrapper>
  )
}
