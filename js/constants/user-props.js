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
  'Middle Eastern',
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

export const MAJOR = [
  'Aerospace Engineering',
  'African American Studies',
  'African and Middle Eastern Studies',
  'American Indian Studies',
  'American Literature and Culture',
  'Ancient Near East and Egyptology',
  'Anthropology',
  'Applied Linguistics',
  'Applied Mathematics',
  'Arabic',
  'Architectural Studies',
  'Art',
  'Art History',
  'Asian American Studies',
  'Asian Humanities',
  'Asian Languages and Linguistics BA',
  'Asian Religions',
  'Asian Studies',
  'Astrophysics',
  'Atmospheric and Oceanic Sciences',
  'Atmospheric, Oceanic, and Environmental Sciences',
  'Biochemistry',
  'Bioengineering',
  'Biology',
  'Biophysics',
  'Business Economics',
  'Central and East European Languages and Cultures',
  'Chemical Engineering',
  'Chemistry',
  'Chemistry/Materials Science',
  'Chicana and Chicano Studies',
  'Chinese',
  'Civil Engineering',
  'Classical Civilization',
  'Climate Science',
  'Cognitive Science',
  'Communication Studies',
  'Comparative Literature',
  'Computational and Systems Biology',
  'Computer Engineering',
  'Computer Science',
  'Computer Science and Engineering',
  'Dance',
  'Design | Media Arts',
  'Earth and Environmental Science',
  'Ecology, Behavior, and Evolution',
  'Economics',
  'Electrical Engineering',
  'Engineering Geology',
  'English',
  'Environmental Science',
  'Ethnomusicology',
  'European Studies',
  'Film and Television',
  'Financial Actuarial Mathematics',
  'French',
  'French and Linguistics',
  'Gender Studies',
  'General Chemistry',
  'Geography',
  'Geography/Environmental Studies',
  'Geology',
  'Geology/Engineering Geology',
  'Geology/Paleobiology',
  'Geophysics',
  'Geophysics/Applied Geophysics',
  'Geophysics/Geophysics and Space Physics',
  'German',
  'Global Studies',
  'Greek',
  'Greek and Latin',
  'History',
  'Human Biology and Society',
  'Individual Field of Concentration',
  'International Development Studies',
  'Iranian Studies',
  'Italian',
  'Italian and Special Fields',
  'Japanese',
  'Jewish Studies',
  'Korean',
  'Latin',
  'Latin American Studies',
  'Linguistics',
  'Linguistics and Anthropology',
  'Linguistics and Asian Languages and Cultures',
  'Linguistics and Computer Science',
  'Linguistics and English',
  'Linguistics and French',
  'Linguistics and Italian',
  'Linguistics and Philosophy',
  'Linguistics and Psychology',
  'Linguistics and Scandinavian Languages',
  'Linguistics and Spanish',
  'Marine Biology',
  'Materials Engineering',
  'Mathematics',
  'Mathematics For Teaching',
  'Mathematics of Computation',
  'Mathematics/Applied Science',
  'Mathematics/Atmospheric and Oceanic Sciences',
  'Mathematics/Economics',
  'Mechanical Engineering',
  'Microbiology, Immunology, and Molecular Genetics',
  'Middle Eastern Studies',
  'Molecular, Cell, and Developmental Biology',
  'Music',
  'Music Education',
  'Music History',
  'Musicology',
  'Neuroscience',
  'Nordic Studies',
  'Nursing',
  'Nursing-Prelicensure',
  'Philosophy',
  'Physics',
  'Physiological Science',
  'Political Science',
  'Portuguese',
  'Pre-African and Middle Eastern Studies',
  'Pre-Applied Mathematics',
  'Pre-Asian Studies',
  'Pre-Business Economics',
  'Pre-Cognitive Science',
  'Pre-Computational and Systems Biology',
  'Pre-Economics',
  'Pre-European Studies',
  'Pre-Financial Actuarial Mathematics',
  'Pre-Global Studies',
  'Pre-History',
  'Pre-Human Biology and Society',
  'Pre-International Development Studies',
  'Pre-Latin American Studies',
  'Pre-Mathematics',
  'Pre-Mathematics For Teaching',
  'Pre-Mathematics of Computation',
  'Pre-Mathematics/Applied Science',
  'Pre-Mathematics/Economics',
  'Pre-Microbiology, Immunology, & Molecular Genetics',
  'Pre-Political Science',
  'Pre-Psychobiology',
  'Pre-Psychology',
  'Pre-Sociology',
  'Pre-Statistics',
  'Psychobiology',
  'Psychology',
  'Russian Language and Literature',
  'Russian Studies',
  'Scandinavian Languages and Cultures',
  'Sociology',
  'Spanish',
  'Spanish and Community and Culture',
  'Spanish and Linguistics',
  'Spanish and Portuguese',
  'Statistics',
  'Study of Religion',
  'Theater',
  'Undeclared',
  'Undeclared-Engineering and Applied Science',
  'Undeclared-Humanities',
  'Undeclared-Life Science',
  'Undeclared-Physical Science',
  'Undeclared-Social Science',
  'World Arts and Cultures',
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
