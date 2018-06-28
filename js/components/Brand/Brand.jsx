// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import img from './logo.svg'

const BrandDiv = styled.div`
  line-height: 70px;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 24px;
  font-weight: 300;
  line-height: inherit;
  display: flex;
  align-items: center;
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin: 0 10px;
`

const Logo = () => <Img alt="" src={img} />

export default function Brand(): React.Element<*> {
  return (
    <BrandDiv>
      <StyledLink to="/">
        <Logo />
        Bruin<strong>Meet</strong>
      </StyledLink>
    </BrandDiv>
  )
}
