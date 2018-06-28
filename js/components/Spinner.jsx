// @flow

import styled from 'styled-components'
import { colors, animations } from 'styles'

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top: 4px solid ${colors.blue};
  animation: ${animations.rotate360} 1s ease infinite;
`

export default Spinner
