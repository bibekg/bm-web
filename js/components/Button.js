// @flow

import styled from 'styled-components'
import { colors, fonts } from 'styles'

export type ButtonPropsType = {
  primary?: boolean,
  white?: boolean,
  disabled?: boolean,
  warning?: boolean
}

const getBackgroundColor = (props: ButtonPropsType): string => {
  if (props.disabled) {
    return colors.lightGrey
  }
  if (props.warning) {
    return colors.red
  } else return props.primary ? colors.blue : colors.white
}

const getBorderColor = (props: ButtonPropsType): string => {
  if (props.disabled) {
    return colors.white
  }
  if (props.warning) {
    return colors.red
  } else return props.white ? colors.white : colors.blue
}

const getTextColor = (props: ButtonPropsType): string => {
  if (props.disabled) {
    return colors.white
  }
  if (props.warning) {
    return colors.white
  } else return props.primary ? colors.white : colors.blue
}

const getHoverEffects = (props: ButtonPropsType): string => {
  if (props.disabled) return ''

  return `
    transform: scale(1.05);
  `
}

const Button = styled.button`
  border-radius: 50px;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.8px;
  padding: 7px 20px;
  text-align: center;
  font-family: ${fonts.primary.family};
  text-transform: uppercase;
  background-color: ${(props: ButtonPropsType) => getBackgroundColor(props)};
  border: solid 2px ${(props: ButtonPropsType) => getBorderColor(props)};
  color: ${(props: ButtonPropsType) => getTextColor(props)};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  &:hover {
    ${(props: ButtonPropsType) => getHoverEffects(props)};
  }

  &:focus {
    outline: none;
  }
`
export default Button
