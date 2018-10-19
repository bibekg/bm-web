type MatchParticipantType<T> = {
  user: T,
  likeState: 'pending' | 'liked' | 'disliked',
  updatedAvailability: boolean,
  matchFeedback: MatchFeedbackType,
  sawDislikeFeedbackModal: boolean,
  dislikeMatchFeedback: DislikeMatchFeedbackType
}

type MatchVariantType = null

type MatchType = {
  _id: string,
  createdAt: Date,
  updatedAt: Date,
  // NOTE: This differs from the participants array in the back-end since the API
  // formats matches for clients so it's easier to access
  participants: {
    self: MatchParticipantType<UserType>,
    match: MatchParticipantType<UserType>
  },
  state: 'active' | 'ended',
  matchBasis: Array<UserRelationshipType>,
  rendezvousState: 'scheduled' | 'unscheduled' | 'unschedulable',
  rendezvousTime: Date,
  variants: {}
}

// Reflects the Match edge in the exact shape as on DB (user-independent)
type MatchEdgeType = {
  _id: string,
  createdAt: Date,
  updatedAt: Date,
  participants: Array<MatchParticipantType<string>>,
  state: 'active' | 'ended',
  matchBasis: Array<UserRelationshipType>,
  rendezvousState: 'scheduled' | 'unscheduled' | 'unschedulable',
  rendezvousTime: Date,
  variants: {}
}
