export const mockUser = {
  _id: '1234',
  profileId: '1234',
  name: { first: 'Jack', last: 'Van Boening' },
  profilePic: 'profpic',

  // PROFILE INFORMATION
  age: 20,
  year: 2,
  bio: 'Hey',
  gender: 'male',
  major: 'Computer Science',
  height: 72,
  ethnicity: [],
  college: 'School of Engineering and Applied Sciences',

  // CONTACT INFO
  email: 'string',
  instagram: 'string',
  snapchat: 'string',
  phone: 'string',
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

export const matchParticipant = {
  user: mockUser,
  likeState: 'pending',
  updatedAvailability: true,
  matchFeedback: {
    comments: 'hey',
    contacted: false,
    matchId: '1234',
    met: false,
    satisfaction: 5
  },
  sawDislikeFeedbackModal: true,
  dislikeMatchFeedback: {
    dislikeComments: 'blows',
    dislikeReasons: ['other'],
    matchId: '1234'
  }
}

export const mockMatch = {
  _id: 'test123',
  createdAt: new Date('December 17, 1995 03:24:00'),
  updatedAt: new Date('December 17, 1995 03:24:00'),
  // NOTE: This differs from the participants array in the back-end since the API
  // formats matches for clients so it's easier to access
  participants: {
    self: matchParticipant,
    match: matchParticipant
  },
  state: 'active',
  matchBasis: [],
  rendezvousState: 'scheduled',
  rendezvousTime: new Date('December 17, 1995 03:24:00'),
  variants: {}
}
