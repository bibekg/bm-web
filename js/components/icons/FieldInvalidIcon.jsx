// @flow

import * as React from 'react'
import { colors } from 'styles'

type PropsType = {
  color?: string,
  size?: number
}

export default function FieldInvalidIcon(props: PropsType): React.Element<*> {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      fill={props.color}
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
    </svg>
  )
}

FieldInvalidIcon.defaultProps = {
  color: colors.red,
  size: 10
}
