// @flow

import * as React from 'react'
import styled from 'styled-components'
import PageContainer from 'components/PageContainer'
import { Header, Subtitle } from 'components/typography'
import FAQItem from 'components/FAQItem'
import Card from 'components/Card'
import { breakpoints, colors } from 'styles'
import faqs from './faq-data'

const PageWrapper = PageContainer().extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.paleBlue};
`

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 40px;
`

const FAQBox = Card.extend`
  max-width: 850px;
  margin: 0 auto;

  > * {
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGrey};
    }
  }
  @media (min-width: ${breakpoints.navFold}px) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.navFold - 1}px) {
    width: 90%;
  }
`

export default function FAQPage(): React.Element<*> {
  const renderFAQ = (faq: FaqType) => <FAQItem key={faq.question} headerText={faq.question} innerText={faq.answer} />

  return (
    <PageWrapper>
      <HeaderDiv>
        <Header>FAQs</Header>
        <Subtitle>Frequently Asked Questions</Subtitle>
      </HeaderDiv>
      <FAQBox>{faqs.map(renderFAQ)}</FAQBox>
    </PageWrapper>
  )
}
