// @flow
import React from 'react'
import { shallow } from 'enzyme'
import MatchActionControl from 'components/MatchActionControl'
import AutoDateCard from 'components/AutoDateCard'
import UnmatchedCountdownTimer from 'components/UnmatchedCountdownTimer'
import MatchFeedbackModal from 'components/MatchFeedbackModal'
import DislikeMatchFeedbackModal from 'components/DislikeMatchFeedbackModal'
import { mockUser, mockMatch } from '../mockData'

describe('snapshot test', () => {
  it('renders correctly with default render logic', () => {
    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component).toMatchSnapshot()
  })
})

describe('componentUpdatesProps', () => {
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
})

describe('componentRendersCorrectElement when matchState is active', () => {
  it('HaveMatch is called when self likeState is pending', () => {
    mockMatch.state = 'active'
    mockMatch.participants.self.likeState = 'pending'

    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component.find(MatchActionControl.HaveMatch).exists()).toBeTruthy()
  })
  it('WaitingForMatch is called when self likeState is like and match likeState is disliked or pending', () => {
    mockMatch.state = 'active'
    mockMatch.participants.self.likeState = 'liked'
    mockMatch.participants.match.likeState = 'disliked'

    let component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component.find(MatchActionControl.WaitingForMatch).exists()).toBeTruthy()

    mockMatch.participants.match.likeState = 'pending'
    component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component.find(MatchActionControl.WaitingForMatch).exists()).toBeTruthy()
  })
  describe('componentRendersCorrectElement when liked state is mutual', () => {
    it('UnschedulableRendezvous is called when rendezvousState is unschedulable', () => {
      mockMatch.state = 'active'
      mockMatch.participants.self.likeState = 'liked'
      mockMatch.participants.match.likeState = 'liked'
      mockMatch.rendezvousState = 'unschedulable'

      const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
      expect(component.find(MatchActionControl.UnschedulableRendezvous).exists()).toBeTruthy()
    })
    it('RendezvousScheduled is called when rendezvousState is scheduled', () => {
      mockMatch.state = 'active'
      mockMatch.participants.self.likeState = 'liked'
      mockMatch.participants.match.likeState = 'liked'
      mockMatch.rendezvousState = 'scheduled'

      const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
      expect(component.find(MatchActionControl.RendezvousScheduled).exists()).toBeTruthy()
    })
    it('WaitingForMatch is called when self updatedAvailability is true', () => {
      mockMatch.state = 'active'
      mockMatch.participants.self.likeState = 'liked'
      mockMatch.participants.match.likeState = 'liked'
      mockMatch.rendezvousState = ''
      mockMatch.participants.self.updatedAvailability = true

      const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
      expect(component.find(MatchActionControl.WaitingForMatch).exists()).toBeTruthy()
    })
    it('AutoDateCard is called when none of the above condtions are met', () => {
      mockMatch.state = 'active'
      mockMatch.participants.self.likeState = 'liked'
      mockMatch.participants.match.likeState = 'liked'
      mockMatch.rendezvousState = ''
      mockMatch.participants.self.updatedAvailability = false
      mockUser.availability = [new Date()]

      const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
      expect(component.find(AutoDateCard).exists()).toBeTruthy()
    })
  })
  it('DislikeMatchFeedbackModal is shown when self likeState is disliked, and you have NOT seen DislikeMatchFeedbackModal', () => {
    mockMatch.state = 'active'
    mockMatch.participants.self.likeState = 'disliked'
    mockMatch.participants.self.sawDislikeFeedbackModal = false

    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component.find(DislikeMatchFeedbackModal).exists()).toBeTruthy()
  })
  it('UnmatchedCountdownTimer is shown when self likeSate is disliked, and you have seen DislikeMatchFeedbackModal', () => {
    mockMatch.state = 'active'
    mockMatch.participants.self.likeState = 'disliked'
    mockMatch.participants.self.sawDislikeFeedbackModal = true

    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component.find(UnmatchedCountdownTimer).exists()).toBeTruthy()
  })
})

describe('componentRendersCorrectElement when matchState is ended', () => {
  it('MatchFeedbackModal is shown when self, match likeState is liked and matchFeedback is null', () => {
    mockMatch.state = 'ended'
    mockMatch.participants.self.likeState = 'liked'
    mockMatch.participants.match.likeState = 'liked'
    mockMatch.participants.self.matchFeedback = null

    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component.find(MatchFeedbackModal).exists()).toBeTruthy()
  })
  it('UnmatchedCountdownTimer is shown when match feedback is not null', () => {
    mockMatch.state = 'ended'
    const mockFeedBack = {
      comments: 'Nice guy',
      contacted: false,
      matchId: '1234',
      met: false,
      satisfaction: 5
    }
    mockMatch.participants.self.matchFeedback = mockFeedBack

    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component.find(UnmatchedCountdownTimer).exists()).toBeTruthy()
  })
})
