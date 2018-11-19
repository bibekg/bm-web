import React from 'react'
import { shallow } from 'enzyme'
import MatchActionControl from 'components/MatchActionControl'
import AutoDateCard from 'components/AutoDateCard'
import UnmatchedCountdownTimer from 'components/UnmatchedCountdownTimer'
import MatchFeedbackModal from 'components/MatchFeedbackModal'
import DislikeMatchFeedbackModal from 'components/DislikeMatchFeedbackModal'
import { mockUser, mockMatchedUser, mockMatch } from '../mockData'

describe('snapshot test', () => {
  it('renders correctly with default render logic', () => {
    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    expect(component).toMatchSnapshot()
  })
})

describe('closeDislikeMatchModal test', () => {
  it('sets showDislikeFeedbackModal state to false when called', () => {
    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    const setStateSpy = jest.spyOn(component.instance(), 'setState')

    component.instance().closeDislikeMatchModal()

    expect(setStateSpy).toHaveBeenCalledWith({
      showDislikeFeedbackModal: false
    })

    setStateSpy.mockRestore()
  })
})
describe('getMatchedUser tests', () => {
  it('returns matched user object', () => {
    const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
    const testUser = component.instance().getMatchedUser()

    expect(testUser).toBe(mockMatchedUser)
    expect(testUser).not.toBe(mockUser)
  })
})

describe('active matchState', () => {
  describe('self has yet to indicate like state', () => {
    it('renders HaveMatch', () => {
      mockMatch.state = 'active'
      mockMatch.participants.self.likeState = 'pending'

      const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
      expect(component.find(MatchActionControl.HaveMatch).exists()).toBeTruthy()
    })
  })
  describe('self liked match', () => {
    describe('match has yet to indicate like state', () => {
      it('renders WaitingForMatch', () => {
        mockMatch.state = 'active'
        mockMatch.participants.self.likeState = 'liked'
        mockMatch.participants.match.likeState = 'pending'

        const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
        expect(component.find(MatchActionControl.WaitingForMatch).exists()).toBeTruthy()
      })
    })
    describe('match dislikes self', () => {
      it('renders WaitingForMatch', () => {
        mockMatch.state = 'active'
        mockMatch.participants.self.likeState = 'liked'
        mockMatch.participants.match.likeState = 'disliked'

        const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
        expect(component.find(MatchActionControl.WaitingForMatch).exists()).toBeTruthy()
      })
    })

    describe('mutual match', () => {
      it('renders UnschedulableRendezvous when rendezvousState is unschedulable', () => {
        mockMatch.state = 'active'
        mockMatch.participants.self.likeState = 'liked'
        mockMatch.participants.match.likeState = 'liked'
        mockMatch.rendezvousState = 'unschedulable'

        const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
        expect(component.find(MatchActionControl.UnschedulableRendezvous).exists()).toBeTruthy()
      })
      it('renders RendezvousScheduled when rendezvousState is scheduled', () => {
        mockMatch.state = 'active'
        mockMatch.participants.self.likeState = 'liked'
        mockMatch.participants.match.likeState = 'liked'
        mockMatch.rendezvousState = 'scheduled'

        const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
        expect(component.find(MatchActionControl.RendezvousScheduled).exists()).toBeTruthy()
      })
      it('renders WaitingForMatch when self updatedAvailability is true', () => {
        mockMatch.state = 'active'
        mockMatch.participants.self.likeState = 'liked'
        mockMatch.participants.match.likeState = 'liked'
        mockMatch.rendezvousState = ''
        mockMatch.participants.self.updatedAvailability = true

        const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
        expect(component.find(MatchActionControl.WaitingForMatch).exists()).toBeTruthy()
      })
      it('renders AutoDateCard when none of the above condtions are met', () => {
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
  })
  describe('self disliked match', () => {
    describe('self has not seen DislikeMatchFeedbackModal', () => {
      it('renders DislikeMatchFeedbackModal', () => {
        mockMatch.state = 'active'
        mockMatch.participants.self.likeState = 'disliked'
        mockMatch.participants.self.sawDislikeFeedbackModal = false

        const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
        expect(component.find(DislikeMatchFeedbackModal).exists()).toBeTruthy()
      })
    })
    describe('self has seen DislikeMatchFeedbackModal', () => {
      it('renders UnmatchedCountdownTimer', () => {
        mockMatch.state = 'active'
        mockMatch.participants.self.likeState = 'disliked'
        mockMatch.participants.self.sawDislikeFeedbackModal = true

        const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
        expect(component.find(UnmatchedCountdownTimer).exists()).toBeTruthy()
      })
    })
  })
})

describe('ended matchState', () => {
  describe('mutual like', () => {
    it('renders MatchFeedbackModal when matchFeedback is null', () => {
      mockMatch.state = 'ended'
      mockMatch.participants.self.likeState = 'liked'
      mockMatch.participants.match.likeState = 'liked'
      mockMatch.participants.self.matchFeedback = null

      const component = shallow(<MatchActionControl user={mockUser} match={mockMatch} />)
      expect(component.find(MatchFeedbackModal).exists()).toBeTruthy()
    })
  })
  it('renders when UnmatchedCountdownTimer when matchFeedback is not null', () => {
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
