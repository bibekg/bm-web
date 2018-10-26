// @flow

import * as React from 'react'
import styled from 'styled-components'
import { ExpandMoreIcon } from 'components/icons'
import { Text } from 'components/typography'
import { colors } from 'styles'

type PropsType = {
  isFolded: boolean,
  text?: string,
  onClick: (SyntheticEvent<*>) => void,
  iconColor: string
}

const FoldSwitchDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RotateDiv = styled.div`
  transform: rotate(${props => (props.isFolded ? '0' : '180')}deg);
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
      {props.isFolded && props.text && <FoldedText>{props.text}</FoldedText>}
      <RotateDiv isFolded={props.isFolded}>
        <ExpandMoreIcon fill={props.iconColor} size={40} />
      </RotateDiv>
    </FoldSwitchDiv>
  )
}

FoldSwitch.defaultProps = {
  iconColor: colors.lightBlue
}

export default FoldSwitch
