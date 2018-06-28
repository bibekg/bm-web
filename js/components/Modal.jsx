// @flow

import * as React from 'react'
import styled from 'styled-components'
import { breakpoints } from 'styles'
import Card from 'components/Card'

const ModalWrapper = styled.div`
  background-color: rgba(79, 79, 79, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;

  @media (max-width: ${breakpoints.navFold - 1}px) {
    padding: 100px 15px 20px 15px;
  }

  @media (min-width: ${breakpoints.navFold}px) {
    padding: 100px 20% 30px 20%;
  }
`

const ModalCard = Card.extend`
  max-height: 100%;
  overflow-y: scroll;
  @media (max-width: ${breakpoints.navFold - 1}px) {
    padding: 10px;
  }

  @media (min-width: ${breakpoints.navFold}px) {
    padding: 50px;
  }
`

type PropsType = {
  children: React.Node,
  // A callback that is called when the user clicks outside of the modal card if the modal is NOT 'unclosable'
  // Useful for having the composing component alter its state to cause this modal to "close"
  onOutClick: () => void
}

export default class Modal extends React.Component<PropsType> {
  modalCard: ?HTMLElement

  static defaultProps = {
    unclosable: false,
    onOutClick: () => {} // by default, clicking outside of the modal card is a no-op
  }

  handleModalClick = (event: SyntheticMouseEvent<*>) => {
    if (this.modalCard && !this.modalCard.contains(event.target)) {
      this.props.onOutClick()
    }
  }

  componentDidMount() {
    // This ensures that the body won't scroll behind the modal
    // flow-disable-next-line
    document.body.classList.add('disable-scroll')
  }

  componentWillUnmount() {
    // flow-disable-next-line
    document.body.classList.remove('disable-scroll')
  }

  render(): React.Element<*> {
    return (
      <ModalWrapper onClick={this.handleModalClick}>
        <ModalCard
          innerRef={(el: HTMLElement) => {
            this.modalCard = el
          }}
        >
          {this.props.children}
        </ModalCard>
      </ModalWrapper>
    )
  }
}
