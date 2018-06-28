// @flow

import * as React from 'react'
import { withRouter } from 'react-router-dom'

type PropsType = {
  // eslint-disable-next-line
  location: any,
  children: React.Node
}

class ScrollToTop extends React.Component<PropsType, {}> {
  componentDidUpdate(prevProps: PropsType) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render(): React.Node {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
