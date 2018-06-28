// @ flow
import styled from 'styled-components'
import { colors } from 'styles'
import img from './img/wave-landing.svg'

const BlueWaveBackground = styled.div`
  height: 100vh;
  padding: 5%;
  box-sizing: border-box;
  background-color: ${colors.blue};
  background-image: url(${img});
  background-size: cover;
  background-attachment: fixed;
`
export default BlueWaveBackground
