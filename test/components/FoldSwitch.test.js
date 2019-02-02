import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import FoldSwitch from 'components/FoldSwitch'

describe('<FoldSwitch />', () => {
  test('should render correctly with no options', () => {
    const wrapper = shallow(<FoldSwitch />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render correctly folded with options', () => {
    const wrapper = shallow(<FoldSwitch isFolded text="Test text" iconColor="#123456" />)
    expect(wrapper).toMatchSnapshot()

    // check that text is present and correct
    expect(
      wrapper
        .childAt(0) // AnimateHeight
        .childAt(0) // styled.p
        .children()
        .text()
    ).toEqual('Test text')
    expect(wrapper.childAt(0).prop('height')).toEqual('auto')

    // check that div correctly received isFolded prop
    expect(wrapper.childAt(1).prop('isFolded')).toEqual(true)

    // check that fill color is correct
    expect(wrapper.find('ExpandMoreIcon').prop('fill')).toEqual('#123456')

    // check that arrow rotation is correct
    expect(wrapper.childAt(1)).toHaveStyleRule('transform', 'rotate(0deg)')
  })

  test('should unfold and unrender text when isFolded set to false', () => {
    const wrapper = shallow(<FoldSwitch isFolded text="Test text" iconColor="#123456" />)
    wrapper.setProps({ isFolded: false })
    expect(wrapper).toMatchSnapshot()

    // check that text is not visible
    expect(wrapper.childAt(0).prop('height')).toEqual(0)

    // check that div correctly received isFolded prop
    expect(wrapper.childAt(1).prop('isFolded')).toEqual(false)

    // check that arrow rotation is correct
    expect(wrapper.childAt(1)).toHaveStyleRule('transform', 'rotate(180deg)')
  })

  test('should refold and rerender text when isFolded set to true', () => {
    const wrapper = shallow(<FoldSwitch text="Test text" iconColor="#123456" />)
    wrapper.setProps({ isFolded: true })
    expect(wrapper).toMatchSnapshot()

    // check that text exists again
    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .children()
        .text()
    ).toEqual('Test text')
    expect(wrapper.childAt(0).prop('height')).toEqual('auto')

    // check that div correctly received isFolded prop
    expect(wrapper.childAt(1).prop('isFolded')).toEqual(true)

    // check that arrow rotation is correct
    expect(wrapper.childAt(1)).toHaveStyleRule('transform', 'rotate(0deg)')
  })

  test('should handle onClick correctly', () => {
    const clickFcn = jest.fn()
    const wrapper = shallow(<FoldSwitch text="Test text" iconColor="#123456" onClick={clickFcn} />)

    wrapper.simulate('click')
    expect(clickFcn).toHaveBeenCalled()
  })
})
