// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

const Link = styled.a`
  color: ${colors.blue};
`

const LayoutWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

type ContactItemPropsType = {
  children: Array<React$Element<*>>,
  link: ?string
}

export default function ContactItem(props: ContactItemPropsType): React.Element<*> {
  const { children, link } = props

  if (link) {
    return (
      <Link href={link}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </Link>
    )
  }

  return <LayoutWrapper>{children}</LayoutWrapper>
}

ContactItem.defaultProps = {
  link: null
}
