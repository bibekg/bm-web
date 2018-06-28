// @flow

export const GENDER = ['male', 'female', 'non-binary']

export const YEAR = [1, 2, 3, 4, 5]

export const ETHNICITY = [
  'Asian',
  'South Asian',
  'White/Caucasian',
  'Black/African-descent',
  'Hispanic/Latino',
  'Native American',
  'Pacific Islander',
  'Arab',
  'Other'
]

export const COLLEGE = [
  'College of Letters and Science',
  'School of Dentistry',
  'School of Education and Information Studies',
  'School of Engineering and Applied Sciences',
  'School of Law',
  'School of Management',
  'School of Medicine',
  'School of Music',
  'School of Nursing',
  'School of Public Affairs',
  'School of Public Health',
  'School of the Arts and Architecture',
  'School of Theater, Film, and Television',
  'Other'
]

export const RELATIONSHIP_TYPE = ['long', 'short', 'hookup', 'friendship']

// Height-Related Constants
export const MIN_HEIGHT = 12 * 4 // 4 feet
export const MAX_HEIGHT = 12 * 8 // 8 feet
export const HEIGHT_LABELS = ((MIN, MAX): { [string]: string } => {
  const labels = {}
  for (let i = MIN; i <= MAX; i += 1) {
    if (i % 12 === 0) {
      labels[i] = `${i / 12}'`
    }
  }
  return labels
})(MIN_HEIGHT, MAX_HEIGHT)

// Age-Related Constants
export const MIN_AGE = 16
export const MAX_AGE = 35
export const AGE_LABELS = ((MIN, MAX): { [string]: string } => {
  const labels = {}
  for (let i = MIN; i <= MAX; i += 1) {
    if (i % 2 === 0) {
      labels[i] = String(i)
    } else {
      labels[i] = ''
    }
  }
  return labels
})(MIN_AGE, MAX_AGE)

export const QUESTIONS = {
  HOBBIES: 'Hobbies',
  FUTURE_PLANS: 'In the future, I would like to...',
  ASK_ME_ABOUT: 'Ask me about...',
  IDEAL_FIRST_DATE: 'My ideal first date is...'
}
