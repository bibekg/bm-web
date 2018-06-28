// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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

const WhiteLink = styled(Link)`
  color: white;
`

export default function ErrorPage(): React.Element<*> {
  return (
    <BlueWaveBackground>
      <PageWrapper>
        <WhiteHeader>OOPS!</WhiteHeader>
        <WhiteTitle>{"Something's wrong here..."}</WhiteTitle>
        <WhiteSubtitle>{"It's not you. It's us."}</WhiteSubtitle>
        <WhiteLink to="/">Take me home</WhiteLink>
      </PageWrapper>
    </BlueWaveBackground>
  )
}
