// @flow

import * as React from 'react'
import styled from 'styled-components'
import { ExpandMoreIcon } from 'components/icons'
import { Text } from 'components/typography'

type PropsType = {
  isFolded: boolean,
  text?: string,
  onClick: () => void
}

const FoldSwitchDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RotateDiv = styled.div`
  transform: rotate(${(props: PropsType) => (props.isFolded ? '0' : '180')}deg);
  transform-origin: center;
  transition: 0.2s;
`

const FoldedText = Text.extend`
  margin: 0;
  text-align: center;

  /* TODO: add a fade out animation to this text */
`

function FoldSwitch(props: PropsType): React.Element<*> {
  return (
    <FoldSwitchDiv onClick={props.onClick}>
      {props.isFolded && <FoldedText>{props.text}</FoldedText>}
      <RotateDiv isFolded={props.isFolded}>
        <ExpandMoreIcon fill={'#76AFFB'} size={40} />
      </RotateDiv>
    </FoldSwitchDiv>
  )
}

export default FoldSwitch
