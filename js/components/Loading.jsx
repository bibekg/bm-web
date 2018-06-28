// @flow

import * as React from 'react'
import { BlueWaveBackground } from 'components/waves'
import { Header } from 'components/typography'

const WhiteHeader = Header.extend`
  color: white;
`

type StateType = {
  text: string
}

const ORIGINAL_TEXT = 'Loading'
const SPEED = 300

class Loading extends React.Component<*, StateType> {
  interval: number
  constructor() {
    super()

    this.state = {
      text: 'Loading'
    }
  }

  componentWillMount() {
    const stopper = `${ORIGINAL_TEXT}...`
    this.interval = setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({
          text: ORIGINAL_TEXT
        })
      } else {
        this.setState({
          text: `${this.state.text}.`
        })
      }
    }, SPEED)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render(): ?React.Element<*> {
    return (
      <BlueWaveBackground>
        <WhiteHeader>{this.state.text}</WhiteHeader>
      </BlueWaveBackground>
    )
  }
}

export default Loading
