// @flow

import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { colors, breakpoints } from 'styles'
import LogInButton from 'components/LogInButton'

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  height: 100%;
`

const StyledNavLink = styled(NavLink)`
  display: block;
  color: ${colors.white};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 16px;
  font-weight: 300;
  text-decoration: none;
  padding: 0 20px;
  text-align: center;
  line-height: 67px;
  height: 100%;
  width: 100%;
  transition: 0.3s ease border-color, font-weight;
  &:hover {
    font-weight: bold;
  }
`

const StyledListItem = styled.li`
  height: 100%;
  /* On large-width screens, show nav links horizontally and indicate active tab using white bottom border */
  @media (min-width: ${breakpoints.navFold}px) {
    display: inline-block;
    & > * {
      background-color: ${colors.blue};
      border-bottom: 3px solid transparent;
      &.active {
        border-bottom-color: ${props => (props.showBottomBorder ? 'white' : 'transparent')};
      }
    }
  }
  /* On small-width screens, show nav links vertically, and indicate active using negative color */
  @media (max-width: ${breakpoints.navFold - 1}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > * {
      background-color: ${colors.blue};
      color: ${colors.white};
      &.active {
        background-color: ${colors.white};
        color: ${colors.blue};
      }
    }
  }
`

const LogInButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  background-color: ${colors.blue};
`

const NavItem = (props: { link: string, name: string }) => (
  <StyledListItem showBottomBorder>
    <StyledNavLink to={props.link}>{props.name}</StyledNavLink>
  </StyledListItem>
)

function LoggedInLinks(): React.Element<*> {
  return (
    <StyledList>
      <NavItem link="/recent" name="Recent Matches" />
      <NavItem link="/main" name="Main" />
      <NavItem link="/profile" name="Profile" />
      <NavItem link="/faq" name="FAQs" />
      <StyledListItem>
        <LogInButtonWrapper>
          <LogInButton plain />
        </LogInButtonWrapper>
      </StyledListItem>
    </StyledList>
  )
}

function LoggedOutLinks(): React.Element<*> {
  return (
    <StyledList>
      <NavItem link="/about" name="About" />
      <StyledListItem>
        <LogInButtonWrapper>
          <LogInButton />
        </LogInButtonWrapper>
      </StyledListItem>
    </StyledList>
  )
}

export default function LinkControl(props: { isLoggedIn: boolean }): React.Element<*> {
  const isLoggedIn = props.isLoggedIn
  return <div>{isLoggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}</div>
}
