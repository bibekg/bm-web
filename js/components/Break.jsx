// @flow

import styled from 'styled-components'
import { colors } from 'styles'

const Break = styled.hr`
  margin: ${props => props.verticalSpacing} 0px;
  width: ${props => props.width};
  border: 1px solid ${props => (props.invisible ? 'transparent' : colors.blue)};
  opacity: 0.4;
`

Break.defaultProps = {
  verticalSpacing: '15px',
  width: '90%',
  invisible: false
}

export default Break
