// @flow

import * as ACTIONS from '../actions/types'

type ServerResponseType = {
  config: Object,
  data: Object,
  headers: Object,
  request: Object,
  status: number,
  statusText: string
}

// Generic type in which
// - the first parameter is an optional error
// - the second type is a specifiable object
//   - e.g. ReduxCallbackType<number> if the callback succeeds with a number
type ReduxCallbackType<T> = (?Error, ?T) => void

type ReduxStateType = {
  auth: AuthenticationStateType,
  user: UserStateType,
  admin: AdminStateType,
  match: MatchStateType,
  recent: RecentStateType
}

// Authentication State
type UpdateAuthActionType = {
  type: ACTIONS.UPDATE_AUTH,
  payload: ?{
    isLoggedIn: boolean,
    accessToken: string,
    userId: string
  }
}

type AuthenticationActionType = UpdateAuthActionType

type AuthenticationStateType =
  | {
      isLoggedIn: ?false
    }
  | {
      isLoggedIn: true,
      accessToken: string,
      userId: string
    }

// User State
type GetUserSuccessActionType = {
  type: typeof ACTIONS.GET_USER_SUCCESS,
  payload: UserType
}

type UpdateUserProfilePicSuccessActionType = {
  type: typeof ACTIONS.UPDATE_USER_PROFILE_PIC_SUCCESS,
  payload: string
}

type UserActionType = GetUserSuccessActionType | UpdateUserProfilePicSuccessActionType

type UserStateType = ?UserType

// Admin State
type GetAllUsersSuccessActionType = {
  type: ACTIONS.GET_ALL_USERS_SUCCESS,
  payload: Array<UserType>
}

type GetAllMatchesSuccessActionType = {
  type: ACTIONS.GET_ALL_MATCHES_SUCCESS,
  payload: Array<MatchEdgeType>
}

type AdminActionType = GetAllUsersSuccessActionType | GetAllMatchesSuccessActionType

type AdminStateType = {
  users: Array<UserType>,
  matches: Array<MatchEdgeType>,
  feedback: Array<any>,
  stats: ?AdminStatsType
}

// Recent Matches State
type GetRecentMatchesSuccessActionType = {
  type: ACTIONS.GET_RECENT_MATCHES_SUCESS,
  payload: Array<MatchType>
}

type RecentActionType = GetRecentMatchesSuccessActionType

type RecentStateType = ?Array<MatchType>

// Match State
type GetMatchSuccessActionType = {
  type: ACTIONS.GET_MATCH_SUCCESS,
  payload: MatchType
}

type SetRendezvousTimeActionType = {
  type: ACTIONS.SET_RENDEZVOUS_TIME,
  payload: Date
}

type UpdateLikeStatusActionType = {
  type: ACTIONS.UPDATE_LIKE_STATUS,
  payload: boolean
}

type MarkMatchFeedbackSubmittedActionType = {
  type: ACTIONS.MARK_MATCH_FEEDBACK_SUBMITTED,
  payload: MatchFeedbackType
}

type MarkDislikeMatchFeedbackSubmittedActionType = {
  type: ACTIONS.MARK_DISLIKE_MATCH_FEEDBACK_SUBMITTED,
  payload: DislikeMatchFeedbackType
}

type MatchActionType =
  | GetMatchSuccessActionType
  | SetRendezvousTimeActionType
  | UpdateLikeStatusActionType
  | MarkMatchFeedbackSubmittedActionType
  | MarkDislikeMatchFeedbackSubmittedActionType

type MatchStateType = ?MatchType
