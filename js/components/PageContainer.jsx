// @flow

import styled from 'styled-components'
import { breakpoints, colors } from 'styles'
import dotty from 'dotty'

type ContainerOptionsType = {
  maxWidth?: { small?: string, large?: string },
  noBackground: ?boolean
}

const DEFAULT_MAX_WIDTH_LARGE = `${breakpoints.medium}px`
const DEFAULT_MAX_WIDTH_SMALL = '90%'

export default (userOptions?: ContainerOptionsType): * => {
  const options = {
    maxWidth: {
      small: dotty.get(userOptions, 'maxWidth.small') || DEFAULT_MAX_WIDTH_SMALL,
      large: dotty.get(userOptions, 'maxWidth.large') || DEFAULT_MAX_WIDTH_LARGE
    },
    noBackground: dotty.exists(userOptions, 'noBackground') ? dotty.get(userOptions, 'noBackground') : false
  }

  return styled.div`
    width: 100%;
    min-height: 100vh;
    /* Default to pale blue background for pages */
    ${options.noBackground ? '' : `background-color: ${colors.paleBlue}`};

    /* Large screens */
    @media (min-width: ${breakpoints.medium}px) {
      padding: 50px 20px;
      & > * {
        max-width: ${options.maxWidth.large};
      }
    }

    /* Small screens */
    @media (max-width: ${breakpoints.medium - 1}px) {
      padding: 25px 10px;
      & > * {
        max-width: ${options.maxWidth.small};
      }
    }
  `
}
