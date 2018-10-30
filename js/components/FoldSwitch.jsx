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

  /**
   * To ensure fadein/out that doesn't leave the element interactable (e.g. highlightable,
   * picked up by screen readers, etc), we set visibility to visible/hidden depending
   * on tbe state of isFolded.
   * However, this ruins the opacity animation, so we need to "transition" visibility
   * before opacity so that the element becomes visible before becoming opaque and
   * it becomes transparent before becoming hidden. Thus we set a transition-delay
   * equal to the length of the opacity animation so this is possible.
   * HOWEVER, this transition delay will mess up when fading in, delaying for 0.3 seconds
   * before suddenly appearing in. To solve this, on fade in we need to reset the
   * transition delay to 0 so that the element instantly becomes visible before
   * actually performing the opacity animation.
   */

  visibility: ${props => (props.isFolded ? 'visible' : 'hidden')};
  opacity: ${props => (props.isFolded ? 1 : 0)}; /* 1 if folded, 0 if not */
  transition: visibility 0s linear ${props => (props.isFolded ? 0 : 0.3)}s, opacity 0.3s ease;
`

function FoldSwitch(props: PropsType): React.Element<*> {
  return (
    <FoldSwitchDiv onClick={props.onClick}>
      {props.text && <FoldedText isFolded={props.isFolded}>{props.text}</FoldedText>}
      <RotateDiv isFolded={props.isFolded}>
        <ExpandMoreIcon fill={props.iconColor} size={40} />
      </RotateDiv>
    </FoldSwitchDiv>
  )
}

FoldSwitch.defaultProps = {
  isFolded: false,
  onClick: () => {},
  iconColor: colors.lightBlue
}

export default FoldSwitch
