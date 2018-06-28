// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Subtitle, Text } from 'components/typography'
import { colors } from 'styles'

const StyledLink = styled(Link)`
  text-decoration: none;
  padding-bottom: 30px;
  font-size: 14px;

  &:hover {
    color: ${colors.lightGrey};
  }
`

const Foot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.dark ? colors.blue : colors.white)};
  ${StyledLink} {
    color: ${props => (props.dark ? colors.white : colors.grey)};
  }
  ${'' /* Prevents a small gap below footer and end of page. */} overflow: hidden;
`

const Col = styled.div`
  flex: 1;
  text-align: ${props => (props.left ? 'right' : 'left')};
  margin: 2% 5%;
`

type PropsType = {
  dark: boolean
}

export default function Footer(props: PropsType): React.Element<*> {
  return (
    <Foot dark={props.dark}>
      <Col>
        <Subtitle color={props.dark ? colors.white : colors.grey} align="left">
          BruinMeet
        </Subtitle>
        <StyledLink to={'/about'}>Team</StyledLink>
        <br />
        <StyledLink to={'/faq'}>FAQs</StyledLink>
        <br />
        <StyledLink to={'/privacy'}>Privacy Policy</StyledLink>
        <br />
        <StyledLink to={'/terms'}>Terms of Service</StyledLink>
      </Col>
      <Col left>
        <Subtitle color={props.dark ? colors.white : colors.grey} align="right">
          Contact Us
        </Subtitle>
        <Text color={props.dark ? colors.white : colors.grey}>support@bruinmeet.com</Text>
      </Col>
    </Foot>
  )
}

Footer.defaultProps = {
  dark: false
}
