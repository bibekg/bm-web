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

const WhiteTitle = Title.extend.attrs({
  align: 'left'
})`
  font-size: 30px;
  color: white;
`

const WhiteSubtitle = Subtitle.extend.attrs({
  align: 'left'
})`
  color: white;
  letter-spacing: 2px;
`

export default function SiteDownPage(): React.Element<*> {
  return (
    <BlueWaveBackground>
      <PageWrapper>
        <WhiteHeader>OOPS!</WhiteHeader>
        <WhiteTitle>{"Something's wrong with our servers..."}</WhiteTitle>
        <WhiteSubtitle>{"We're actively trying to fix the issue so please try again in a little while."}</WhiteSubtitle>
      </PageWrapper>
    </BlueWaveBackground>
  )
}
