// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors, animations } from 'styles'
import color from 'color'
import * as actions from 'actions'
import CameraIcon from 'components/icons/CameraIcon'

// eslint-disable-next-line
const DEFAULT_SIZE = 150

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`

const UpdatePictureUnit = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  height: ${props => (props.updating ? '0' : '40')}%;
  opacity: ${props => (props.updating ? 0 : 1)};
  border-bottom-left-radius: ${props => props.size / 2}px;
  border-bottom-right-radius: ${props => props.size / 2}px;
  transition: 0.3s ease opacity, 0.3s ease height, 0.3s ease top, 0.3s ease border-radius;

  background-color: ${color(colors.black)
    .alpha(0.5)
    .string()};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    height: 100%;
  }
`

const OuterRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: ${props => Math.floor(props.size / 20)}px solid ${colors.blue};
  transition: 0.3s ease border-color;

  ${props =>
    props.updating &&
    `
      border-color: transparent;
      border-top-color: ${colors.blue};
      animation: 1s ${animations.rotate360} ease infinite;
  `};
`

const InnerRing = styled.div`
  width: 100%;
  height: 100%;
  border: 10px solid ${colors.white};
`

const StyledUserImage = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.src});
  overflow: hidden;
`

const HiddenUploadInput = styled.input.attrs({
  type: 'file',
  accept: 'image/*'
})`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
`

type PropsType = {
  src: string,
  editable: boolean,
  size: number,
  // eslint-disable-next-line flowtype/no-weak-types
  updateUserProfilePic: (File, ?ReduxCallbackType<*>) => void
}

type StateType = {
  updating: boolean
}

const MAX_SIZE_MB = 3
const TOO_LARGE_MESSAGE = `Profile pictures may not exceed ${MAX_SIZE_MB}MB. Please try again with a smaller image.`

class UserImage extends React.Component<PropsType, StateType> {
  photoUploadInput: ?HTMLInputElement

  static defaultProps = {
    size: 150,
    editable: false
  }

  constructor(props: PropsType) {
    super(props)
    this.state = {
      updating: false
    }
  }

  handleUpdatePictureClick = () => {
    if (this.photoUploadInput) {
      this.photoUploadInput.click()
    }
  }

  handlePictureSelection = () => {
    const picture = this.photoUploadInput && this.photoUploadInput.files[0]
    if (picture) {
      if (picture.size > MAX_SIZE_MB * 10 ** 6) {
        // eslint-disable-next-line no-alert
        window.confirm(TOO_LARGE_MESSAGE)
      } else {
        this.setState({ updating: true })
        this.props.updateUserProfilePic(picture, err => {
          this.setState({ updating: false })
          if (err) {
            // Notify user that their file was too large (413 Entity Too Large)
            if (err.response && err.response.status === 413) {
              // eslint-disable-next-line no-alert
              window.confirm(TOO_LARGE_MESSAGE)
            }
          }
        })
      }
    }
  }

  renderUpdatePictureUnit(): React.Element<*> {
    return (
      <UpdatePictureUnit
        className="update-picture-unit"
        size={this.props.size}
        updating={this.state.updating}
        onClick={this.handleUpdatePictureClick}
      >
        <CameraIcon color={colors.white} />
        <HiddenUploadInput
          innerRef={(photoUploadInput: ?HTMLInputElement) => {
            this.photoUploadInput = photoUploadInput
          }}
          onChange={this.handlePictureSelection}
        />
      </UpdatePictureUnit>
    )
  }

  render(): React.Element<*> {
    return (
      <Wrapper size={this.props.size}>
        <OuterRing size={this.props.size} updating={this.state.updating} />
        <InnerRing size={this.props.size}>
          <StyledUserImage updating={this.state.updating} src={this.props.src} size={this.props.size}>
            {this.props.editable && this.renderUpdatePictureUnit()}
          </StyledUserImage>
        </InnerRing>
      </Wrapper>
    )
  }
}

export default connect(null, actions)(UserImage)
