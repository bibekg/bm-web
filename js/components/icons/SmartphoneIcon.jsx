// @flow

import * as React from 'react'
import { colors } from 'styles'

type PropsType = {
  color?: string,
  size?: number
}

export default function SnapchatIcon(props: PropsType): React.Element<*> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 27.442 27.442">
      <path
        fill={props.color}
        d="M19.494 0H7.948C6.843 0 5.95.896 5.95 2v23.445c0 1.102.893 1.997 1.998 1.997h11.546c1.103 0 1.997-.895 1.997-1.997V2c0-1.104-.893-2-1.996-2zm-8.622 1.214h5.7c.144 0 .26.215.26.48s-.116.483-.26.483h-5.7c-.145 0-.26-.216-.26-.482s.115-.48.26-.48zm2.85 24.255c-.703 0-1.275-.573-1.275-1.277s.572-1.274 1.275-1.274c.7 0 1.273.57 1.273 1.273s-.572 1.276-1.273 1.276zm6.273-4.37H7.448V3.373h12.547V21.1z"
      />
    </svg>
  )
}

SnapchatIcon.defaultProps = {
  color: colors.black,
  size: 40
}
