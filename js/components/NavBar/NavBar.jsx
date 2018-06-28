// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors, sizes, breakpoints } from 'styles'
import Brand from 'components/Brand'
import NavButton from './NavButton'
import LinkControl from './LinkControl'

const NavWrapper = styled.div`
  width: 100%;
  position: relative;
`

const Nav = styled.nav`
  position: relative;
  background-color: ${colors.blue};
  height: ${sizes.navbarHeight}px;
  padding: 0 20px 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const NavBrand = styled.div`
  margin: 0 10px;
`

const NavButtonDiv = styled.div`
  position: absolute;
  right: 0;
  @media (min-width: ${breakpoints.navFold}px) {
    display: none;
  }
  @media (max-width: ${breakpoints.navFold - 1}px) {
    display: block;
  }
`

const NavMenuWide = styled.div`
  height: 100%;
  @media (min-width: ${breakpoints.navFold}px) {
    display: inline-block;
  }
  @media (max-width: ${breakpoints.navFold - 1}px) {
    display: none;
  }
`

const NavMenuNarrow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  transition: all 0.5s ease;
  padding-top: ${props => (props.isOpen ? sizes.navbarHeight : 0)}px;
  transform: translateY(${props => (props.isOpen ? 0 : -100)}%);
  @media (min-width: ${breakpoints.navFold}px) {
    display: none;
  }
  @media (max-width: ${breakpoints.navFold - 1}px) {
    ${'' /* display: flex;
    flex-direction: column;
    align-items: center; */} display: block;
  }
`

type PropsType = {
  isLoggedIn: boolean
}

type StateType = {
  menuOpen: boolean
}

class NavBar extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      menuOpen: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick: () => void
  handleClick() {
    this.setState((prevState: StateType): StateType => ({
      menuOpen: !prevState.menuOpen
    }))
  }

  render(): React.Element<*> {
    return (
      <NavWrapper className="navbar">
        <Nav isOpen={this.state.menuOpen}>
          <NavBrand>
            <Brand />
          </NavBrand>

          <NavButtonDiv>
            <NavButton onClick={this.handleClick} isOpen={this.state.menuOpen} />
          </NavButtonDiv>

          <NavMenuNarrow className="navmenunarrow" isOpen={this.state.menuOpen}>
            <LinkControl isLoggedIn={this.props.isLoggedIn} />
          </NavMenuNarrow>

          <NavMenuWide className="navmenuwide">
            <LinkControl isLoggedIn={this.props.isLoggedIn} />
          </NavMenuWide>
        </Nav>
      </NavWrapper>
    )
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, {})(NavBar)
