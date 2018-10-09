// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Header, Title, Subtitle } from 'components/typography'
import { BlueWaveBackground } from 'components/waves'

const PageWrapper = styled.div`
  padding: 200px 20px 20px;
`

const WhiteHeader = Header.extend`
  font-size: 80px;
  color: white;
  text-align: left;
  margin: 0;
  letter-spacing: 5px;
`

const WhiteTitle = styled(Title)`
  font-size: 30px;
  color: white;
`

const WhiteSubtitle = styled(Subtitle)`
  color: white;
  letter-spacing: 2px;
`

export default function SiteDownPage(): React.Element<*> {
  return (
    <BlueWaveBackground>
      <PageWrapper>
        <WhiteHeader>BRB</WhiteHeader>
        <WhiteTitle align="left">{"We're making some improvements to BruinMeet."}</WhiteTitle>
        <WhiteSubtitle align="left">{"Sit tight, we'll be back soon."}</WhiteSubtitle>
      </PageWrapper>
    </BlueWaveBackground>
  )
}
