import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import Toggle from 'components/Toggle'

describe('<Toggle />', () => {
  test('should render correctly with no options', () => {
    const wrapper = shallow(<Toggle />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render correctly when toggled off', () => {
    const wrapper = shallow(<Toggle toggled={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should handle onClick correctly', () => {
    const clickFcn = jest.fn()
    const wrapper = shallow(<Toggle toggled={false} onClick={clickFcn} />)

    wrapper.simulate('click')
    expect(clickFcn).toHaveBeenCalled()
  })
})
