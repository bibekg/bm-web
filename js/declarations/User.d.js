/* eslint-disable */

type UserGenderType = 'female' | 'male' | 'non-binary'

type UserYearType = number

type UserHeightType = number

type UserAgeType = number

type UserQuestionType = 'HOBBIES' | 'FUTURE_PLANS' | 'ASK_ME_ABOUT' | 'IDEAL_FIRST_DATE'

type UserEthnicityType =
  | 'Asian'
  | 'South Asian'
  | 'White/Caucasian'
  | 'Black/African-descent'
  | 'Hispanic/Latino'
  | 'Native American'
  | 'Pacific Islander'
  | 'Arab'
  | 'Middle Eastern'
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

type UserMajorType =
  | 'Aerospace Engineering'
  | 'African American Studies'
  | 'African and Middle Eastern Studies'
  | 'American Indian Studies'
  | 'American Literature and Culture'
  | 'Ancient Near East and Egyptology'
  | 'Anthropology'
  | 'Applied Linguistics'
  | 'Applied Mathematics'
  | 'Arabic'
  | 'Architectural Studies'
  | 'Art'
  | 'Art History'
  | 'Asian American Studies'
  | 'Asian Humanities'
  | 'Asian Languages and Linguistics BA'
  | 'Asian Religions'
  | 'Asian Studies'
  | 'Astrophysics'
  | 'Atmospheric and Oceanic Sciences'
  | 'Atmospheric, Oceanic, and Environmental Sciences'
  | 'Biochemistry'
  | 'Bioengineering'
  | 'Biology'
  | 'Biophysics'
  | 'Business Economics'
  | 'Central and East European Languages and Cultures'
  | 'Chemical Engineering'
  | 'Chemistry'
  | 'Chemistry/Materials Science'
  | 'Chicana and Chicano Studies'
  | 'Chinese'
  | 'Civil Engineering'
  | 'Classical Civilization'
  | 'Climate Science'
  | 'Cognitive Science'
  | 'Communication Studies'
  | 'Comparative Literature'
  | 'Computational and Systems Biology'
  | 'Computer Engineering'
  | 'Computer Science'
  | 'Computer Science and Engineering'
  | 'Dance'
  | 'Design | Media Arts'
  | 'Earth and Environmental Science'
  | 'Ecology, Behavior, and Evolution'
  | 'Economics'
  | 'Electrical Engineering'
  | 'Engineering Geology'
  | 'English'
  | 'Environmental Science'
  | 'Ethnomusicology'
  | 'European Studies'
  | 'Film and Television'
  | 'Financial Actuarial Mathematics'
  | 'French'
  | 'French and Linguistics'
  | 'Gender Studies'
  | 'General Chemistry'
  | 'Geography'
  | 'Geography/Environmental Studies'
  | 'Geology'
  | 'Geology/Engineering Geology'
  | 'Geology/Paleobiology'
  | 'Geophysics'
  | 'Geophysics/Applied Geophysics'
  | 'Geophysics/Geophysics and Space Physics'
  | 'German'
  | 'Global Studies'
  | 'Greek'
  | 'Greek and Latin'
  | 'History'
  | 'Human Biology and Society'
  | 'Individual Field of Concentration'
  | 'International Development Studies'
  | 'Iranian Studies'
  | 'Italian'
  | 'Italian and Special Fields'
  | 'Japanese'
  | 'Jewish Studies'
  | 'Korean'
  | 'Latin'
  | 'Latin American Studies'
  | 'Linguistics'
  | 'Linguistics and Anthropology'
  | 'Linguistics and Asian Languages and Cultures'
  | 'Linguistics and Computer Science'
  | 'Linguistics and English'
  | 'Linguistics and French'
  | 'Linguistics and Italian'
  | 'Linguistics and Philosophy'
  | 'Linguistics and Psychology'
  | 'Linguistics and Scandinavian Languages'
  | 'Linguistics and Spanish'
  | 'Marine Biology'
  | 'Materials Engineering'
  | 'Mathematics'
  | 'Mathematics For Teaching'
  | 'Mathematics of Computation'
  | 'Mathematics/Applied Science'
  | 'Mathematics/Atmospheric and Oceanic Sciences'
  | 'Mathematics/Economics'
  | 'Mechanical Engineering'
  | 'Microbiology, Immunology, and Molecular Genetics'
  | 'Middle Eastern Studies'
  | 'Molecular, Cell, and Developmental Biology'
  | 'Music'
  | 'Music Education'
  | 'Music History'
  | 'Musicology'
  | 'Neuroscience'
  | 'Nordic Studies'
  | 'Nursing'
  | 'Nursing-Prelicensure'
  | 'Philosophy'
  | 'Physics'
  | 'Physiological Science'
  | 'Political Science'
  | 'Portuguese'
  | 'Pre-African and Middle Eastern Studies'
  | 'Pre-Applied Mathematics'
  | 'Pre-Asian Studies'
  | 'Pre-Business Economics'
  | 'Pre-Cognitive Science'
  | 'Pre-Computational and Systems Biology'
  | 'Pre-Economics'
  | 'Pre-European Studies'
  | 'Pre-Financial Actuarial Mathematics'
  | 'Pre-Global Studies'
  | 'Pre-History'
  | 'Pre-Human Biology and Society'
  | 'Pre-International Development Studies'
  | 'Pre-Latin American Studies'
  | 'Pre-Mathematics'
  | 'Pre-Mathematics For Teaching'
  | 'Pre-Mathematics of Computation'
  | 'Pre-Mathematics/Applied Science'
  | 'Pre-Mathematics/Economics'
  | 'Pre-Microbiology, Immunology, & Molecular Genetics'
  | 'Pre-Political Science'
  | 'Pre-Psychobiology'
  | 'Pre-Psychology'
  | 'Pre-Sociology'
  | 'Pre-Statistics'
  | 'Psychobiology'
  | 'Psychology'
  | 'Russian Language and Literature'
  | 'Russian Studies'
  | 'Scandinavian Languages and Cultures'
  | 'Sociology'
  | 'Spanish'
  | 'Spanish and Community and Culture'
  | 'Spanish and Linguistics'
  | 'Spanish and Portuguese'
  | 'Statistics'
  | 'Study of Religion'
  | 'Theater'
  | 'Undeclared'
  | 'Undeclared-Engineering and Applied Science'
  | 'Undeclared-Humanities'
  | 'Undeclared-Life Science'
  | 'Undeclared-Physical Science'
  | 'Undeclared-Social Science'
  | 'World Arts and Cultures'
  | 'Other'

type UserPreferenceStackType = {
  profileId: string,
  compatibility: number
}

type UserAnswerType = {
  question: UserQuestionType,
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
  major?: UserMajorType,
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

// Type of the User profile form
type UserFormType = {
  // Basic Page
  firstName: string,
  lastName: string,
  age: UserAgeType,
  year: UserYearType,
  gender: UserGenderType,
  major: UserMajorType,
  college: UserCollegeType,
  height: UserHeightType,
  ethnicity: Array<boolean>,

  // Personal Page
  bio: string,
  questions: { [UserQuestionType]: string },

  // Preference Page
  genderPreference: Array<boolean>,
  agePreference: [number, number],
  relationshipType: Array<boolean>,
  ethnicityPreference: Array<boolean>,
  yearPreference: Array<boolean>,
  collegePreference: Array<boolean>,
  heightPreference: [number, number],

  // Contact Page
  phone: string,
  receiveTexts: boolean,
  instagram: string,
  snapchat: string
}
