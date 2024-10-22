// @flow

import * as React from 'react'

type PropsType = {
  fill?: string,
  size?: number
}

export default function ExpandMoreIcon(props: PropsType): React.Element<*> {
  return (
    <svg
      fill={props.fill}
      height={props.size}
      width={props.size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  )
}

ExpandMoreIcon.defaultProps = {
  fill: '#000000',
  size: 24
}
