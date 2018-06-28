// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { BASE_API_URL } from 'constants/api-endpoints'
import UserImage from 'components/UserImage'

type PropsType = {
  editable: boolean,
  size: ?number,
  accessToken: ?string,
  userId: string
}

type StateType = {
  source: ?string
}

class SecureUserImage extends React.Component<PropsType, StateType> {
  state = { source: null }

  defaultProps = {
    editable: false
  }

  constructor(props: PropsType) {
    super(props)
    if (props.accessToken != null) {
      this.updateSource(props.accessToken)
    }
  }

  componentWillReceiveProps(nextProps: PropsType) {
    if (this.props.accessToken == null && nextProps.accessToken != null) {
      this.updateSource(nextProps.accessToken)
    }
  }

  updateSource(accessToken: string) {
    const { userId } = this.props
    axios({
      method: 'get',
      url: `${BASE_API_URL}/user/picture/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      responseType: 'arraybuffer'
    }).then(response => {
      const byteArray = new Uint8Array(response.data)
      const base64 = btoa(byteArray.reduce((data, byte) => data + String.fromCharCode(byte), ''))
      this.setState({ source: `data:;base64,${base64}` })
    })
  }

  render(): React.Element<*> {
    return <UserImage editable={this.props.editable} size={this.props.size} src={this.state.source} />
  }
}

const mapStateToProps = (state: ReduxStateType) => ({
  accessToken: state.auth.isLoggedIn && state.auth.accessToken
})

export default connect(mapStateToProps, null)(SecureUserImage)
