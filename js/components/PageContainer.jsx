// @flow

import styled from 'styled-components'
import { breakpoints, colors } from 'styles'

type ContainerOptionsType = {
  maxWidth?: { small?: number, large?: number }
}

export default (userOptions?: ContainerOptionsType): * => {
  const options = {
    maxWidth: {
      small: (userOptions && userOptions.maxWidth && userOptions.maxWidth.small) || 90,
      large: (userOptions && userOptions.maxWidth && userOptions.maxWidth.large) || 65
    }
  }

  return styled.div`
    min-height: 100vh;
    /* Default to pale blue background for pages */
    background-color: ${colors.paleBlue};

    /* Large screens */
    @media (min-width: ${breakpoints.profileCard}px) {
      padding-top: 50px;
      padding-bottom: 50px;
      & > * {
        max-width: ${options.maxWidth.large}%;
      }
    }

    /* Small screens */
    @media (max-width: ${breakpoints.profileCard - 1}px) {
      padding-top: 25px;
      padding-bottom: 25px;
      & > * {
        max-width: ${options.maxWidth.small}%;
      }
    }
  `
}
