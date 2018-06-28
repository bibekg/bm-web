// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Text } from 'components/typography'

type PropsType = {
  text: string
}

const DropdownDiv = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.8px;
  color: rgba(79, 79, 79, 0.87);
  margin-bottom: 10px;
`

export default function AccordionDropdown(props: PropsType): React.Element<*> {
  return (
    <DropdownDiv>
      <Text paragraph>{props.text}</Text>
    </DropdownDiv>
  )
}
