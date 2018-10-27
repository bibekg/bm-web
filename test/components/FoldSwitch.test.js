import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import FoldSwitch from 'components/FoldSwitch'

test('should render correctly with no options', () => {
  const wrapper = shallow(<FoldSwitch />)
  expect(wrapper).toMatchSnapshot()
})

test('should render correctly folded with options', () => {
  const wrapper = shallow(<FoldSwitch isFolded text="Test text" iconColor="#123456" />)
  expect(wrapper).toMatchSnapshot()

  // check that text is present and correct
  expect(wrapper.children()).toHaveLength(2)
  expect(
    wrapper
      .childAt(0)
      .children()
      .text()
  ).toEqual('Test text')

  // check that div correctly received isFolded prop
  expect(wrapper.childAt(1).prop('isFolded')).toEqual(true)

  // check that fill color is correct
  expect(wrapper.find('ExpandMoreIcon').prop('fill')).toEqual('#123456')
})

test('should unfold and unrender text when isFolded set to false', () => {
  const wrapper = shallow(<FoldSwitch isFolded text="Test text" iconColor="#123456" />)
  wrapper.setProps({ isFolded: false })
  expect(wrapper).toMatchSnapshot()

  // check that text is not present
  expect(wrapper.children()).toHaveLength(1)

  // check that div correctly received isFolded prop
  expect(wrapper.childAt(0).prop('isFolded')).toEqual(false)
})

test('should refold and rerender text when isFolded set to true', () => {
  const wrapper = shallow(<FoldSwitch text="Test text" iconColor="#123456" />)
  wrapper.setProps({ isFolded: true })
  expect(wrapper).toMatchSnapshot()

  // check that text exists again
  expect(wrapper.children()).toHaveLength(2)
  expect(
    wrapper
      .childAt(0)
      .children()
      .text()
  ).toEqual('Test text')

  // check that div correctly received isFolded prop
  expect(wrapper.childAt(1).prop('isFolded')).toEqual(true)
})

test('should handle onClick correctly', () => {
  const clickFcn = jest.fn()
  const wrapper = shallow(<FoldSwitch text="Test text" iconColor="#123456" onClick={clickFcn} />)

  wrapper.simulate('click')
  expect(clickFcn).toHaveBeenCalled()
})
