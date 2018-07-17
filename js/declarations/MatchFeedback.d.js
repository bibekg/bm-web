type MatchSatisfactionType = 1 | 2 | 3 | 4 | 5

type MatchFeedbackType = {
  matchId: string,
  contacted: boolean,
  met: boolean,
  satisfaction: MatchSatisfactionType,
  comments: ?string
}

type DislikeReasonsType = 'lack-detail' | 'unclear-image' | 'unmet-prefs' | 'other'

type DislikeMatchFeedbackType = {
  matchId: string,
  dislikeReasons: Array<DislikeReasonsType>,
  dislikeComments: ?string
}
