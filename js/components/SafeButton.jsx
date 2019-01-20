// @flow

import * as React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
import Spinner from 'components/Spinner'
import { Text } from 'components/typography'
import type { ButtonPropsType } from 'components/Button'

const SafeButtonWrapper = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;

  ${Button} {
    flex-shrink: 0;
  }
`

type PropsType = {
  buttonProps: ButtonPropsType,
  onClick: (SyntheticInputEvent<*>, (boolean) => void) => void,
  children: React.Node,
  workingText: ?string
}

type StateType = {
  status: 'unpressed' | 'working' | 'done'
}

/**
 * SafeButton
 * A higher-order Button that offers the added functionality of replacing itself
 * with a loading spinner while the action associated with the button is in progress.
 */
export default class SafeButton extends React.Component<PropsType, StateType> {
  static defaultProps = {
    buttonProps: {}
  }

  constructor(props: PropsType) {
    super(props)
    this.state = {
      status: 'unpressed'
    }
  }

  handleClick = (event: SyntheticInputEvent<*>) => {
    this.setState({ status: 'working' })
    this.props.onClick(event, confirmed => {
      this.setState({ status: confirmed ? 'done' : 'unpressed' })
    })
  }

  render(): * {
    const renderOptions = {
      unpressed: (
        <SafeButtonWrapper>
          <Button {...this.props.buttonProps} onClick={this.handleClick}>
            {this.props.children}
          </Button>
        </SafeButtonWrapper>
      ),
      working: (
        <SafeButtonWrapper>
          <Spinner />
          {this.props.workingText && <Text>{this.props.workingText}</Text>}
        </SafeButtonWrapper>
      ),
      done: (
        <SafeButtonWrapper>
          <Button {...this.props.buttonProps} onClick={this.handleClick}>
            {this.props.children}
          </Button>
          <Text>Done!</Text>
        </SafeButtonWrapper>
      )
    }
    return renderOptions[this.state.status]
  }
}
