export const mockUser = {
  _id: '1234',
  profileId: '69',
  name: { first: 'Joe', last: 'Bruin' },
  profilePic: 'profpic',

  // PROFILE INFORMATION
  age: 20,
  year: 2,
  bio: 'I love BruinMeet',
  gender: 'male',
  major: 'Computer Science',
  height: 72,
  ethnicity: ['White/Caucasian'],
  college: 'School of Engineering and Applied Sciences',

  // CONTACT INFO
  email: 'joe@ucla.edu',
  instagram: '@iloveucla',
  snapchat: '@uclaisCool',
  phone: '310-123-4567',
  receiveTexts: true,

  // MATCHMAKING FIELDS
  answers: [],
  currentMatch: 'string',
  matchHistory: Object,
  preferenceStack: [],
  preferenceMap: Object,
  variants: Object,

  // Liking/Going system fields
  likeMatch: true,
  dislikeMatch: true,

  // RENDEZVOUS FIELDS
  dateAvailability: [],
  availability: [],
  rendezvousState: 'unscheduled',
  rendezvousTime: null,

  // ACCOUNT ATTRIBUTES
  verified: true,
  active: true,
  hasProfile: true,
  blindDateParticipant: true,
  isAdmin: true,
  matchRatings: [],
  voted: true
}

const selfParticipant = {
  user: mockUser,
  likeState: 'pending',
  updatedAvailability: true,
  matchFeedback: {
    comments: 'hey',
    contacted: false,
    matchId: '69',
    met: false,
    satisfaction: 5
  },
  sawDislikeFeedbackModal: true,
  dislikeMatchFeedback: {
    dislikeComments: 'blows',
    dislikeReasons: ['other', 'too much sauce'],
    matchId: '69'
  }
}

const matchParticipant = {
  user: mockUser,
  likeState: 'pending',
  updatedAvailability: true,
  matchFeedback: {
    comments: 'hey',
    contacted: false,
    matchId: '69',
    met: false,
    satisfaction: 5
  },
  sawDislikeFeedbackModal: true,
  dislikeMatchFeedback: {
    dislikeComments: 'blows',
    dislikeReasons: ['other'],
    matchId: '69'
  }
}

export const mockMatch = {
  _id: 'test123',
  createdAt: new Date('December 17, 1995 03:24:00'),
  updatedAt: new Date('December 17, 1995 03:24:00'),
  // NOTE: This differs from the participants array in the back-end since the API
  // formats matches for clients so it's easier to access
  participants: {
    self: selfParticipant,
    match: matchParticipant
  },
  state: 'active',
  matchBasis: [],
  rendezvousState: 'scheduled',
  rendezvousTime: new Date('December 17, 1995 03:24:00'),
  variants: {}
}
