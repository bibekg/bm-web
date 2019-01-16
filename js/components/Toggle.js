// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

const ToggleFrame = styled.div`
  width: 44px;
  height: 25px;
  border: 3px solid ${colors.blue};
  background: ${colors.blue};
  border-radius: 6px;
  column-count: 2;
  column-gap: 0px;
  cursor: pointer;
  opacity: ${props => (props.enabled ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
`

const ToggleInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: white;
  opacity: ${props => (props.enabled ? 1 : 0)};
  transition: transform 0.25s ease;
  transform: translate(
    ${(props: { enabled: boolean, left: boolean }): string => {
      if (props.enabled) {
        return '0'
      }
      return props.left ? '100' : '-100'
    }}%
  );
`

type PropsType = {
  name: ?string,
  enabled: boolean,
  onClick: (SyntheticInputEvent<*>) => void
}

export default function Toggle(props: PropsType): React.Element<*> {
  return (
    <ToggleFrame
      enabled={props.enabled}
      onClick={() => {
        props.onClick({
          target: {
            name: props.name,
            value: !props.enabled
          }
        })
      }}
    >
      <ToggleInner enabled={!props.enabled} left />
      <ToggleInner enabled={props.enabled} />
    </ToggleFrame>
  )
}
