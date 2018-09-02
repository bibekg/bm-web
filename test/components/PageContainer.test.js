import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import PageContainer from 'components/PageContainer'

test('PageContainer optionless render', () => {
  const PageContainerElement = PageContainer()
  const tree = renderer.create(<PageContainerElement />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('PageContainer with options', () => {
  const PageContainerElement = PageContainer({
    noBackground: true,
    maxWidth: {
      large: '500px',
      small: '20%'
    }
  })
  const tree = renderer.create(<PageContainerElement />).toJSON()
  expect(tree).toMatchSnapshot()
})
