// @flow

import * as React from 'react'
import { Title, Subtitle, Text } from 'components/typography'

type PropsType = {
  title: string,
  contentList: Array<StaticTextContentType>
}

export default function StaticTextContentDisplay(props: PropsType): React.Element<*> {
  const renderContent = (c: string | Array<*>): ?React.Element<*> => {
    if (typeof c === 'string') {
      return <Text>{c}</Text>
    } else if (Array.isArray(c)) {
      // Keep nesting in unordered lists until we reach a string
      return <ul>{c.map(citem => <li key={citem.toString()}>{renderContent(citem)}</li>)}</ul>
    } else {
      return null
    }
  }

  return (
    <div>
      <Title>{props.title}</Title>
      {props.contentList.map(({ title, content }) => (
        <div>
          <Subtitle align="left">{title}</Subtitle>
          {content.map(citem => renderContent(citem))}
        </div>
      ))}
    </div>
  )
}
