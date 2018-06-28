/* eslint-disable */

type UserGenderType = 'female' | 'male' | 'non-binary'

type UserYearType = number

type UserHeightType = number

type UserAgeType = number

type UserEthnicityType =
  | 'Asian'
  | 'South Asian'
  | 'White/Caucasian'
  | 'Black/African-descent'
  | 'Hispanic/Latino'
  | 'Native American'
  | 'Pacific Islander'
  | 'Arab'
  | 'Other'

type UserRelationshipType = 'long' | 'short' | 'hookup' | 'friendship'

type UserMatchRatingType = {
  matchId: string,
  liked: boolean,
  compatibility: number,
  experiment: string
}

type UserCollegeType =
  | 'College of Letters and Science'
  | 'School of Dentistry'
  | 'School of Education and Information Studies'
  | 'School of Engineering and Applied Sciences'
  | 'School of Law'
  | 'School of Management'
  | 'School of Medicine'
  | 'School of Music'
  | 'School of Nursing'
  | 'School of Public Affairs'
  | 'School of Public Health'
  | 'School of the Arts and Architecture'
  | 'School of Theater, Film, and Television'
  | 'Other'

type UserPreferenceStackType = {
  profileId: string,
  compatibility: number
}

type UserAnswerType = {
  question: string,
  answer: string
}

type UserNameType = {
  first: string,
  middle?: string,
  last: string
}

type UserType = {
  _id: string, // MongoDB object id
  profileId: string,
  name: UserNameType,
  profilePic: string,

  // PROFILE INFORMATION
  age?: number,
  year?: UserYearType,
  bio?: string,
  gender?: UserGenderType,
  major?: string,
  height?: UserHeightType,
  ethnicity?: Array<UserEthnicityType>,
  college?: UserCollegeType,

  // PREFERENCES
  genderPreference?: Array<UserGenderType>,
  relationshipType?: Array<UserRelationshipType>,
  agePreference?: { min: UserAgeType, max: UserAgeType },
  ethnicityPreference?: Array<UserEthnicityType>,
  yearPreference?: Array<UserYearType>,
  collegePreference?: Array<UserCollegeType>,
  heightPreference?: { min: UserHeightType, max: UserHeightType },

  // CONTACT INFO
  email?: string,
  instagram?: string,
  snapchat?: string,
  phone?: string,
  receiveTexts: boolean,

  // MATCHMAKING FIELDS
  answers: Array<UserAnswerType>,
  currentMatch: ?string,
  matchHistory: Object,
  preferenceStack: Array<UserPreferenceStackType>,
  preferenceMap: Object,
  variants: Object,

  // Liking/Going system fields
  likeMatch: boolean,
  dislikeMatch: boolean,

  // RENDEZVOUS FIELDS
  dateAvailability: ?Array<AvailabilityDateType>,
  availability: Array<Date>,
  rendezvousState: RendezvousStateType,
  rendezvousTime: ?Date,

  // ACCOUNT ATTRIBUTES
  verified: boolean,
  active: boolean,
  hasProfile: boolean,
  blindDateParticipant: boolean,
  isAdmin: boolean,
  matchRatings: Array<UserMatchRatingType>,
  voted: boolean
}

// RENDEZVOUS TYPES

type AvailabilityDateType = {
  date: string,
  hours: Array<number>
}

type RendezvousStateType = 'unscheduled' | 'scheduled' | 'unschedulable'

type RendezvousTimeType = {
  date: string,
  hour: number
}
