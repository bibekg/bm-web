// @flow

import React from 'react'
import { Title, Text } from 'components/typography'

type ToolPagePropsType = {
  title: string,
  subitlte: string
}

export const makeToolPage = Component => (props: ToolPagePropsType) => (
  <div>
    <Title align="left">{props.title}</Title>
    <Text paragraph>{props.subtitle}</Text>
    <Component />
  </div>
)

export { default as DeleteUser } from './DeleteUser'
export { default as CreateMatch } from './CreateNewMatch'
export { default as EditMatch } from './EditMatch'
export { default as RunMatchmaking } from './RunMatchmaking'
