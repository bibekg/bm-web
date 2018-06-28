// @flow

import * as React from 'react'
import styled from 'styled-components'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  position: relative;
  z-index: 0;
`

// position: -webkit-sticky for Safari browser support
const NavBarWrapper = styled.div`
  z-index: 1;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`

const WrappedComponentWrapper = styled.div`
  position: relative;
  z-index: -2;
  flex: 1 1 auto;
  display: flex;
  flex-flow: column;
`

const navBarWrapper = (WrappedComponent: React.ComponentType<{}>, darkFooter: ?boolean): * => () => (
  <Container>
    <NavBarWrapper>
      <NavBar />
    </NavBarWrapper>
    <WrappedComponentWrapper>
      <WrappedComponent />
    </WrappedComponentWrapper>
    <Footer dark={darkFooter || false} />
  </Container>
)

export default navBarWrapper
