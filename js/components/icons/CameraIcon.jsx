// @flow

import * as React from 'react'
import { colors } from 'styles'

type PropsType = {
  color?: string,
  size?: number
}

export default function CameraIcon(props: PropsType): React.Element<*> {
  return (
    <svg
      fill={props.color}
      height={props.size}
      width={props.size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="3.2" />
      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  )
}

CameraIcon.defaultProps = {
  color: colors.black,
  size: 25
}
