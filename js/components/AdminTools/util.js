// @flow

// Some util functions that are necessary for the rendering of admin tools

// Returns an array of ids representing users that are matched with the requested User
export const getMatchedUsersForUser = (
  baseUserId: string,
  userMap: { [string]: UserType },
  allMatches: Array<MatchEdgeType>
): Array<string> =>
  allMatches.reduce((acc: Array<*>, match): Array<*> => {
    // Filter matches for ones in which userA is present
    if (match.participants.find(p => p.user === baseUserId)) {
      // But accumulate a list of the OTHER user (not userA) in said matches
      const matchedParticipant = match.participants.find(p => p.user !== baseUserId)
      if (matchedParticipant) {
        // Look up the user via the id we just retrieved

        // Server will not populate participants.user so all we can expect there is an ObjectId string
        // This is to avoid sending all the users twice, once as just users and once under matches.participants.user
        // flow-disable-next-line
        if (Object.prototype.hasOwnProperty.call(userMap, matchedParticipant.user)) {
          acc.push(matchedParticipant.user)
        } else if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line
          console.log(`Match participant ${matchedParticipant.user} could not be found in users`)
        }
      }
      return acc
    }
    return acc
  }, [])

export const getMatchForUsers = (userA: string, userB: string, allMatches: Array<MatchEdgeType>): ?MatchEdgeType =>
  allMatches.find(
    matchEdge =>
      (matchEdge.participants[0].user === userA && matchEdge.participants[1].user === userB) ||
      (matchEdge.participants[1].user === userB && matchEdge.participants[1].user === userA)
  )
