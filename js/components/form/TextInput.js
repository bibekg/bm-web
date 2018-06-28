// @flow

import styled from 'styled-components'
import { colors, fonts } from 'styles'
import { placeholderMixin } from 'styles/mixins'

export default styled.input`
  width: 100%;
  padding: 10px 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${colors.white};
  border-bottom: 2px solid ${colors.blue};
  outline: none;
  font-size: 16px;
  font-weight: 300;
  font-family: ${fonts.primary.family};

  &::placeholder {
    color: ${colors.grey};
  }

  &:invalid {
    border-bottom-color: ${colors.red};
  }

  ${placeholderMixin};
`
