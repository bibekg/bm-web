import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import FAQItem from 'components/FAQItem'

describe('<FAQItem />', () => {
  const spy = jest.spyOn(FAQItem.prototype, 'toggleAccordion')
  const wrapper = shallow(<FAQItem headerText="header" innerText="inner" />)

  test('should render correctly closed', () => {
    expect(wrapper).toMatchSnapshot()

    // check that header text is present and correct
    expect(
      wrapper
        .childAt(0) // AccordionHeaderDiv
        .childAt(0) // Subtitle
        .children()
        .text()
    ).toEqual('header')

    // check that switch is rotated correctly
    expect(wrapper.childAt(0).childAt(1)).toHaveStyleRule('transform', 'rotate(0deg)')

    // check that DropdownDiv isn't currently rendered (i.e. AnimateHeight's height is 0)
    expect(wrapper.childAt(1).prop('height')).toEqual(0)
  })

  test('should unfold on click and render correctly', () => {
    wrapper.childAt(0).simulate('click')
    expect(spy).toHaveBeenCalled()
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

    // check that switch is rotated correctly
    expect(wrapper.childAt(0).childAt(1)).toHaveStyleRule('transform', 'rotate(180deg)')

    // check that DropdownDiv is now rendered
    expect(wrapper.childAt(1).prop('height')).toEqual('auto')

    // check that inner text is present and correct
    expect(
      wrapper
        .childAt(1) // AnimateHeight
        .childAt(0) // DropdownDiv
        .childAt(0) // Text
        .children()
        .text()
    ).toEqual('inner')
  })

  test('should refold and render correctly on click', () => {
    wrapper.childAt(0).simulate('click')
    expect(spy).toHaveBeenCalledTimes(2)
    wrapper.update()
    expect(wrapper).toMatchSnapshot()

    // check that DropdownDiv is now unrendered
    expect(wrapper.childAt(1).prop('height')).toEqual(0)
  })
})
