// @flow

import styled from 'styled-components'
import { colors, fonts } from 'styles'
import { placeholderMixin } from 'styles/mixins'

export default styled.textarea`
  border: 2px solid ${colors.lightBlue};
  font-family: ${fonts.primary.family};
  border-radius: 3px;
  width: 100%;
  padding: 15px;

  &::placeholder {
    color: ${colors.grey};
  }

  &:focus {
    border-color: ${colors.blue};
    outline: 0;
  }

  ${placeholderMixin};
`
