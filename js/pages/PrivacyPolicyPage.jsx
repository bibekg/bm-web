// @flow

import * as React from 'react'
import styled from 'styled-components'
import { breakpoints } from 'styles'
import StaticTextContentDisplay from 'components/StaticTextContentDisplay'
import privacyContent from 'static-data/privacy-policy'

const PageWrapper = styled.div`
  @media (min-width: ${breakpoints.feedbackFold}px) {
    padding: 20px 10%;
  }
  @media (max-width: ${breakpoints.feedbackFold - 1}px) {
    padding: 15px 5%;
  }
`

export default function PrivacyPolicy(): React.Element<*> {
  return (
    <PageWrapper>
      <StaticTextContentDisplay title="BruinMeet Privacy Policy" contentList={privacyContent} />
    </PageWrapper>
  )
}
