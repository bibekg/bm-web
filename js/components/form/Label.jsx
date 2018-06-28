// @flow

import styled from 'styled-components'
import { colors } from 'styles'

export default styled.label`
  display: block;
  font-size: 18px;
  font-weight: 400;
  margin: 8px 0px;
  ${props =>
    props.required &&
    `
    :after {
      content: '*';
      color: ${colors.red};
      margin-left: 3px;
    }
  `};
`
