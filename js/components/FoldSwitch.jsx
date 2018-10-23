// @flow

import * as React from 'react'
import styled from 'styled-components'
import { ExpandMoreIcon } from 'components/icons'

type PropsType = {
  isFolded: boolean,
  onClick: () => void
}

const FoldSwitchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${(props: PropsType) => (props.isFolded ? '0' : '180')}deg);
  transform-origin: center;
  transition: 0.2s;
`

function FoldSwitch(props: PropsType): React.Element<*> {
  return (
    <FoldSwitchDiv isFolded={props.isFolded} onClick={props.onClick}>
      <ExpandMoreIcon fill={'#76AFFB'} size={40} />
    </FoldSwitchDiv>
  )
}

export default FoldSwitch
