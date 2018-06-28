// @flow

import styled from 'styled-components'
import { breakpoints, colors } from 'styles'

export const Header = styled.div`
  text-align: center;
  ${'' /* text-transform: uppercase; */} font-weight: bold;
  font-size: 50px;
  color: ${colors.blue};
  margin: 0px 10px;

  @media (max-width: ${breakpoints.navFold - 1}px) {
    font-size: 40px;
    letter-spacing: 0px;
  }
  @media (min-width: ${breakpoints.navFold}px) {
    font-size: 50px;
    letter-spacing: 3px;
  }
`

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  color: ${colors.black};
  text-align: ${props => props.align || 'center'};

  @media (max-width: 700px) {
    font-size: 20px;
  }
`

export const Subtitle = styled(Title)`
  font-size: 18px;
  line-height: 30px;
  color: ${props => props.color || colors.grey};

  @media (max-width: 700px) {
    font-size: 18px;
  }
`

export const Text = styled.p`
  font-size: ${props => (props.size ? props.size : 14)}px;
  font-weight: ${props => (props.bold ? 400 : 300)};
  line-height: ${props => 14 * (props.paragraph ? 2.0 : 1.37)}px;
  color: ${props => (props.color ? props.color : colors.grey)};
  ${props => props.center && 'text-align: center;'} letter-spacing: 0.8px;
  margin: 5px 0;
`
