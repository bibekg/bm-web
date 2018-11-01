// @flow

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import MatchActionControl from 'components/MatchActionControl'
import { mockUser, mockMatch } from '../mockData'

describe('snapshot tests', () => {
  it('renders correctly with default render logic', () => {
    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component).toMatchSnapshot()
  })
  it('closeDislikeMatchModal sets showDislikeFeedbackModal state to false', () => {
    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    const setStateSpy = jest.spyOn(component.instance(), 'setState')

    component.instance().closeDislikeMatchModal()

    expect(setStateSpy).toHaveBeenCalledWith({
      showDislikeFeedbackModal: false
    })

    setStateSpy.mockRestore()
  })
  it('handleAvailabilityChange sets new availability', () => {
    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    const setStateSpy = jest.spyOn(component.instance(), 'setState')
    const mockAvailability = [new Date()]

    component.instance().handleAvailabilityChange(mockAvailability)

    expect(setStateSpy).toHaveBeenCalledWith({
      availability: mockAvailability
    })

    setStateSpy.mockRestore()
  })
  it('renderHaveMatch is called if state is active and your like state is pending', () => {
    mockMatch.state = 'active'
    mockMatch.participants.self.likeState = 'pending'
    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component.find('renderHaveMatch').exists()).toBeTruthy()
  })
})
