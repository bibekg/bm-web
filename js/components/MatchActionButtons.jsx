// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import * as actions from 'actions'
import Button from 'components/Button'
import { copy } from 'product-copy'

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
  getUser: () => void
}

function MatchActionButtons(props: PropsType): React.Element<*> {
  const handleLikeAction = () => {
    props.postMatchAction(true)
  }

  const handlePassAction = () => {
    props.postMatchAction(false)
  }

  return (
    <MatchActionButtonsDiv>
      <Button onClick={handleLikeAction} primary>
        {copy.matchActionButtons.like}
      </Button>
      <Button onClick={handlePassAction}>{copy.matchActionButtons.pass}</Button>
    </MatchActionButtonsDiv>
  )
}

export default connect(null, actions)(MatchActionButtons)
