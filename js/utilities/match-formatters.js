// @flow

type FormattedParticipantsType = {
  self: MatchParticipantType,
  match: MatchParticipantType
}

/* eslint-disable no-underscore-dangle */
export const formatParticipants = (
  participants: Array<MatchParticipantType>,
  user: UserType
): ?FormattedParticipantsType => {
  const formatted = {
    self: participants.find(p => p.user._id === user._id),
    match: participants.find(p => p.user._id !== user._id)
  }

  if (formatted.self && formatted.match) {
    return formatted
  } else {
    return null
  }
}
/* eslint-enable no-underscore-dangle */
