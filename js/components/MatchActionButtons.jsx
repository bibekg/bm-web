// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import styled from 'styled-components'
import Button from 'components/Button'

const MatchActionButtonsDiv = styled.div`
  display: flex;
  flex-direction: row nowrap;
  justify-content: center;
  margin-top: 20px;
  & > * {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`

type PropsType = {
  postMatchAction: (boolean, ?ReduxCallbackType<*>) => void,
  getUser: () => void,
  scheduleFirst: boolean
}

function MatchActionButtons(props: PropsType): React.Element<*> {
  const handleLikeAction = () => {
    props.postMatchAction(true)
  }

  const handleDislikeAction = () => {
    props.postMatchAction(false)
  }

  return (
    <MatchActionButtonsDiv>
      <Button onClick={handleLikeAction} primary>
        {props.scheduleFirst ? 'Going' : 'Like'}
      </Button>
      <Button onClick={handleDislikeAction}>{props.scheduleFirst ? "Can't Go" : 'Dislike'}</Button>
    </MatchActionButtonsDiv>
  )
}

export default connect(null, actions)(MatchActionButtons)
